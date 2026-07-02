import { createFileRoute } from "@tanstack/react-router";
import { IndiaMap } from "@/components/IndiaMap";
import { useMemo, useState } from "react";
import { Search, MapPin, AlertTriangle, Users, Droplets, Wind, Thermometer, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bharat Climate Twin — National Climate Intelligence" },
      { name: "description", content: "Map-first climate intelligence and disaster prediction platform for India, built on ISRO Bhuvan, IMD, CWC, and Copernicus data." },
    ],
  }),
  component: Home,
});

type District = {
  name: string;
  state: string;
  population: string;
  weather: { temp: string; condition: string; wind: string; humidity: string };
  alerts: Array<{ level: "Red" | "Orange" | "Yellow"; type: string; window: string }>;
  risk: number;
  summary: string;
  actions: string[];
};

const SAMPLE_DISTRICTS: District[] = [
  {
    name: "Dibrugarh", state: "Assam", population: "1.33 million",
    weather: { temp: "28°C", condition: "Heavy rain", wind: "18 km/h SW", humidity: "94%" },
    alerts: [{ level: "Red", type: "Riverine flood", window: "next 72 hours" }],
    risk: 78,
    summary: "Brahmaputra is 0.42 m above the danger mark at Dibrugarh gauge. Continued rainfall of 340 mm over 72 hours combined with saturated catchments indicates high probability of flooding across 9 sub-divisions.",
    actions: [
      "Evacuate 16 riverside villages (approx. 24,000 residents)",
      "Coordinate release schedule with upstream Subansiri barrage",
      "Deploy 4 NDRF mobile medical units to Naharkatia and Tingkhong",
    ],
  },
  {
    name: "Puri", state: "Odisha", population: "1.70 million",
    weather: { temp: "31°C", condition: "Overcast, rising winds", wind: "42 km/h E", humidity: "88%" },
    alerts: [{ level: "Red", type: "Cyclone landfall", window: "next 14 hours" }],
    risk: 82,
    summary: "Deep depression over the Bay of Bengal is intensifying. Landfall of a Category-2 cyclone is expected between Puri and Paradip within 14 hours.",
    actions: [
      "Evacuate coastal belt within 10 km (approx. 410,000 residents)",
      "Suspend fishing operations across Puri and Ganjam",
      "Harvest standing paddy in coastal blocks within 24 hours",
    ],
  },
  {
    name: "Bikaner", state: "Rajasthan", population: "2.36 million",
    weather: { temp: "44°C", condition: "Clear, extreme heat", wind: "12 km/h W", humidity: "18%" },
    alerts: [{ level: "Orange", type: "Heatwave", window: "next 5 days" }],
    risk: 64,
    summary: "Persistent upper-air ridge is expected to push maximum temperatures to 46–48 °C for five consecutive days. Heat-related morbidity is projected to rise 1.4× above baseline.",
    actions: [
      "Open cooling centres in 14 municipal wards",
      "Reschedule outdoor labour to before 10:00 and after 17:00",
      "Pre-position ORS and IV fluids at 22 primary health centres",
    ],
  },
];

const ALL_DISTRICTS = [
  "Dibrugarh, Assam", "Puri, Odisha", "Bikaner, Rajasthan",
  "South 24 Parganas, West Bengal", "Pauri Garhwal, Uttarakhand",
  "Wayanad, Kerala", "Beed, Maharashtra", "Chennai, Tamil Nadu",
  "Guwahati, Assam", "Bhubaneswar, Odisha",
];

