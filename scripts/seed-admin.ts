import "dotenv/config";

import { hashPassword } from "../lib/auth/password";
import { db } from "../lib/db/client";
import { adminUsers } from "../lib/db/schema";

function readArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 ? process.argv[idx + 1] : undefined;
}

async function main() {
  const username = readArg("--username") ?? process.env.ADMIN_USERNAME;
  const password = readArg("--password") ?? process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error(
      "Usage: npm run db:seed-admin -- --username <name> --password <password>\n" +
        "(or set ADMIN_USERNAME / ADMIN_PASSWORD env vars for this one invocation)"
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const passwordHash = hashPassword(password);

  await db
    .insert(adminUsers)
    .values({ username, passwordHash })
    .onConflictDoUpdate({
      target: adminUsers.username,
      set: { passwordHash, updatedAt: new Date() },
    });

  console.log(`Admin user "${username}" is set.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding admin user failed:", err);
  process.exit(1);
});
