import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { Panel, Stat, Bar, RiskBadge } from "@/components/Panel";
import { IndiaMap } from "@/components/IndiaMap";
import { Play, RefreshCcw } from "lucide-react";
import type { RiskKind } from "@/lib/india-geo";

export const Route = createFileRoute("/simulation")({
  head: () => ({
    meta: [
      { title: "Scenario Simulation Lab · Bharat Climate Twin" },
      { name: "description", content: "Run what-if climate scenarios — extreme rainfall, cyclone landfall, heatwave, drought, dam overflow and sea-level rise." },
    ],
  }),
  component: Simulation,
});

const SCENARIOS = [
  ["Extreme Rainfall", "flood"],
  ["Cyclone Landfall", "cyclone"],
  ["Heatwave Event", "heatwave"],
  ["Drought Conditions", "drought"],
  ["Dam Overflow", "flood"],
  ["Sea-Level Rise", "flood"],
] as const;

function Simulation() {
  const [scenario, setScenario] = useState<typeof SCENARIOS[number]>(SCENARIOS[0]);
  const [rainfall, setRainfall] = useState(280);
  const [temp, setTemp] = useState(44);
  const [wind, setWind] = useState(160);
  const [density, setDensity] = useState("Urban · 12k/km²");
  const [infra, setInfra] = useState("Baseline 2025");
  const [ran, setRan] = useState(false);

  const intensity = Math.min(100, Math.round((rainfall - 100) / 4 + (wind - 60) / 4 + (temp - 28)));
  const flooded = Math.round(intensity * 3.6);
  const pop = (intensity * 0.05).toFixed(2);
  const econ = Math.round(intensity * 78);

  return (
    <div>
      <PageHeader
        eyebrow="SIMULATION LAB · WHAT-IF ENGINE"
        title="Scenario simulation"
        description="Adjust climate and exposure parameters, run a scenario through the digital twin and inspect before / after impact across infrastructure, population and economy."
        actions={
          <button onClick={()=>setRan(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm">
            <Play className="h-4 w-4" /> Run simulation
          </button>
        }
      />

      <div className="grid grid-cols-12 gap-4 p-4 lg:p-6">
        <Panel className="col-span-12 lg:col-span-3" eyebrow="SCENARIO" title="Hazard type">
          <div className="space-y-1.5">
            {SCENARIOS.map(([n, k])=>(
              <button key={n} onClick={()=>setScenario([n,k] as any)}
                className={`w-full text-left px-3 py-2 rounded-sm border text-sm ${scenario[0]===n?"bg-accent text-foreground border-panel-border":"border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/40"}`}>
                {n}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <Slider label="Rainfall intensity" unit="mm/24h" min={50} max={500} value={rainfall} onChange={setRainfall} />
            <Slider label="Temperature peak" unit="°C" min={28} max={52} value={temp} onChange={setTemp} />
            <Slider label="Wind speed" unit="km/h" min={40} max={260} value={wind} onChange={setWind} />
            <Select label="Population density" value={density} onChange={setDensity}
              options={["Rural · 200/km²","Semi-urban · 2k/km²","Urban · 12k/km²","Megacity · 32k/km²"]} />
            <Select label="Infrastructure growth" value={infra} onChange={setInfra}
              options={["Baseline 2025","+25% by 2035","+50% by 2045","Climate-resilient 2050"]} />
            <button onClick={()=>{setRan(false);setRainfall(280);setTemp(44);setWind(160);}}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-panel-border text-xs font-mono text-muted-foreground hover:text-foreground">
              <RefreshCcw className="h-3.5 w-3.5" /> Reset parameters
            </button>
          </div>
        </Panel>

        <div className="col-span-12 lg:col-span-9 grid grid-cols-12 gap-4">
          <Panel className="col-span-12 md:col-span-6" eyebrow="BASELINE · BEFORE" title="Current state" padded={false}>
            <div className="relative aspect-[4/5] grid-bg">
              <IndiaMap activeLayers={[]} showCities={false} />
              <div className="absolute bottom-2 left-2 panel px-2 py-1 text-[10px] font-mono text-muted-foreground">SCENE · BASELINE</div>
            </div>
          </Panel>
          <Panel className="col-span-12 md:col-span-6" eyebrow={`PROJECTED · ${scenario[0].toUpperCase()}`} title="After scenario" padded={false} right={<RiskBadge level={intensity>70?"Red":intensity>50?"Orange":"Yellow"} />}>
            <div className="relative aspect-[4/5] grid-bg">
              <IndiaMap activeLayers={[scenario[1] as RiskKind]} showCities={false} />
              {ran && <div className="sweep-bar" />}
              <div className="absolute bottom-2 left-2 panel px-2 py-1 text-[10px] font-mono text-isro-cyan">SCENE · T+{ran?"24h":"00h"}</div>
            </div>
          </Panel>

          <div className="col-span-12 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            <Stat label="Flooded area" value={flooded.toLocaleString()} unit="km²" tone="warn" />
            <Stat label="Affected population" value={`${pop}M`} tone="down" />
            <Stat label="Road disruptions" value={Math.round(intensity*1.4)} unit="segments" tone="warn" />
            <Stat label="Hospital stress" value={`${Math.min(100,intensity+10)}%`} tone="down" />
            <Stat label="Crop loss" value={`${Math.round(intensity*0.6)}k ha`} tone="warn" />
            <Stat label="Economic impact" value={`₹ ${econ.toLocaleString()} Cr`} tone="down" />
          </div>

          <Panel className="col-span-12" eyebrow="ENGINE OUTPUT" title="Composite impact">
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-2.5">
              <Bar label="Urban infrastructure stress" right={`${intensity}%`} value={intensity} color="var(--risk-high)" />
              <Bar label="Healthcare load index" right={`${Math.min(100, intensity+10)}%`} value={Math.min(100,intensity+10)} color="var(--risk-severe)" />
              <Bar label="Transport network disruption" right={`${Math.max(5,intensity-5)}%`} value={Math.max(5,intensity-5)} color="var(--isro-saffron)" />
              <Bar label="Agricultural impact" right={`${Math.round(intensity*0.7)}%`} value={Math.round(intensity*0.7)} color="var(--risk-high)" />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, unit, min, max, value, onChange }: { label: string; unit: string; min: number; max: number; value: number; onChange: (n: number)=>void }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] font-mono text-muted-foreground mb-1">
        <span>{label}</span><span className="text-foreground">{value} <span className="text-muted-foreground">{unit}</span></span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e)=>onChange(+e.target.value)} className="w-full accent-isro-cyan" />
    </div>
  );
}
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v:string)=>void; options: string[] }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono mb-1">{label}</div>
      <select value={value} onChange={(e)=>onChange(e.target.value)} className="w-full bg-input/60 border border-panel-border rounded-sm px-2 py-1.5 font-mono text-xs">
        {options.map(o=> <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
