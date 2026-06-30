import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat, Bar, RiskBadge, Sparkline } from "@/components/Panel";
import { PageHeader } from "@/components/AppShell";
import { Waves, Wind, Thermometer, Droplet, Mountain, Flame, Cpu } from "lucide-react";

export const Route = createFileRoute("/predictions")({
  head: () => ({
    meta: [
      { title: "AI Disaster Prediction · Bharat Climate Twin" },
      { name: "description", content: "AI-generated forecasts across floods, cyclones, heatwaves, droughts, landslides and forest fires for India." },
    ],
  }),
  component: Predictions,
});

const CARDS = [
  {
    icon: Waves, kind: "Floods", region: "Lower Brahmaputra basin",
    risk: 78, confidence: 86, pop: "2.4M", loss: "₹ 1,840 Cr", priority: "Red",
    series: [12,20,28,40,55,68,75,78],
    explain: "Heavy 72h rainfall (340mm) combined with saturated soil and rising Brahmaputra at Dibrugarh indicates a 78% probability of severe flooding within the next 72 hours across 9 districts.",
  },
  {
    icon: Wind, kind: "Cyclones", region: "Bay of Bengal · Odisha coast",
    risk: 72, confidence: 81, pop: "5.1M", loss: "₹ 4,200 Cr", priority: "Red",
    series: [8,10,18,28,42,55,68,72],
    explain: "Deep depression intensifying; sea-surface temp 30.2°C, wind shear favorable. Landfall window 14–16 hours. Mandatory evacuation advised for cyclone categories ≥ 2.",
  },
  {
    icon: Thermometer, kind: "Heatwaves", region: "NW India · Rajasthan plateau",
    risk: 81, confidence: 92, pop: "8.6M", loss: "₹ 920 Cr", priority: "Orange",
    series: [40,42,45,48,52,60,72,81],
    explain: "Persistent upper-level ridge; 5-day max 46–48°C expected. Health-system stress projected to exceed 1.4× baseline; deploy cooling centres in 14 districts.",
  },
  {
    icon: Droplet, kind: "Droughts", region: "Marathwada · Vidarbha",
    risk: 66, confidence: 79, pop: "3.2M", loss: "₹ 1,210 Cr", priority: "Orange",
    series: [30,32,40,48,55,60,63,66],
    explain: "SPI-3 of −1.4 and reservoir storage at 31% (vs 55% normal). Kharif sowing at risk; recommend protective irrigation release from upstream dams.",
  },
  {
    icon: Mountain, kind: "Landslides", region: "Himachal · Uttarakhand arc",
    risk: 74, confidence: 76, pop: "640K", loss: "₹ 380 Cr", priority: "Orange",
    series: [20,28,40,52,60,68,72,74],
    explain: "Antecedent rainfall index 138mm and slope saturation > 0.7. 23 landslide-prone segments flagged on NH-7 and NH-707; convoy windows advised.",
  },
  {
    icon: Flame, kind: "Forest Fires", region: "Uttarakhand · Pauri Garhwal",
    risk: 62, confidence: 73, pop: "210K", loss: "₹ 145 Cr", priority: "Yellow",
    series: [10,14,22,30,42,50,58,62],
    explain: "Vegetation moisture < 14% with sustained westerlies 22 km/h. Active hotspots detected by EOS-08 thermal sensor over 38 km².",
  },
] as const;

function Predictions() {
  return (
    <div>
      <PageHeader
        eyebrow="AI PREDICTION CENTER · ENSEMBLE"
        title="Disaster prediction & risk forecasts"
        description="Six AI foundation models producing 6/24/72-hour and 7-day forecasts across India. Each card surfaces model risk, confidence, exposed population, projected economic loss and the AI's natural-language explanation."
        actions={
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="panel px-2 py-1 inline-flex items-center gap-1.5"><Cpu className="h-3 w-3 text-isro-cyan" />ENSEMBLE · 22 models</span>
            <span className="panel px-2 py-1">HORIZON · 72h</span>
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-4 p-4 lg:p-6">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.kind} className="col-span-12 md:col-span-6 xl:col-span-4 panel relative overflow-hidden">
              <div className="absolute top-0 right-0 h-1 w-24" style={{ background: c.priority === "Red" ? "var(--risk-severe)" : c.priority === "Orange" ? "var(--risk-high)" : "var(--risk-moderate)" }} />
              <div className="p-4 border-b border-panel-border flex items-center gap-3">
                <div className="h-10 w-10 rounded-md border border-panel-border bg-card/60 grid place-items-center">
                  <Icon className="h-5 w-5 text-isro-cyan" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">{c.region}</div>
                  <div className="text-base font-semibold">{c.kind}</div>
                </div>
                <div className="ml-auto"><RiskBadge level={c.priority as any} /></div>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Stat label="Risk score" value={c.risk} unit="/100" tone="warn" />
                  <Stat label="Confidence" value={c.confidence} unit="%" tone="up" />
                  <Stat label="Population affected" value={c.pop} />
                  <Stat label="Projected loss" value={c.loss} tone="down" />
                </div>
                <Bar value={c.risk} color="var(--risk-high)" label="Risk index" right={`${c.risk}/100`} />
                <div className="h-12"><Sparkline points={[...c.series]} color="var(--isro-cyan)" /></div>
                <div className="text-sm leading-relaxed text-muted-foreground border-l-2 border-isro-cyan/60 pl-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-isro-cyan block mb-1">AI explanation</span>
                  {c.explain}
                </div>
              </div>
            </div>
          );
        })}

        <Panel className="col-span-12" eyebrow="MODEL TELEMETRY" title="Foundation model performance · last 30 days">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              ["BharatFlood-v3.2", "F1 · 0.91", "var(--isro-cyan)"],
              ["CycloneNet-IN", "F1 · 0.87", "oklch(0.72 0.18 295)"],
              ["HeatPredict-IMD", "MAE · 0.6°C", "var(--isro-saffron)"],
              ["DroughtFM-v2", "RMSE · 0.21", "var(--risk-high)"],
              ["SlopeRisk-Himalaya", "AUC · 0.88", "oklch(0.65 0.13 50)"],
            ].map(([n,m,c])=>(
              <div key={n} className="panel p-3">
                <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">{n}</div>
                <div className="mt-1 text-sm font-semibold">{m}</div>
                <div className="mt-2 h-10"><Sparkline points={Array.from({length:14},(_,i)=>50+Math.sin(i/2)*8+i)} color={c as string} /></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
