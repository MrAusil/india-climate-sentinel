import { createFileRoute, Link } from "@tanstack/react-router";
import { IndiaMap } from "@/components/IndiaMap";
import { Panel, Stat, Sparkline, Bar, RiskBadge } from "@/components/Panel";
import { ArrowRight, Radio, Satellite, Waves, Wind, Flame, Thermometer, Droplets, Activity, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bharat Climate Twin · National Climate Intelligence Platform" },
      { name: "description", content: "AI-powered climate digital twin for India: predict disasters before they happen and build district-level resilience." },
    ],
  }),
  component: Home,
});

const trendT = [28.1, 28.4, 28.6, 28.9, 29.2, 29.0, 29.5, 29.8, 30.1, 30.3, 30.6, 30.9];
const trendR = [120, 135, 110, 180, 220, 260, 305, 280, 240, 200, 165, 140];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative grid-bg border-b border-border">
        <div className="px-4 lg:px-8 pt-8 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-isro-saffron/50 bg-isro-saffron/10 text-[11px] font-mono uppercase tracking-[0.16em] text-isro-saffron">
              <span className="h-1.5 w-1.5 rounded-full bg-isro-saffron pulse-dot" />
              Official Prototype Submission · BAH ISRO Hackathon 2026
            </span>
            <span className="px-2.5 py-1 rounded-sm border border-panel-border bg-card/60 text-[11px] font-mono text-muted-foreground">
              Problem Statement · BAH-2026-PS-05 · AI-Powered Climate Digital Twin for India-Specific Disaster Prediction & Resilience
            </span>
          </div>
        </div>

        <div className="px-4 lg:px-8 pb-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
            <div className="text-[10px] uppercase tracking-[0.22em] text-isro-cyan font-mono">National Climate Intelligence Platform · v1.0</div>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              <span className="text-gradient-isro">BHARAT</span><br />
              CLIMATE TWIN
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Predicting disasters <em>before</em> they happen. Building climate resilience
              for every district of India — fusing ISRO satellite intelligence, IMD weather
              streams and AI foundation models into a single operational digital twin.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/digital-twin" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
                Launch Digital Twin <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/command-center" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-panel-border bg-card/60 text-sm hover:bg-accent">
                <Radio className="h-4 w-4" /> View National Risk Dashboard
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <Stat label="Districts monitored" value="766" delta="100% coverage" tone="up" />
              <Stat label="Satellites linked" value="14" unit="active" delta="INSAT · EOS · RISAT" />
              <Stat label="Models in production" value="22" delta="3 retrained this week" tone="up" />
            </div>
          </div>

          <div className="col-span-12 xl:col-span-7">
            <Panel
              eyebrow="LIVE · GEO-MOSAIC"
              title="India National Risk Surface · 24h composite"
              right={<span className="text-[10px] font-mono text-muted-foreground">REFRESH 14:32 IST</span>}
              padded={false}
            >
              <div className="relative aspect-[10/11] bg-background/50 grid-bg">
                <IndiaMap />
                <Legend />
                <div className="sweep-bar" />
              </div>
            </Panel>
          </div>
        </div>
      </section>

      {/* Live indicators */}
      <section className="px-4 lg:px-8 py-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-isro-cyan font-mono">Live Climate Indicators · National Aggregate</div>
            <h2 className="text-2xl font-semibold mt-1">India climate vitals</h2>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground">SRC · IMD · MOSDAC · CWC</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          <Indicator icon={Thermometer} label="Temperature anomaly" value="+1.4" unit="°C" tone="warn" series={trendT} color="var(--isro-saffron)" />
          <Indicator icon={Droplets} label="Rainfall anomaly" value="−18" unit="%" tone="down" series={trendR} color="var(--isro-cyan)" />
          <Indicator icon={Wind} label="Cyclone probability" value="72" unit="%" tone="warn" series={[10,12,20,28,40,55,68,72]} color="oklch(0.72 0.18 295)" />
          <Indicator icon={Waves} label="River overflow risk" value="High" tone="down" series={[20,25,30,42,55,68,75,78]} color="var(--risk-high)" />
          <Indicator icon={Flame} label="Forest fire risk" value="Elevated" tone="warn" series={[12,15,18,22,28,35,40,42]} color="var(--risk-severe)" />
          <Indicator icon={ShieldAlert} label="Population vulnerability" value="0.61" unit="index" tone="warn" series={[0.55,0.56,0.58,0.59,0.60,0.61,0.61,0.61].map(v=>v*100)} color="var(--isro-saffron)" />
        </div>
      </section>

      {/* National status */}
      <section className="px-4 lg:px-8 pb-12 grid grid-cols-12 gap-6">
        <Panel className="col-span-12 lg:col-span-7" eyebrow="ACTIVE INCIDENTS" title="National Disaster Feed · 24h" right={<RiskBadge level="Orange" />}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-mono text-muted-foreground border-b border-panel-border">
                <th className="py-2 font-normal">Region</th>
                <th className="font-normal">Event</th>
                <th className="font-normal">Risk</th>
                <th className="font-normal text-right">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel-border/60">
              {[
                ["Assam · Dibrugarh", "Brahmaputra +0.42m above danger", "Red", "T+06h"],
                ["West Bengal · Sundarbans", "Cyclonic formation Bay of Bengal", "Orange", "T+72h"],
                ["Maharashtra · Marathwada", "Drought SPI −1.4 (severe)", "Yellow", "Ongoing"],
                ["Uttarakhand · Pauri Garhwal", "Forest fire spread index 0.62", "Orange", "T+18h"],
                ["Kerala · Wayanad", "Soil saturation, landslide watch", "Yellow", "T+24h"],
                ["Rajasthan · Bikaner", "Heatwave 46.8°C forecast", "Orange", "T+30h"],
              ].map(([r, e, lvl, eta]) => (
                <tr key={r as string} className="hover:bg-accent/40">
                  <td className="py-2.5 font-medium">{r}</td>
                  <td className="text-muted-foreground">{e}</td>
                  <td><RiskBadge level={lvl as any} /></td>
                  <td className="text-right font-mono text-xs text-muted-foreground">{eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel className="col-span-12 lg:col-span-5" eyebrow="AI INSIGHT" title="Climate Copilot · digest" right={<span className="text-[10px] font-mono text-isro-cyan">BHARATCLIMATE-FM v2.4</span>}>
          <div className="space-y-3 text-sm">
            <p className="leading-relaxed">
              National risk surface is dominated by a <span className="text-isro-saffron">Bay of Bengal low-pressure system</span> intensifying
              over the next 72 hours, with cyclone landfall probability now 72% (±8) along the
              Odisha–West Bengal coastline. Concurrent Brahmaputra crest exceeds danger
              levels in 4 districts; coordinated evacuation recommended.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <Stat label="Recommendations" value="11" delta="3 critical" tone="warn" />
              <Stat label="Population at risk" value="4.2M" delta="+0.6M / 24h" tone="down" />
              <Stat label="Confidence" value="0.86" delta="ensemble" tone="up" />
            </div>
            <Bar label="National Climate Risk Status" right="ELEVATED · 68 / 100" value={68} color="var(--risk-high)" />
          </div>
        </Panel>
      </section>
    </div>
  );
}

function Legend() {
  const items: Array<[string, string]> = [
    ["Flood", "var(--isro-cyan)"],
    ["Cyclone", "oklch(0.72 0.18 295)"],
    ["Heatwave", "var(--risk-high)"],
    ["Drought", "var(--isro-saffron)"],
    ["Landslide", "oklch(0.65 0.13 50)"],
    ["Fire", "var(--risk-severe)"],
  ];
  return (
    <div className="absolute bottom-3 right-3 panel px-3 py-2 text-[11px] font-mono space-y-1">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Risk layers</div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        {items.map(([l, c]) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: c }} />{l}
          </div>
        ))}
      </div>
    </div>
  );
}

function Indicator({
  icon: Icon, label, value, unit, tone, series, color,
}: { icon: any; label: string; value: string | number; unit?: string; tone: "up" | "down" | "warn" | "neutral"; series: number[]; color: string }) {
  const toneCls = tone === "down" ? "text-risk-severe" : tone === "warn" ? "text-isro-saffron" : tone === "up" ? "text-isro-green" : "";
  return (
    <div className="panel p-3 flex flex-col">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-isro-cyan" />
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">{label}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <div className={`text-2xl font-semibold tracking-tight ${toneCls}`}>{value}</div>
        {unit && <div className="text-xs text-muted-foreground">{unit}</div>}
      </div>
      <div className="mt-2 h-10"><Sparkline points={series} color={color} /></div>
    </div>
  );
}
