"use client";

import { signOut } from "next-auth/react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface SettingsClientProps {
  dict: Dictionary["settings"];
  lang: string;
}

export default function SettingsClient({ dict, lang }: SettingsClientProps) {
  return (
    <main className="max-w-2xl px-6 py-12">
      <h1 className="mb-10 text-2xl font-bold">{dict.title}</h1>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-subtle">
          {dict.account}
        </h2>
        <div className="inline-flex rounded-xl border border-border bg-background shadow-sm">
          <button
            onClick={() => signOut({ callbackUrl: `/${lang}` })}
            className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {dict.logout}
          </button>
        </div>
      </section>
    </main>
  );
}
