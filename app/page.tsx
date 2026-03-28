import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-between font-sans bg-[url('/images/background.png')] bg-cover bg-center">
      <div className="flex flex-1 items-center justify-center">
      <main className="flex flex-col items-center gap-8 py-16 px-16 text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-semibold tracking-tight text-green-900 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
          Your Personal Health Advisor
        </h1>
        <p className="max-w-md text-lg leading-8 text-amber-900 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
          Answer a few questions about your health and lifestyle to receive personalized recommendations tailored to your condition.
        </p>
        <Link
          href="/survey"
          className="flex h-12 items-center justify-center rounded-full bg-green-900 px-8 text-sm font-medium text-white transition-all hover:bg-green-800 shadow-[0_0_12px_rgba(34,197,94,0.4)] hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]"
        >
          Take the Survey
        </Link>
      </main>
      </div>
      <footer className="py-6 text-sm text-green-900">
        © {new Date().getFullYear()} Health Advisor. All rights reserved.
      </footer>
    </div>
  );
}