function Home() {
  const [selected, setSelected] = useState<District | null>(null);
  const [query, setQuery] = useState("");
  const [base, setBase] = useState<"admin" | "satellite" | "terrain">("admin");

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return ALL_DISTRICTS.filter((d) => d.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }, [query]);

  const onSelect = (name: string) => {
    const d = SAMPLE_DISTRICTS.find((x) => name.toLowerCase().includes(x.name.toLowerCase()));
    setSelected(d ?? SAMPLE_DISTRICTS[0]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-56px-40px)]">
      {/* Left rail — search + status */}
      <aside className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <label className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">Locate</label>
          <div className="relative mt-1.5">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search district or state"
              className="w-full pl-8 pr-3 py-2 text-sm rounded-sm border border-border bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="mt-1.5 border border-border rounded-sm bg-card overflow-hidden">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => { onSelect(s); setQuery(""); }}
                    className="w-full text-left px-3 py-1.5 text-sm hover:bg-accent flex items-center gap-2"
                  >
                    <MapPin className="h-3 w-3 text-muted-foreground" /> {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-b border-border">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">National status</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-semibold">Elevated</span>
            <span className="text-xs text-muted-foreground">68 / 100</span>
          </div>
          <div className="mt-2 h-1 bg-muted rounded-sm overflow-hidden">
            <div className="h-full bg-risk-high" style={{ width: "68%" }} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            Composite index across flood, cyclone, heatwave, drought, landslide and forest-fire risks. Updated every 15 minutes.
          </p>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono mb-2">Active alerts</div>
          <ul className="space-y-2">
            {SAMPLE_DISTRICTS.map((d) => (
              <li key={d.name}>
                <button
                  onClick={() => setSelected(d)}
                  className={cn(
                    "w-full text-left p-3 rounded-sm border transition-colors",
                    selected?.name === d.name
                      ? "border-primary bg-accent"
                      : "border-border hover:bg-accent/60",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        d.alerts[0].level === "Red" && "bg-risk-severe",
                        d.alerts[0].level === "Orange" && "bg-risk-high",
                        d.alerts[0].level === "Yellow" && "bg-risk-moderate",
                      )}
                    />
                    <span className="text-sm font-medium">{d.name}</span>
                    <span className="text-xs text-muted-foreground">· {d.state}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{d.alerts[0].type} · {d.alerts[0].window}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 border-t border-border text-[10px] font-mono text-muted-foreground">
          Sources: IMD · CWC · ISRO Bhuvan · Copernicus
        </div>
      </aside>

      {/* Map */}
      <div className="relative flex-1 min-h-[60vh]">
        <IndiaMap baseLayer={base} onDistrictSelect={onSelect} />

        {/* Basemap switcher */}
        <div className="absolute top-3 right-3 z-[500] panel flex text-xs overflow-hidden">
          {(["admin", "satellite", "terrain"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBase(b)}
              className={cn(
                "px-3 py-1.5 capitalize border-r border-border last:border-r-0",
                base === b ? "bg-primary text-primary-foreground" : "hover:bg-accent",
              )}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Attribution card */}
        <div className="absolute bottom-3 left-3 z-[500] panel px-3 py-1.5 text-[10px] font-mono text-muted-foreground">
          EPSG:4326 · Boundaries © OSM · Imagery © Esri / Maxar
        </div>
      </div>

      {/* Right rail — district detail */}
      {selected && (
        <aside className="w-full lg:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-border bg-card overflow-y-auto">
          <div className="p-4 border-b border-border flex items-start gap-2">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">District</div>
              <div className="text-lg font-semibold">{selected.name}</div>
              <div className="text-xs text-muted-foreground">{selected.state} · Population {selected.population}</div>
            </div>
            <button onClick={() => setSelected(null)} className="ml-auto p-1 rounded-sm hover:bg-accent" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 border-b border-border">
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono mb-2">Current conditions</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Row icon={Thermometer} label="Temperature" value={selected.weather.temp} />
              <Row icon={Droplets} label="Humidity" value={selected.weather.humidity} />
              <Row icon={Wind} label="Wind" value={selected.weather.wind} />
              <Row icon={MapPin} label="Sky" value={selected.weather.condition} />
            </div>
            <div className="mt-2 text-[10px] font-mono text-muted-foreground">Source: IMD AWS · Updated 14:32 IST</div>
          </div>

          <div className="p-4 border-b border-border">
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono mb-2">Active alerts</div>
            {selected.alerts.map((a) => (
              <div key={a.type} className="flex items-start gap-2 p-3 rounded-sm border border-border">
                <AlertTriangle
                  className={cn(
                    "h-4 w-4 mt-0.5",
                    a.level === "Red" && "text-risk-severe",
                    a.level === "Orange" && "text-risk-high",
                    a.level === "Yellow" && "text-risk-moderate",
                  )}
                />
                <div>
                  <div className="text-sm font-medium">{a.type}</div>
                  <div className="text-xs text-muted-foreground">Expected within {a.window}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">Risk score</span>
              <span className="text-[11px] font-mono text-muted-foreground">Confidence 0.86</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">{selected.risk}</span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
            <div className="mt-2 h-1 bg-muted rounded-sm overflow-hidden">
              <div className="h-full bg-risk-high" style={{ width: `${selected.risk}%` }} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{selected.summary}</p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
              <Users className="h-3 w-3" /> Population exposure informed by WorldPop 2024
            </div>
          </div>

          <div className="p-4">
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono mb-2">Recommended actions</div>
            <ol className="space-y-2">
              {selected.actions.map((a, i) => (
                <li key={a} className="flex gap-3 text-sm">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-sm bg-accent text-foreground text-xs font-mono flex items-center justify-center">{i + 1}</span>
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ol>
            <a
              href="#methodology"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              View methodology and model version <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </aside>
      )}
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
    </div>
  );
}
