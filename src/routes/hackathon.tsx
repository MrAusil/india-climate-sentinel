import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Logo } from "@/components/AppShell";
import { Panel } from "@/components/Panel";
import { Trophy, Target, Users, ShieldCheck, Brain, Heart } from "lucide-react";

export const Route = createFileRoute("/hackathon")({
  head: () => ({
    meta: [
      { title: "BAH ISRO Hackathon 2026 · Submission · Bharat Climate Twin" },
      { name: "description", content: "Submission details for BAH-2026-PS-05 by Team Nexus Freak, led by Arpit Upadhyay." },
    ],
  }),
  component: Hackathon,
});

const GOALS = [
  { icon: Brain, t: "Predict disasters before occurrence", d: "Forecast across 6 hazards with confidence-scored ensemble." },
  { icon: ShieldCheck, t: "Improve resilience planning", d: "District-level DRI guiding state investment priorities." },
  { icon: Target, t: "Support government decision making", d: "Doctrine-aligned playbooks & PDF/GeoTIFF artefacts." },
  { icon: Trophy, t: "Reduce disaster losses", d: "Hours-earlier warnings projected to cut losses by 18–32%." },
  { icon: Heart, t: "Protect vulnerable populations", d: "Children, elderly, coastal & migrant cohorts prioritised." },
];

function Hackathon() {
  return (
    <div>
      <PageHeader
        eyebrow="BAH ISRO HACKATHON 2026 · SUBMISSION"
        title="Bharat Climate Twin"
        description="Official prototype submission for problem statement BAH-2026-PS-05."
        actions={
          <span className="panel px-3 py-1.5 text-xs font-mono inline-flex items-center gap-2">
            <Trophy className="h-3.5 w-3.5 text-isro-saffron" /> Submission · Track 5
          </span>
        }
      />

      <div className="grid grid-cols-12 gap-4 p-4 lg:p-6">
        <Panel className="col-span-12 lg:col-span-5" eyebrow="TEAM" title="Nexus Freak">
          <div className="flex items-center gap-4">
            <Logo className="h-16 w-16" />
            <div>
              <div className="text-2xl font-semibold tracking-tight">Team Nexus Freak</div>
              <div className="text-sm text-muted-foreground">Bharat Antariksh Hackathon 2026</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Kv k="Team Leader" v="Arpit Upadhyay" />
            <Kv k="Track" v="Earth Observation & Climate" />
            <Kv k="Problem Statement" v="BAH-2026-PS-05" />
            <Kv k="Submission ID" v="NF-2026-01-CT" />
          </div>
          <div className="mt-5 panel p-3 text-sm leading-relaxed">
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-isro-cyan mb-1">Problem statement</div>
            AI-Powered Climate Digital Twin for India-Specific Disaster Prediction & Resilience.
            Build a national-scale system fusing ISRO satellite data with AI to predict
            disasters before they occur, quantify resilience, and guide response.
          </div>
        </Panel>

        <Panel className="col-span-12 lg:col-span-7" eyebrow="PROJECT GOALS" title="Why Bharat Climate Twin">
          <ul className="grid sm:grid-cols-2 gap-3">
            {GOALS.map(g=>{
              const Icon = g.icon;
              return (
                <li key={g.t} className="panel p-3 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-sm border border-panel-border grid place-items-center bg-card/60 shrink-0">
                    <Icon className="h-4 w-4 text-isro-saffron" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{g.t}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{g.d}</div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Kpi v="766" l="Districts modelled" />
            <Kpi v="22" l="AI models" />
            <Kpi v="14" l="Satellites linked" />
          </div>
        </Panel>

        <Panel className="col-span-12" eyebrow="DEDICATION" title="For every Indian, every district, every season">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            Climate risk in India is not abstract — it shapes the harvest in Marathwada,
            the morning commute in Mumbai, the school day in Bikaner and the fishing boat
            in Puri. Bharat Climate Twin exists so that decisions taken at the highest
            level — and on the ground — are informed by the best available science, fused
            in real time with the country's own eyes in the sky.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono">
            {["ISRO","NDMA","IMD","CWC","NRSC","MOSDAC","NCMRWF","NIUA"].map(o=>(
              <span key={o} className="px-2 py-1 panel">{o}</span>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Kv({ k, v }: { k: string; v: string }) {
  return (
    <div className="panel p-3">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">{k}</div>
      <div className="mt-1 text-sm font-semibold">{v}</div>
    </div>
  );
}
function Kpi({ v, l }: { v: string; l: string }) {
  return (
    <div className="panel p-3 text-center">
      <div className="text-3xl font-semibold tracking-tight text-gradient-isro">{v}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">{l}</div>
    </div>
  );
}
