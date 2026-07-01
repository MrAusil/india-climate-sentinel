import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IndiaMap } from "@/components/IndiaMap";
import { Panel, Stat, Bar } from "@/components/Panel";
import { PageHeader } from "@/components/AppShell";
import type { RiskKind } from "@/lib/india-geo";
import { Layers, Mountain, Droplets, Building2, Tractor, Train, Satellite, ZoomIn, ZoomOut } from "lucide-react";

export const Route = createFileRoute("/digital-twin")({
  head: () => ({
    meta: [
      { title: "Digital Twin · Bharat Climate Twin" },
      { name: "description", content: "Interactive 3D digital twin of India: satellite, terrain, hydrology, climate, infrastructure and projection layers." },
    ],
  }),
  component: DigitalTwin,
});

const LAYERS: Array<{ id: RiskKind | "sat" | "elev" | "river" | "pop" | "crop" | "urban" | "transport" | "proj"; label: string; icon: any }> = [
  { id: "sat", label: "Satellite imagery", icon: Satellite },
  { id: "elev", label: "Elevation", icon: Mountain },
  { id: "river", label: "Rivers & reservoirs", icon: Droplets },
  { id: "pop", label: "Population density", icon: Building2 },
  { id: "crop", label: "Crop zones", icon: Tractor },
  { id: "urban", label: "Urban infrastructure", icon: Building2 },
  { id: "transport", label: "Transportation", icon: Train },
  { id: "proj", label: "Climate projection", icon: Layers },
  { id: "flood", label: "Flood risk", icon: Layers },
  { id: "cyclone", label: "Cyclone risk", icon: Layers },
  { id: "heatwave", label: "Heatwave risk", icon: Layers },
  { id: "drought", label: "Drought risk", icon: Layers },
];

