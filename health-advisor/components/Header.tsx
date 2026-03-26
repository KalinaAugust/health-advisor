"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/survey", label: "Take Survey" },
  { href: "/recommendations", label: "My Results" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="border-b border-black/10 dark:border-white/10 px-6 py-4">
      <nav className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${
              pathname === href
                ? "text-black dark:text-white underline underline-offset-4"
                : "text-black/50 dark:text-white/50"
            }`}
          >
            {label}
          </Link>
        ))}

        <div className="ml-auto flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {session.user?.name ?? session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-medium text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
            >
              Войти
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
