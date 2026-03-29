"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import RecommendationsBlock from "@/components/RecommendationsBlock";
import { DiagnosticsOverview } from "./DiagnosticsOverview";
import { OrganList } from "./OrganList";
import { Body } from "./Body";
import Button from "@/components/Button";
import type { Organ } from "./organs";
import type { Dictionary } from "@/app/[lang]/dictionaries";

function getSnapshot() { return sessionStorage.getItem("healthSurveyData") ?? ""; }
function getServerSnapshot() { return null; }

interface ProfileClientProps {
  dict: Dictionary;
  organs: Organ[];
  lang: string;
}

export default function ProfileClient({ dict, organs, lang }: ProfileClientProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"diagnostics" | "recommendations" | "summary" | "download">("diagnostics");
  const [pdfSections, setPdfSections] = useState({
    diagnostics: true,
    recommendations: true,
    summary: true,
    organDetails: true,
    overview: true,
  });
  const { tabDiagnostics, tabRecommendations, tabSummary, diagnosticsTitle, summaryTitle, summaryP1, summaryP2, summaryP3, summaryP4, summaryConclusion, tabDownloadTitle, tabDownloadDiagnostics, tabDownloadRecommendations, tabDownloadSummary, tabDownloadOrganDetails, tabDownloadOverview, tabDownloadButton } = dict.profile;
  const { recommendations } = dict;

  const raw = useSyncExternalStore(() => () => {}, getSnapshot, getServerSnapshot);

  if (raw === null) return null;

  if (!raw) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center p-8 gap-4">
        <p className="text-muted">{recommendations.noData}</p>
        <Link
          href={`/${lang}/survey`}
          className="rounded-full border border-transparent bg-brand px-5 py-2.5 text-sm font-semibold text-background shadow-[0_4px_8px_rgba(180,80,0,0.35)] transition-all hover:bg-brand-hover hover:shadow-[0_2px_4px_rgba(180,80,0,0.2)]"
        >
          {recommendations.goToSurvey}
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center p-8">
      <div className="flex gap-2 mb-17.5">
        <Button onClick={() => setActiveTab("diagnostics")} color={activeTab === "diagnostics" ? "dark" : "light"} fullWidth={false}>
          {tabDiagnostics}
        </Button>
        <Button onClick={() => setActiveTab("recommendations")} color={activeTab === "recommendations" ? "dark" : "light"} fullWidth={false}>
          {tabRecommendations}
        </Button>
        <Button onClick={() => setActiveTab("summary")} color={activeTab === "summary" ? "dark" : "light"} fullWidth={false}>
          {tabSummary}
        </Button>
        <Button onClick={() => setActiveTab("download")} color={activeTab === "download" ? "dark" : "light"} fullWidth={false}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
          </svg>
        </Button>
      </div>

      {activeTab === "diagnostics" && (
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
          <DiagnosticsOverview organs={organs} dict={dict.profile} />
          <div className="flex gap-8 h-170 w-full">
            <Body organs={organs} onOrganClick={setOpenId} activeId={openId} />
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="text-xl font-semibold text-black">{diagnosticsTitle}</h2>
              <OrganList items={organs} openId={openId} setOpenId={setOpenId} />
            </div>
          </div>

        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="w-full max-w-lg">
          <RecommendationsBlock dict={recommendations} lang={lang} />
        </div>
      )}

      {activeTab === "download" && (
        <div className="flex flex-col gap-6 pb-10 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-foreground">{tabDownloadTitle}</h2>
          <div className="flex flex-col gap-3">
            {([
              ["diagnostics", tabDownloadDiagnostics],
              ["recommendations", tabDownloadRecommendations],
              ["summary", tabDownloadSummary],
              ["organDetails", tabDownloadOrganDetails],
              ["overview", tabDownloadOverview],
            ] as const).map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pdfSections[key]}
                  onChange={(e) => setPdfSections((prev) => ({ ...prev, [key]: e.target.checked }))}
                  className="w-4 h-4 accent-brand cursor-pointer"
                />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ))}
          </div>
          <Button color="dark" fullWidth={false} disabled>
            {tabDownloadButton}
          </Button>
        </div>
      )}

      {activeTab === "summary" && (
        <div className="flex flex-col gap-6 pb-10 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-foreground">{summaryTitle}</h2>
          <p className="text-muted leading-7">{summaryP1}</p>
          <p className="text-muted leading-7">{summaryP2}</p>
          <p className="text-muted leading-7">{summaryP3}</p>
          <p className="text-muted leading-7 italic">
            <strong className="text-foreground">{summaryConclusion}</strong> {summaryP4}
          </p>
        </div>
      )}
    </main>
  );
}