const STATES = ["Maharashtra","West Bengal","Tamil Nadu","Uttar Pradesh","Kerala","Assam","Odisha","Gujarat","Rajasthan","Karnataka"];
const DISTRICTS: Record<string, string[]> = {
  Maharashtra: ["Mumbai City","Pune","Nagpur","Aurangabad","Solapur"],
  "West Bengal": ["Kolkata","Howrah","North 24 Parganas","South 24 Parganas","Darjeeling"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem"],
};
const TIMES = ["2020","2025","2030","2040","2050"] as const;
const MODES = ["Current","Historical","Future Simulation"] as const;

function DigitalTwin() {
  const [active, setActive] = useState<Set<string>>(new Set(["sat","river","flood","cyclone"]));
  const [stateName, setStateName] = useState("Maharashtra");
  const [district, setDistrict] = useState("Mumbai City");
  const [mode, setMode] = useState<typeof MODES[number]>("Current");
  const [t, setT] = useState(1);
  const [baseLayer, setBaseLayer] = useState<"admin" | "satellite" | "terrain" | "osm">("admin");


  const toggle = (k: string) =>
    setActive((s) => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n; });

  const riskLayers = (["flood","cyclone","heatwave","drought","landslide","fire"] as RiskKind[]).filter((k) => active.has(k));

  return (
    <div>
      <PageHeader
        eyebrow="DIGITAL TWIN · GEOSPATIAL ENGINE"
        title="Climate Digital Twin of India"
        description="A live, multi-layer 3D representation of India fusing satellite, hydrological, demographic and infrastructure data. Select region, layers and time horizon to inspect."
        actions={
          <div className="flex items-center gap-2 font-mono text-xs">
            <button className="px-2 py-1 panel"><ZoomOut className="h-3.5 w-3.5" /></button>
            <span className="px-2 py-1 panel">Zoom · 1:1.4M</span>
            <button className="px-2 py-1 panel"><ZoomIn className="h-3.5 w-3.5" /></button>
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-4 p-4 lg:p-6">
        <Panel className="col-span-12 lg:col-span-3" eyebrow="REGION SELECT" title="Spatial scope">
          <div className="space-y-3 text-sm">
            <Field label="State">
              <select value={stateName} onChange={(e)=>setStateName(e.target.value)} className="w-full bg-input/60 border border-panel-border rounded-sm px-2 py-1.5 font-mono text-xs">
                {STATES.map(s=> <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="District">
              <select value={district} onChange={(e)=>setDistrict(e.target.value)} className="w-full bg-input/60 border border-panel-border rounded-sm px-2 py-1.5 font-mono text-xs">
                {(DISTRICTS[stateName] ?? ["—"]).map(s=> <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Taluka / Tehsil">
              <select className="w-full bg-input/60 border border-panel-border rounded-sm px-2 py-1.5 font-mono text-xs">
                <option>Andheri</option><option>Borivali</option><option>Kurla</option><option>Dahisar</option>
              </select>
            </Field>
            <Field label="View mode">
              <div className="grid grid-cols-3 gap-1">
                {MODES.map(m=>(
                  <button key={m} onClick={()=>setMode(m)} className={`px-2 py-1 text-[11px] rounded-sm border ${mode===m?"bg-primary text-primary-foreground border-primary":"border-panel-border text-muted-foreground hover:text-foreground"}`}>{m}</button>
                ))}
              </div>
            </Field>
          </div>

          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono mb-2">Layers</div>
            <ul className="space-y-1">
              {LAYERS.map(l=>{
                const Icon = l.icon; const on = active.has(l.id);
                return (
                  <li key={l.id}>
                    <button onClick={()=>toggle(l.id)} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-xs ${on?"bg-accent text-foreground border border-panel-border":"text-muted-foreground hover:text-foreground"}`}>
                      <Icon className="h-3.5 w-3.5" />
                      <span className="flex-1 text-left">{l.label}</span>
                      <span className={`h-1.5 w-1.5 rounded-full ${on?"bg-isro-cyan":"bg-muted-foreground/30"}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Panel>

        <Panel className="col-span-12 lg:col-span-9" eyebrow={`SCENE · ${mode.toUpperCase()} · ${TIMES[t]}`} title={`${district}, ${stateName}`} padded={false} right={
          <span className="text-[10px] font-mono text-muted-foreground">PROJ · EPSG:4326</span>
        }>
          <div className="flex items-center gap-2 px-3 py-2 border-b border-panel-border text-[11px] font-mono">
            <span className="uppercase tracking-wider text-muted-foreground">Basemap</span>
            {(["admin","satellite","terrain","osm"] as const).map((b) => (
              <button key={b} onClick={() => setBaseLayer(b)} className={`px-2 py-0.5 rounded-sm border ${baseLayer===b?"border-primary bg-primary text-primary-foreground":"border-border text-muted-foreground hover:text-foreground"}`}>{b}</button>
            ))}
            <span className="ml-auto text-muted-foreground">Coords · 22.5°N 80.5°E</span>
          </div>
          <div className="relative" style={{ height: "58vh", minHeight: 480 }}>
            <IndiaMap baseLayer={baseLayer} activeLayers={riskLayers} showCities onDistrictSelect={(n)=>setStateName(n)} />
            <div className="absolute left-2 bottom-2 z-[500] panel px-2.5 py-1.5 text-[10px] font-mono">
              <span className="text-muted-foreground">Scene</span> {TIMES[t]} · {mode} · <span className="text-muted-foreground">Layers</span> {active.size}
            </div>
          </div>

          <div className="p-4 border-t border-panel-border">
            <div className="flex items-center justify-between mb-2 text-[11px] font-mono text-muted-foreground">
              <span>TIME HORIZON</span>
              <span>{TIMES[t]} · climate projection ensemble (CMIP6 · India downscale)</span>
            </div>
            <input type="range" min={0} max={TIMES.length-1} value={t} onChange={(e)=>setT(+e.target.value)} className="w-full accent-isro-cyan" />
            <div className="flex justify-between mt-1 text-[10px] font-mono text-muted-foreground">
              {TIMES.map(y=> <span key={y}>{y}</span>)}
            </div>
          </div>
        </Panel>

        <Panel className="col-span-12 lg:col-span-4" eyebrow="ENVIRONMENT" title="Current conditions">
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Surface T" value="32.4" unit="°C" delta="+1.8 vs 1991-2020" tone="warn" />
            <Stat label="Rel. humidity" value="78" unit="%" delta="saturated" />
            <Stat label="Soil moisture" value="0.41" unit="m³/m³" delta="+0.06" tone="warn" />
            <Stat label="NDVI" value="0.62" delta="stable" tone="up" />
          </div>
        </Panel>

        <Panel className="col-span-12 lg:col-span-4" eyebrow="HYDROLOGY" title="Basin telemetry">
          <div className="space-y-2.5">
            <Bar label="Mithi river stage" right="3.4 / 4.0 m" value={85} color="var(--risk-high)" />
            <Bar label="Powai reservoir" right="92%" value={92} color="var(--isro-cyan)" />
            <Bar label="Bhatsa reservoir" right="76%" value={76} color="var(--isro-cyan)" />
            <Bar label="Drainage saturation" right="HIGH" value={88} color="var(--risk-severe)" />
          </div>
        </Panel>

        <Panel className="col-span-12 lg:col-span-4" eyebrow="PROJECTION 2050" title="Climate trajectory">
          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Mean annual T</span><span className="font-mono text-isro-saffron">+2.4°C</span></li>
            <li className="flex justify-between"><span>Monsoon variability</span><span className="font-mono text-risk-high">+38%</span></li>
            <li className="flex justify-between"><span>Sea level (Mumbai)</span><span className="font-mono text-risk-severe">+0.42 m</span></li>
            <li className="flex justify-between"><span>Heat-stress days</span><span className="font-mono text-isro-saffron">+47 / yr</span></li>
            <li className="flex justify-between"><span>Crop yield drift</span><span className="font-mono text-risk-high">−12%</span></li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: any }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono mb-1">{label}</div>
      {children}
    </label>
  );
}
