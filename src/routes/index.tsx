import { createFileRoute, Link } from "@tanstack/react-router";
import { IndiaMap } from "@/components/IndiaMap";
import { Panel, Stat, Sparkline, Bar, RiskBadge } from "@/components/Panel";
import { useState } from "react";
import { ArrowRight, Layers, Satellite, Mountain, Map as MapIcon, Radio } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bharat Climate Twin · National Climate Intelligence Platform" },
      { name: "description", content: "Government-grade AI climate digital twin for India: monitor, predict and respond to hydro-meteorological hazards at district resolution." },
    ],
  }),
  component: Home,
});

const trendT = [28.1, 28.4, 28.6, 28.9, 29.2, 29.0, 29.5, 29.8, 30.1, 30.3, 30.6, 30.9];
const trendR = [120, 135, 110, 180, 220, 260, 305, 280, 240, 200, 165, 140];

const BASE_LAYERS = [
  { id: "admin", label: "Administrative", icon: MapIcon },
  { id: "satellite", label: "Satellite", icon: Satellite },
  { id: "terrain", label: "Terrain", icon: Mountain },
  { id: "osm", label: "Street", icon: Layers },
] as const;

const RISK_TOGGLES = [
  { id: "flood", label: "Flood risk" },
  { id: "cyclone", label: "Cyclone forecast" },
  { id: "heatwave", label: "Heatwave" },
  { id: "drought", label: "Drought" },
  { id: "landslide", label: "Landslide" },
  { id: "fire", label: "Forest fire" },
] as const;

