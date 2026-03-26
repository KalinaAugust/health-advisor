"use client";

import { useActionState } from "react";
import { register, type RegisterState } from "@/lib/actions/auth";
import Link from "next/link";

const inputClass =
  "w-full rounded border border-black/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-black dark:border-white/20 dark:focus:border-white";
const errorClass = "text-xs text-red-600 dark:text-red-400";

export default function RegisterForm() {
  const [state, action, pending] = useActionState<
    RegisterState | undefined,
    FormData
  >(register, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium">Имя</label>
        <input name="name" type="text" className={inputClass} required />
        {state?.errors?.name && (
          <p className={errorClass}>{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Email</label>
        <input name="email" type="email" className={inputClass} required />
        {state?.errors?.email && (
          <p className={errorClass}>{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Пароль</label>
        <input
          name="password"
          type="password"
          className={inputClass}
          required
        />
        {state?.errors?.password && (
          <p className={errorClass}>{state.errors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Создание аккаунта..." : "Создать аккаунт"}
      </button>

      <p className="text-center text-sm text-zinc-500">
        Уже есть аккаунт?{" "}
        <Link
          href="/login"
          className="text-black underline underline-offset-4 dark:text-zinc-50"
        >
          Войти
        </Link>
      </p>
    </form>
  );
}
