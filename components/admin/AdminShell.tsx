"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Mail, Package } from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Дашборд", icon: LayoutDashboard },
  { href: "/admin/requests", label: "Заявки", icon: Mail },
  { href: "/admin/products", label: "Товары", icon: Package },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-dvh">
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-white max-tablet:hidden">
        <div className="px-6 py-6 border-b border-border-light">
          <div className="text-xs font-bold uppercase tracking-[1.4px] text-primary">
            LCPumps
          </div>
          <div className="font-heading text-lg font-bold text-heading">Admin</div>
        </div>

        <nav className="flex-1 px-3 py-4">
          {NAV.map((item) => {
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mb-1 flex items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-semibold no-underline transition-colors",
                  active
                    ? "bg-pill-blue-bg text-primary"
                    : "text-nav hover:bg-surface hover:text-primary"
                )}
              >
                <Icon className="size-[18px] shrink-0" strokeWidth={2} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border-light p-3">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-3 rounded-md border-none bg-transparent px-3.5 py-2.5 text-left text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-error"
            >
              <LogOut className="size-[18px] shrink-0" strokeWidth={2} aria-hidden />
              Выйти
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border-light bg-white px-6 py-4 tablet:px-8">
          <span className="font-heading text-lg font-bold text-heading tablet:hidden">
            LCPumps Admin
          </span>
          <span className="hidden tablet:block" />
          <span className="inline-flex items-center gap-2 rounded-pill bg-pill-blue-bg px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
            Admin
          </span>
        </header>
        <main className="flex-1 px-6 py-8 tablet:px-10 tablet:py-10">{children}</main>
      </div>
    </div>
  );
}
