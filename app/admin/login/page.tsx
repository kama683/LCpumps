"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const FIELD =
  "w-full py-3.5 px-4 border border-border-mid rounded-md text-[15px] text-body bg-white placeholder:text-subtle focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(247,6,32,0.12)] transition-[border-color,box-shadow]";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-12">
      <div className="w-full max-w-[380px] rounded-2xl border border-border-mid bg-white p-8 shadow-card-sm">
        <div className="mb-6 text-center">
          <div className="mb-1 text-xs font-bold uppercase tracking-[1.4px] text-primary">
            LCPumps Admin
          </div>
          <h1 className="font-heading text-2xl font-bold text-heading">Вход</h1>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <input
            className={FIELD}
            type="text"
            name="username"
            placeholder="Логин"
            autoComplete="username"
          />
          <input
            className={FIELD}
            type="password"
            name="password"
            placeholder="Пароль"
            autoComplete="current-password"
          />

          {state?.error && (
            <p className="flex items-center gap-2 text-sm font-semibold text-error">
              <AlertCircle className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-sm bg-primary py-3.5 text-base font-bold text-white shadow-btn transition-[background,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {pending ? "Вход…" : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
