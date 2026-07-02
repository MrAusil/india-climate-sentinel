import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/predictions")({
  head: () => ({
    meta: [
      { title: "Predictions — Bharat Climate Twin" },
      { name: "description", content: "Forecast horizons across today, 24 hours, 72 hours, 7 days and 30 days for hydro-meteorological hazards in India." },
    ],
  }),
  component: Predictions,
});

type Horizon = "today" | "24h" | "72h" | "7d" | "30d";

const HORIZONS: Array<{ id: Horizon; label: string }> = [
  { id: "today", label: "Today" },
  { id: "24h", label: "24 hours" },
  { id: "72h", label: "72 hours" },
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
];

type Prediction = {
  region: string;
  hazard: string;
  risk: number;
  confidence: number;
  reason: string;
  response: string;
  model: string;
  updated: string;
};

const DATA: Record<Horizon, Prediction[]> = {
  today: [
    {
      region: "Dibrugarh, Assam", hazard: "Flooding", risk: 78, confidence: 0.86,
      reason: "Brahmaputra is 0.42 m above the danger mark and rainfall of 340 mm has been recorded in the last 72 hours over already saturated catchments.",
      response: "Evacuate 16 low-lying villages and coordinate a controlled release from the upstream Subansiri barrage before 18:00 IST.",
      model: "BharatFlood v3.2", updated: "14:15 IST",
    },
    {
      region: "Bikaner, Rajasthan", hazard: "Heatwave", risk: 71, confidence: 0.92,
      reason: "Maximum temperatures have crossed 44 °C for three consecutive days with humidity below 20% and no relief expected before the weekend.",
      response: "Open cooling centres in 14 municipal wards and reschedule outdoor work to before 10:00 and after 17:00.",
      model: "HeatPredict IMD", updated: "13:50 IST",
    },
  ],
  "24h": [
    {
      region: "Pauri Garhwal, Uttarakhand", hazard: "Forest fire", risk: 62, confidence: 0.73,
      reason: "Vegetation moisture has fallen below 14% and sustained westerly winds of 22 km/h are forecast for the next 24 hours.",
      response: "Position helibucket teams at Tehri and pre-evacuate three forest hamlets on the leeward ridge.",
      model: "FireIndex EOS-08", updated: "12:40 IST",
    },
    {
      region: "Wayanad, Kerala", hazard: "Landslide", risk: 58, confidence: 0.71,
      reason: "Antecedent rainfall of 138 mm over five days has pushed slope saturation above 0.7 on the western Ghats corridor.",
      response: "Restrict night-time traffic on NH-766 and pre-position two search-and-rescue teams at Kalpetta.",
      model: "SlopeRisk Himalaya", updated: "11:20 IST",
    },
  ],
  "72h": [
    {
      region: "Puri, Odisha", hazard: "Cyclone landfall", risk: 82, confidence: 0.81,
      reason: "A deep depression over the Bay of Bengal is intensifying. Sea surface temperatures of 30.2 °C and low wind shear favour rapid strengthening to Category 2.",
      response: "Complete evacuation of the 10 km coastal belt within 24 hours and suspend fishing across Puri and Ganjam.",
      model: "CycloneNet IN", updated: "10:00 IST",
    },
    {
      region: "South 24 Parganas, West Bengal", hazard: "Cyclone watch", risk: 68, confidence: 0.74,
      reason: "The projected cyclone track passes within 90 km of the Sundarbans between hours 60 and 72, with storm-surge potential of 1.8 m.",
      response: "Activate all coastal shelters, pre-position 6 primary health centres and stage NDRF units at Kakdwip.",
      model: "CycloneNet IN", updated: "10:00 IST",
    },
  ],
  "7d": [
    {
      region: "Marathwada, Maharashtra", hazard: "Agricultural drought", risk: 55, confidence: 0.69,
      reason: "SPI-3 has fallen to −1.4 and reservoir storage is at 31%, compared with a 55% ten-year normal for this week.",
      response: "Advise a shift to short-duration bajra varieties and increase tanker frequency from four to six times per week.",
      model: "DroughtFM v2", updated: "09:30 IST",
    },
  ],
  "30d": [
    {
      region: "Ganga basin", hazard: "Riverine flood cluster", risk: 47, confidence: 0.62,
      reason: "Seasonal ensemble members show a 47% probability of a monsoon surge across the middle Ganga basin during the first fortnight.",
      response: "Prepare inter-state coordination plans between Uttar Pradesh, Bihar and West Bengal and review dam operating rules.",
      model: "MonsoonEnsemble ERA5", updated: "yesterday 22:00 IST",
    },
  ],
};

function Predictions() {
  const [h, setH] = useState<Horizon>("72h");
  const list = DATA[h];

  return (
    <div>
      <PageHeader
        eyebrow="Prediction timeline"
        title="Forecast horizons"
        description="Ensemble forecasts across leading horizons. Each item describes what is expected, why, and what response is recommended, in plain language."
      />

      <div className="border-b border-border bg-card">
        <div className="px-4 lg:px-8 flex overflow-x-auto">
          {HORIZONS.map((x) => (
            <button
              key={x.id}
              onClick={() => setH(x.id)}
              className={cn(
                "px-4 py-3 text-sm border-b-2 whitespace-nowrap transition-colors",
                h === x.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 lg:px-8 py-6 max-w-4xl">
        {list.length === 0 && (
          <p className="text-sm text-muted-foreground">No significant predictions for this horizon.</p>
        )}
        <ul className="space-y-4">
          {list.map((p) => (
            <li key={p.region + p.hazard} className="panel p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">{p.region}</div>
                  <h2 className="mt-1 text-lg font-semibold">{p.hazard}</h2>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Meter label="Risk" value={p.risk} suffix="/100" />
                  <Meter label="Confidence" value={Math.round(p.confidence * 100)} suffix="%" />
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono mb-1">Why</div>
                  <p className="text-sm leading-relaxed">{p.reason}</p>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono mb-1">Recommended response</div>
                  <p className="text-sm leading-relaxed">{p.response}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-muted-foreground">
                <span>Model: {p.model}</span>
                <span>Updated: {p.updated}</span>
                <span>Data: IMD · CWC · Copernicus ERA5 · Sentinel</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Meter({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-mono">{label}</div>
      <div className="text-lg font-semibold">{value}<span className="text-xs text-muted-foreground font-normal">{suffix}</span></div>
    </div>
  );
}
