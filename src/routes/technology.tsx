import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Panel } from "@/components/Panel";
import { Satellite, CloudRain, Droplets, Users, Building2, Brain, Waves, Wind, ScanEye, Map, Boxes, Activity, AlertTriangle, ShieldCheck, FileText, Send, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Architecture · Bharat Climate Twin" },
      { name: "description", content: "End-to-end system architecture: data sources, AI components, processing layer and outputs." },
    ],
  }),
  component: Tech,
});

const LAYERS = [
  {
    title: "Data Sources",
    color: "var(--isro-cyan)",
    items: [
      [Satellite, "ISRO satellite data", "INSAT · Resourcesat · Cartosat · RISAT · EOS"],
      [CloudRain, "Weather data", "IMD AWS, radar, model fields (NCMRWF)"],
      [Droplets, "Hydrological data", "CWC river gauges, CWC reservoirs, NHP"],
      [Users, "Population data", "Census, SECC, Aadhaar density estimates"],
      [Building2, "Infrastructure", "NIUA, SoI, PowerGrid, RailNet, NHAI"],
    ],
  },
  {
    title: "AI Components",
    color: "var(--isro-saffron)",
    items: [
      [Brain, "Climate foundation models", "BharatClimate-FM v2.4"],
      [Waves, "Flood prediction", "BharatFlood-v3.2 (basin-aware)"],
      [Wind, "Cyclone prediction", "CycloneNet-IN ensemble"],
      [ScanEye, "Computer vision", "SAR inundation, hotspot detection"],
      [Map, "Geospatial AI", "SpatioTemporal-IN encoder"],
    ],
  },
  {
    title: "Processing Layer",
    color: "var(--isro-green)",
    items: [
      [Boxes, "Digital Twin Engine", "Multi-resolution India twin · 30m–1km"],
      [Activity, "Simulation Engine", "What-if scenario runtime"],
      [BarChart3, "Risk Engine", "Exposure × vulnerability × capacity"],
      [CloudRain, "Forecast Engine", "Ensemble fusion · 6h / 24h / 72h / 7d"],
    ],
  },
  {
    title: "Outputs",
    color: "oklch(0.72 0.18 295)",
    items: [
      [BarChart3, "Predictions", "Risk scores, probabilities, confidence"],
      [AlertTriangle, "Alerts", "CAP v1.2 fanout to NDMA / states"],
      [ShieldCheck, "Recommendations", "Doctrine-aligned response playbooks"],
      [FileText, "Reports", "District / state / assessment / resilience"],
    ],
  },
] as const;

function Tech() {
  return (
    <div>
      <PageHeader
        eyebrow="SYSTEM ARCHITECTURE · END-TO-END"
        title="Technology stack"
        description="From orbit to operations: how data flows through Bharat Climate Twin."
      />

      <div className="px-4 lg:px-6 py-6 space-y-6">
        <div className="grid grid-cols-12 gap-4">
          {LAYERS.map((L, idx)=>(
            <Panel key={L.title} className="col-span-12 lg:col-span-3" eyebrow={`STAGE 0${idx+1}`} title={L.title}
              right={<span className="h-2 w-2 rounded-full" style={{ background: L.color }} />}>
              <ul className="space-y-2.5">
                {L.items.map(([Icon, t, d]: any)=>(
                  <li key={t} className="flex items-start gap-2.5">
                    <div className="h-8 w-8 rounded-sm border border-panel-border grid place-items-center shrink-0" style={{ background: `color-mix(in oklab, ${L.color} 12%, transparent)` }}>
                      <Icon className="h-4 w-4" style={{ color: L.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium leading-tight">{t}</div>
                      <div className="text-[11px] text-muted-foreground font-mono">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>

        <Panel eyebrow="DATA FLOW" title="Pipeline">
          <pre className="text-[12px] font-mono leading-6 text-muted-foreground overflow-x-auto">
{`  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
  │ ORBIT/GROUND │ → │ NRSC / MOSDAC│ → │ FEATURE LAKE │ → │ AI ENSEMBLE  │
  │  ISRO · IMD  │   │  ingest+QC   │   │  Bharat-GEO  │   │  22 models   │
  └──────────────┘   └──────────────┘   └──────────────┘   └──────┬───────┘
                                                                  ▼
  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
  │  OPERATIONS  │ ← │  RISK ENGINE │ ← │  TWIN ENGINE │ ← │  FORECASTS   │
  │  NDMA · SDMA │   │ E × V × C    │   │  30m · India │   │  6h…7d       │
  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘`}
          </pre>
        </Panel>
      </div>
    </div>
  );
}
