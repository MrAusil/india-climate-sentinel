import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Panel, RiskBadge } from "@/components/Panel";
import { Megaphone, ShieldAlert, Droplets, Cross, Wheat } from "lucide-react";

export const Route = createFileRoute("/warnings")({
  head: () => ({
    meta: [
      { title: "Early Warning System · Bharat Climate Twin" },
      { name: "description", content: "National early warning feed across India with AI-generated response recommendations." },
    ],
  }),
  component: Warnings,
});

const ALERTS = [
  { lvl: "Red", state: "Assam", district: "Dibrugarh", type: "Riverine flood", time: "T+06h",
    recs: [["Evacuation required", "16 villages, 24k persons", ShieldAlert],
           ["Water release management", "Coordinate with Bhakra & Subansiri", Droplets],
           ["Medical deployment", "4 mobile units, 1 field hospital", Cross]] },
  { lvl: "Red", state: "Odisha", district: "Puri", type: "Cyclone landfall", time: "T+14h",
    recs: [["Evacuation required", "Coastal belt 0–10 km, 410k persons", ShieldAlert],
           ["Crop protection", "Harvest standing paddy within 24h", Wheat]] },
  { lvl: "Orange", state: "West Bengal", district: "Sundarbans", type: "Cyclone watch", time: "T+72h",
    recs: [["Evacuation required", "Pre-position shelters; readiness check", ShieldAlert],
           ["Medical deployment", "Activate 6 PHCs, ICU referral protocol", Cross]] },
  { lvl: "Orange", state: "Uttarakhand", district: "Pauri Garhwal", type: "Forest fire", time: "T+18h",
    recs: [["Evacuation required", "3 forest villages, 1.8k persons", ShieldAlert],
           ["Water release management", "Helibucket ops from Tehri reservoir", Droplets]] },
  { lvl: "Yellow", state: "Maharashtra", district: "Beed", type: "Drought escalation", time: "ongoing",
    recs: [["Crop protection advisory", "Switch to short-duration bajra varieties", Wheat],
           ["Water release management", "Tanker schedule 4× → 6× per week", Droplets]] },
  { lvl: "Yellow", state: "Kerala", district: "Wayanad", type: "Landslide watch", time: "T+24h",
    recs: [["Evacuation required", "Pre-emptive movement of 4 hamlets", ShieldAlert]] },
  { lvl: "Green", state: "Tamil Nadu", district: "Chennai", type: "Heat advisory", time: "ongoing",
    recs: [["Health advisory", "Schools 11:00 dismissal; cooling centres open", Cross]] },
];

function Warnings() {
  return (
    <div>
      <PageHeader
        eyebrow="EARLY WARNING SYSTEM · NDMA INTEGRATION"
        title="National warning feed"
        description="Live alerts from the digital twin engine, classified by severity. Each alert ships with AI-curated response recommendations for state EOCs."
        actions={<span className="panel px-2 py-1 text-xs font-mono inline-flex items-center gap-2"><Megaphone className="h-3.5 w-3.5 text-isro-cyan" /> CAP v1.2 · auto-fanout</span>}
      />

      <div className="grid grid-cols-12 gap-4 p-4 lg:p-6">
        <Panel className="col-span-12 lg:col-span-3" eyebrow="STATUS" title="Severity ladder">
          <ul className="space-y-2">
            {(["Red","Orange","Yellow","Green"] as const).map(l=>{
              const count = ALERTS.filter(a=>a.lvl===l).length;
              return (
                <li key={l} className="flex items-center justify-between panel px-3 py-2">
                  <RiskBadge level={l} />
                  <span className="font-mono text-sm">{count} active</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 panel p-3 text-xs space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-isro-cyan">Doctrine</div>
            <p className="text-muted-foreground leading-relaxed">Severity follows IMD colour-coding. Auto-issuance gated by ≥ 0.75 confidence on 2 of 3 ensemble heads.</p>
          </div>
        </Panel>

        <div className="col-span-12 lg:col-span-9 space-y-3">
          {ALERTS.map((a)=>(
            <article key={`${a.state}-${a.district}-${a.type}`} className="panel">
              <header className="flex items-center gap-3 p-3 border-b border-panel-border">
                <RiskBadge level={a.lvl as any} />
                <div className="text-sm"><span className="font-semibold">{a.district}</span> <span className="text-muted-foreground">· {a.state}</span></div>
                <div className="text-sm text-muted-foreground">— {a.type}</div>
                <div className="ml-auto text-[11px] font-mono text-muted-foreground">{a.time}</div>
              </header>
              <div className="p-3 grid sm:grid-cols-3 gap-2">
                {a.recs.map(([t, d, Icon]: any)=>(
                  <div key={t} className="panel p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-3.5 w-3.5 text-isro-saffron" />
                      <span className="text-xs font-medium">{t}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{d}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
