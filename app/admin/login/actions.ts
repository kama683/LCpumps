"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { adminUsers } from "@/lib/db/schema";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export interface LoginState {
  error?: string;
}

// Fixed-window lockout: this is a single-admin-account app, so throttling by
// source IP alone (rather than IP+username) is enough to stop brute-forcing.
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const ip = await getClientIp();
  if (!checkRateLimit(`login:${ip}`, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS)) {
    return { error: "Слишком много попыток входа. Попробуйте снова через 15 минут." };
  }

  if (!username || !password) {
    return { error: "Введите логин и пароль." };
  }

  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .limit(1);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Неверный логин или пароль." };
  }

  await createSession(user.id, user.username);
  redirect("/admin");
}
