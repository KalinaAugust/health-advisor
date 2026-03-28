"use client";

import { useState } from "react";
import RecommendationsBlock from "@/components/RecommendationsBlock";
import { OrganList } from "@/app/profile/OrganList";
import { organs } from "@/app/profile/organs";
import { Body } from "@/app/profile/Body";
import Button from "@/components/Button";

export default function Profile() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"diagnostics" | "recommendations">("diagnostics");

  return (
    <main className="flex flex-1 flex-col items-center p-8">
      <div className="flex gap-2 mb-17.5">
        <Button onClick={() => setActiveTab("diagnostics")} color={activeTab === "diagnostics" ? "dark" : "light"} fullWidth={false}>
          Diagnostic Results
        </Button>
        <Button onClick={() => setActiveTab("recommendations")} color={activeTab === "recommendations" ? "dark" : "light"} fullWidth={false}>
          Your Recommendations
        </Button>
      </div>

      {activeTab === "diagnostics" && (
        <div className="flex flex-col items-center gap-10 w-full max-w-4xl">
          <div className="flex gap-8 h-170">
            <Body organs={organs} onOrganClick={setOpenId} activeId={openId} />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-black">Diagnostic Results</h2>
              <OrganList items={organs} openId={openId} setOpenId={setOpenId} />
            </div>
          </div>

          <div className="flex flex-col gap-6 pb-10">
            <h2 className="text-2xl font-semibold text-foreground">Overall Health Summary</h2>
            <p className="text-muted leading-7">
              Based on your responses, your cardiovascular system shows early signs of strain, likely related to elevated stress levels and a sedentary lifestyle. Your heart rate variability is within an acceptable range, but blood pressure indicators suggest it would be beneficial to monitor this area closely over the coming months.
            </p>
            <p className="text-muted leading-7">
              Your digestive system appears to be functioning adequately, though mild irregularities were noted. These are commonly associated with dietary habits and hydration levels. Increasing fiber intake and ensuring consistent meal times may help normalize digestive function.
            </p>
            <p className="text-muted leading-7">
              The musculoskeletal assessment points to reduced mobility in the lower back region, which is a frequent finding among individuals with desk-based occupations. Targeted stretching routines and ergonomic adjustments to your workspace are recommended as a first step.
            </p>
            <p className="text-muted leading-7 italic">
              <strong className="text-foreground">General conclusion:</strong> Overall, your health profile is moderate. No critical conditions were identified at this stage, but several preventive measures are strongly advised. Regular physical activity, balanced nutrition, adequate sleep, and routine check-ups will play a key role in maintaining and improving your wellbeing. Please review the personalized recommendations tab for a detailed action plan.
            </p>
          </div>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="w-full max-w-lg">
          <RecommendationsBlock />
        </div>
      )}
    </main>
  );
}