function Home() {
  const [base, setBase] = useState<(typeof BASE_LAYERS)[number]["id"]>("admin");
  const [risks, setRisks] = useState<Set<string>>(new Set(["flood", "cyclone", "heatwave"]));

  const toggle = (id: string) =>
    setRisks((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div>
      {/* Header strip */}
      <section className="border-b border-border bg-card">
        <div className="px-4 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
              Ministry of Earth Sciences · ISRO · NDMA · IMD
            </div>
            <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
              National Climate Intelligence Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
              District-resolution monitoring, forecasting and decision support for
              hydro-meteorological hazards across India.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/digital-twin" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              Open Digital Twin <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/command-center" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border border-border text-sm hover:bg-accent">
              <Radio className="h-4 w-4" /> Command Center
            </Link>
          </div>
        </div>
      </section>

      {/* National risk summary strip */}
      <section className="px-4 lg:px-8 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          <RiskCard label="Flood risk" pct={72} status="High" trend="+6" tone="high" />
          <RiskCard label="Cyclone risk" pct={68} status="High" trend="+14" tone="high" />
          <RiskCard label="Heatwave" pct={54} status="Moderate" trend="−3" tone="mod" />
          <RiskCard label="Drought" pct={41} status="Moderate" trend="+2" tone="mod" />
          <RiskCard label="Landslide" pct={36} status="Watch" trend="+1" tone="low" />
          <RiskCard label="Forest fire" pct={48} status="Moderate" trend="+8" tone="mod" />
        </div>
      </section>

      {/* Main GIS map + side rails */}
      <section className="px-4 lg:px-8 py-6 grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-9">
          <Panel
            eyebrow="GEOSPATIAL VIEWER"
            title="India · National Risk Composite"
            right={<span className="text-[11px] font-mono text-muted-foreground">EPSG:4326 · Refresh 14:32 IST</span>}
            padded={false}
          >
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 px-3 py-2 border-b border-panel-border text-xs">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mr-1">Basemap</span>
                {BASE_LAYERS.map((b) => {
                  const Icon = b.icon;
                  const on = base === b.id;
                  return (
                    <button key={b.id} onClick={() => setBase(b.id)}
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border text-[11px] ${on ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                      <Icon className="h-3 w-3" /> {b.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-1 ml-auto flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mr-1">Overlays</span>
                {RISK_TOGGLES.map((r) => {
                  const on = risks.has(r.id);
                  return (
                    <button key={r.id} onClick={() => toggle(r.id)}
                      className={`px-2 py-1 rounded-sm border text-[11px] ${on ? "border-primary/50 bg-accent text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative" style={{ height: "62vh", minHeight: 520 }}>
              <IndiaMap baseLayer={base} activeLayers={Array.from(risks) as any} />
              <MapLegend />
            </div>
          </Panel>
        </div>

        <div className="col-span-12 xl:col-span-3 space-y-4">
          <Panel eyebrow="AT A GLANCE" title="Live climate indicators">
            <div className="space-y-3">
              <Indicator label="Temperature anomaly" value="+1.4°C" series={trendT} tone="warn" />
              <Indicator label="Rainfall anomaly" value="−18%" series={trendR} tone="down" />
              <Indicator label="Cyclone probability (Bay of Bengal)" value="72%" series={[10,12,20,28,40,55,68,72]} tone="warn" />
              <Indicator label="Population vulnerability index" value="0.61" series={[55,56,58,59,60,61,61,61]} tone="warn" />
            </div>
          </Panel>

          <Panel eyebrow="COVERAGE" title="Platform footprint">
            <div className="grid grid-cols-3 gap-2">
              <Stat label="Districts" value="766" delta="100%" tone="up" />
              <Stat label="Satellites" value="14" delta="active" />
              <Stat label="Models" value="22" delta="in prod" tone="up" />
            </div>
          </Panel>
        </div>
      </section>

      {/* Alerts table + AI brief */}
      <section className="px-4 lg:px-8 pb-10 grid grid-cols-12 gap-4">
        <Panel className="col-span-12 lg:col-span-7" eyebrow="ACTIVE ALERTS" title="National Disaster Feed · last 24h" right={<RiskBadge level="Orange" />}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-mono text-muted-foreground border-b border-panel-border">
                <th className="py-2 font-normal">District / Region</th>
                <th className="font-normal">Event</th>
                <th className="font-normal">Severity</th>
                <th className="font-normal text-right">Expected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel-border/60">
              {[
                ["Dibrugarh, Assam", "Brahmaputra +0.42 m above danger", "Red", "T+06h"],
                ["South 24 Parganas, WB", "Cyclonic formation, Bay of Bengal", "Orange", "T+72h"],
                ["Marathwada, Maharashtra", "Drought · SPI −1.4 (severe)", "Yellow", "Ongoing"],
                ["Pauri Garhwal, Uttarakhand", "Forest fire · spread index 0.62", "Orange", "T+18h"],
                ["Wayanad, Kerala", "Soil saturation · landslide watch", "Yellow", "T+24h"],
                ["Bikaner, Rajasthan", "Heatwave · 46.8 °C forecast", "Orange", "T+30h"],
              ].map(([r, e, lvl, eta]) => (
                <tr key={r as string} className="hover:bg-accent/60">
                  <td className="py-2.5 font-medium">{r}</td>
                  <td className="text-muted-foreground">{e}</td>
                  <td><RiskBadge level={lvl as any} /></td>
                  <td className="text-right font-mono text-xs text-muted-foreground">{eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel className="col-span-12 lg:col-span-5" eyebrow="ANALYTICAL BRIEF" title="National situation summary" right={<span className="text-[10px] font-mono text-muted-foreground">BHARATCLIMATE-FM v2.4</span>}>
          <div className="space-y-3 text-sm">
            <p className="leading-relaxed">
              A Bay of Bengal low-pressure system is intensifying over the next 72 hours;
              landfall probability of a category-2 cyclone is <b>72%</b> along the
              Odisha–West Bengal coastline. Concurrently, Brahmaputra crest exceeds
              danger levels across 4 districts of Upper Assam. Coordinated pre-positioning
              of NDRF assets and evacuation of low-lying areas is advised.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <Stat label="Recommendations" value="11" delta="3 critical" tone="warn" />
              <Stat label="Population at risk" value="4.2M" delta="+0.6M / 24h" tone="down" />
              <Stat label="Ensemble confidence" value="0.86" tone="up" />
            </div>
            <Bar label="National Climate Risk Status" right="ELEVATED · 68 / 100" value={68} color="var(--risk-high)" />
          </div>
        </Panel>
      </section>
    </div>
  );
}

function RiskCard({ label, pct, status, trend, tone }: { label: string; pct: number; status: string; trend: string; tone: "low" | "mod" | "high" }) {
  const color = tone === "high" ? "var(--risk-high)" : tone === "mod" ? "var(--risk-moderate)" : "var(--risk-low)";
  const trendUp = trend.trim().startsWith("+");
  return (
    <div className="panel p-3">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-mono">{label}</div>
        <span className={`text-[10px] font-mono ${trendUp ? "text-risk-severe" : "text-isro-green"}`}>{trend}</span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <div className="text-2xl font-semibold tracking-tight">{pct}%</div>
        <div className="text-[11px] font-mono uppercase" style={{ color }}>{status}</div>
      </div>
      <div className="mt-2 h-1 w-full rounded-sm bg-muted overflow-hidden">
        <div className="h-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function MapLegend() {
  const items: Array<[string, string]> = [
    ["Flood", "var(--isro-cyan)"],
    ["Cyclone", "#7c3aed"],
    ["Heatwave", "var(--risk-high)"],
    ["Drought", "var(--isro-saffron)"],
    ["Landslide", "#a16207"],
    ["Fire", "var(--risk-severe)"],
  ];
  return (
    <div className="absolute bottom-2 right-2 z-[500] panel px-3 py-2 text-[11px] font-mono space-y-1 shadow-sm">
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Legend · Hazard overlays</div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        {items.map(([l, c]) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: c }} /> {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function Indicator({ label, value, series, tone }: { label: string; value: string; series: number[]; tone: "up" | "down" | "warn" }) {
  const color = tone === "down" ? "var(--risk-severe)" : tone === "warn" ? "var(--risk-high)" : "var(--isro-green)";
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
      <div className="h-8 mt-1"><Sparkline points={series} color={color} /></div>
    </div>
  );
}
