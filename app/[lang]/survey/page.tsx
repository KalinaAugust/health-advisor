import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import SurveyForm from "./SurveyForm";

export default async function SurveyPage({
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
  return <SurveyForm dict={dict.survey} lang={lang} userName={session?.user?.name ?? null} />;
}
