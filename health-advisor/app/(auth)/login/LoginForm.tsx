"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const inputClass =
  "w-full rounded border border-black/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-black dark:border-white/20 dark:focus:border-white";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Неверный email или пароль.");
      setPending(false);
    } else {
      window.location.href = "/";
    }
  }

  return (
    <div className="space-y-4">
      {registered && (
        <p className="rounded bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
          Аккаунт создан. Войдите.
        </p>
      )}
      {error && (
        <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium">Email</label>
          <input name="email" type="email" className={inputClass} required />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Пароль</label>
          <input
            name="password"
            type="password"
            className={inputClass}
            required
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Вход..." : "Войти"}
        </button>
      </form>

      <div className="relative flex items-center gap-3 py-1">
        <div className="flex-1 border-t border-black/10 dark:border-white/10" />
        <span className="text-xs text-zinc-400">или</span>
        <div className="flex-1 border-t border-black/10 dark:border-white/10" />
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full rounded-full border border-black/20 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50 dark:border-white/20 dark:hover:bg-zinc-900"
      >
        Войти через Google
      </button>

      <p className="text-center text-sm text-zinc-500">
        Нет аккаунта?{" "}
        <Link
          href="/register"
          className="text-black underline underline-offset-4 dark:text-zinc-50"
        >
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
