"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import Toast from "@/components/Toast";

interface SettingsClientProps {
  dict: Dictionary["settings"];
  lang: string;
  userName?: string | null;
}

type Toast = { message: string; ok: boolean } | null;

export default function SettingsClient({ dict, lang, userName }: SettingsClientProps) {
  const { update } = useSession();
  const [nameValue, setNameValue] = useState(userName ?? "");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(message: string, ok: boolean) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ message, ok });
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), 3000);
  }

  useEffect(() => {
    if (!visible && toast) {
      const t = setTimeout(() => setToast(null), 300);
      return () => clearTimeout(t);
    }
  }, [visible, toast]);

  async function handleSave() {
    const trimmed = nameValue.trim();
    if (!trimmed || trimmed === userName) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      if (res.ok) await update({ name: trimmed });
      showToast(res.ok ? dict.nameSuccess : dict.nameError, res.ok);
    } catch {
      showToast(dict.nameError, false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="max-w-sm px-6 py-12">
      {toast && <Toast message={toast.message} ok={toast.ok} visible={visible} />}

      <h1 className="mb-10 text-2xl font-bold">{dict.title}</h1>

      <section className="mb-8 space-y-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-subtle">
          {dict.account}
        </h2>

        <div className="space-y-1">
          <label htmlFor="display-name" className="block text-sm font-medium text-foreground">
            {dict.nameLabel}
          </label>
          <div className="flex gap-2">
            <input
              id="display-name"
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              placeholder={userName ?? ""}
              className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
            />
            <button
              onClick={handleSave}
              disabled={saving || !nameValue.trim() || nameValue.trim() === userName}
              className="shrink-0 cursor-pointer rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? "…" : dict.nameSave}
            </button>
          </div>
        </div>

        <div className="inline-flex">
          <button
            onClick={() => signOut({ callbackUrl: `/${lang}` })}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
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
