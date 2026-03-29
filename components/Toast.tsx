"use client";

interface ToastProps {
  message: string;
  ok: boolean;
  visible: boolean;
}

export default function Toast({ message, ok, visible }: ToastProps) {
  return (
    <div
      className={[
        "fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm shadow-lg transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        ok
          ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
          : "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
      ].join(" ")}
    >
      <span aria-hidden="true">{ok ? "✓" : "✕"}</span>
      {message}
    </div>
  );
}
