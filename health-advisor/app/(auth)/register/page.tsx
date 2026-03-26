import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-sm space-y-5 rounded-xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold">Регистрация</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
