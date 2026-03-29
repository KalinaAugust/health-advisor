import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, session] = await Promise.all([
    getDictionary(lang as Locale),
    auth(),
  ]);
  return (
    <SettingsClient
      dict={dict.settings}
      lang={lang}
      userName={session?.user?.name ?? null}
    />
  );
}
