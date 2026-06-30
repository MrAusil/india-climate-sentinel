import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Panel, Stat, Bar } from "@/components/Panel";
import { Users, School, Cross, Route as RouteIcon, Zap, Wheat } from "lucide-react";

export const Route = createFileRoute("/citizen-impact")({
  head: () => ({
    meta: [
      { title: "Citizen Impact Dashboard · Bharat Climate Twin" },
      { name: "description", content: "Human-scale impact of climate risk across population, schools, hospitals, roads, power and agriculture." },
    ],
  }),
  component: Citizen,
});

const CARDS = [
  { icon: Users, label: "Population at risk", value: "12.4M", sub: "across 38 districts", color: "var(--risk-severe)", bar: 78 },
  { icon: School, label: "Schools affected", value: "8,420", sub: "of which 612 fully closed", color: "var(--isro-saffron)", bar: 54 },
  { icon: Cross, label: "Hospitals affected", value: "1,184", sub: "242 on backup power", color: "var(--risk-high)", bar: 62 },
  { icon: RouteIcon, label: "Roads affected", value: "3,920 km", sub: "238 segments closed", color: "var(--isro-cyan)", bar: 48 },
  { icon: Zap, label: "Power infra affected", value: "412 sub-stations", sub: "6 grid islanding events", color: "oklch(0.72 0.18 295)", bar: 35 },
  { icon: Wheat, label: "Agricultural area", value: "2.1M ha", sub: "₹ 4,800 Cr crop exposure", color: "var(--isro-green)", bar: 66 },
];

function Citizen() {
  return (
    <div>
      <PageHeader
        eyebrow="CITIZEN IMPACT · HUMAN-SCALE TWIN"
        title="People, services and infrastructure exposure"
        description="National roll-up of citizen exposure derived from the digital twin × census × infrastructure registries (SoI / NIUA)."
      />

      <div className="grid grid-cols-12 gap-4 p-4 lg:p-6">
        {CARDS.map(c=>{
          const Icon = c.icon;
          return (
            <div key={c.label} className="col-span-12 sm:col-span-6 xl:col-span-4 panel p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-md grid place-items-center" style={{ background: `color-mix(in oklab, ${c.color} 18%, transparent)`, border: `1px solid color-mix(in oklab, ${c.color} 45%, transparent)` }}>
                  <Icon className="h-5 w-5" style={{ color: c.color }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">{c.label}</div>
                  <div className="text-2xl font-semibold tracking-tight">{c.value}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">{c.sub}</div>
              <div className="mt-3"><Bar value={c.bar} color={c.color} /></div>
            </div>
          );
        })}

        <Panel className="col-span-12" eyebrow="VULNERABILITY BREAKDOWN" title="Most exposed populations">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {[
              ["Children < 14", 4.1, "M"],
              ["Elderly > 60", 2.3, "M"],
              ["Persons with disability", 0.6, "M"],
              ["Below poverty line", 5.8, "M"],
              ["Coastal residents", 3.4, "M"],
              ["Migrant labour", 1.9, "M"],
            ].map(([l,v,u])=>(
              <Bar key={l as string} label={l as string} right={`${v}${u}`} value={Math.min(100,(v as number)/6*100)} color="var(--isro-saffron)" />
            ))}
          </div>
        </Panel>

        <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Shelters operational" value="1,842" delta="capacity 1.4M" tone="up" />
          <Stat label="Rescue teams deployed" value="138" delta="NDRF + SDRF" tone="up" />
          <Stat label="Relief packages" value="2.6M" unit="dispatched" />
          <Stat label="Toll-free calls / hr" value="14,200" delta="peak 18,400" tone="warn" />
        </div>
      </div>
    </div>
  );
}
