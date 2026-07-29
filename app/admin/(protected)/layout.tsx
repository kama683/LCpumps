import { AdminShell } from "@/components/admin/AdminShell";
import { verifySession } from "@/lib/auth/dal";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // proxy.ts already did an optimistic (cookie-only) redirect before this
  // ever runs. This is the real, non-optimistic check — see lib/auth/dal.ts.
  await verifySession();

  return <AdminShell>{children}</AdminShell>;
}
