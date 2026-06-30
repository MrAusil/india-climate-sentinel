import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Panel } from "@/components/Panel";
import { FileText, Download, BarChart3, Map as MapIcon, ShieldCheck, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports · Bharat Climate Twin" },
      { name: "description", content: "Downloadable district, state, assessment and resilience reports." },
    ],
  }),
  component: Reports,
});

const TYPES = [
  { icon: MapIcon, t: "District Risk Report", d: "Per-district risk surface, AI predictions and recommendations.", sample: "DRR-Mumbai-Suburban-2026Q1.pdf" },
  { icon: BarChart3, t: "State Climate Report", d: "Macro climate trajectory, hazards and capacity gaps by state.", sample: "SCR-Maharashtra-2026.pdf" },
  { icon: AlertTriangle, t: "Disaster Assessment Report", d: "Post-event impact, damage and lessons learned.", sample: "DAR-Cyclone-Tej-2025.pdf" },
  { icon: ShieldCheck, t: "Climate Resilience Report", d: "District/state DRI breakdown and investment priorities.", sample: "CRR-Tamil-Nadu-2026.pdf" },
];

const SECTIONS = [
  "Executive summary",
  "Region & demography snapshot",
  "Hazard maps (flood / cyclone / heat / drought)",
  "Time-series climate charts",
  "AI predictions · 24h / 72h / 7d",
  "Risk analysis · exposure × vulnerability × capacity",
  "Recommended actions (short / medium / long term)",
  "Annexures · data lineage & model cards",
];

function Reports() {
  return (
    <div>
      <PageHeader
        eyebrow="REPORT GENERATION · PDF / GEOTIFF / CSV"
        title="Generate official reports"
        description="Compose reports from the digital twin and AI engine. Outputs are signed, versioned and queryable."
      />

      <div className="grid grid-cols-12 gap-4 p-4 lg:p-6">
        {TYPES.map((r)=>{
          const Icon = r.icon;
          return (
            <Panel key={r.t} className="col-span-12 md:col-span-6" eyebrow="REPORT" title={r.t}>
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-md border border-panel-border grid place-items-center bg-card/60 shrink-0">
                  <Icon className="h-5 w-5 text-isro-cyan" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.d}</p>
              </div>
              <div className="mt-3 grid sm:grid-cols-3 gap-2">
                <select className="bg-input/60 border border-panel-border rounded-sm px-2 py-1.5 text-xs font-mono">
                  <option>State · Maharashtra</option><option>State · Tamil Nadu</option><option>State · Assam</option>
                </select>
                <select className="bg-input/60 border border-panel-border rounded-sm px-2 py-1.5 text-xs font-mono">
                  <option>District · Pune</option><option>District · Mumbai City</option><option>District · Dibrugarh</option>
                </select>
                <select className="bg-input/60 border border-panel-border rounded-sm px-2 py-1.5 text-xs font-mono">
                  <option>Period · 2026 Q1</option><option>Period · 2025 annual</option><option>Period · 2024-2026</option>
                </select>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground">Latest · {r.sample}</span>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary text-primary-foreground text-xs">
                  <Download className="h-3.5 w-3.5" /> Generate PDF
                </button>
              </div>
            </Panel>
          );
        })}

        <Panel className="col-span-12" eyebrow="REPORT TEMPLATE" title="Standard sections">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {SECTIONS.map((s, i)=>(
              <div key={s} className="panel p-3 flex items-center gap-2 text-sm">
                <span className="text-[10px] font-mono text-isro-cyan w-5">{String(i+1).padStart(2,"0")}</span>
                <FileText className="h-3.5 w-3.5 text-muted-foreground" /> {s}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
