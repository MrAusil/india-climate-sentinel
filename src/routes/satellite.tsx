import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Panel, Stat, Sparkline } from "@/components/Panel";
import { Satellite, Radio, Wifi } from "lucide-react";

export const Route = createFileRoute("/satellite")({
  head: () => ({
    meta: [
      { title: "Satellite Data Center · Bharat Climate Twin" },
      { name: "description", content: "ISRO satellite data streams — INSAT, Resourcesat, Cartosat, RISAT and EOS missions powering the digital twin." },
    ],
  }),
  component: SatellitePage,
});

const SATS = [
  { name: "INSAT-3DR", desc: "Geostationary meteorology & search-and-rescue", products: ["Cloud cover", "OLR", "Sea-surface temperature", "Rainfall estimate"], pass: "Continuous · 35,786 km GEO", health: 0.98 },
  { name: "Resourcesat-2A", desc: "Multispectral land resources (LISS-III, AWiFS)", products: ["NDVI", "Land-use change", "Crop classification"], pass: "T+02:14:22 · over Nagpur", health: 0.96 },
  { name: "Cartosat-3", desc: "Very high resolution (0.25m PAN) Earth observation", products: ["Urban infrastructure", "Damage assessment"], pass: "T+00:47:08 · over Mumbai", health: 0.99 },
  { name: "RISAT-2BR1", desc: "C-band SAR · all-weather, day/night imaging", products: ["Flood inundation", "Soil moisture"], pass: "T+01:33:51 · over Brahmaputra basin", health: 0.94 },
  { name: "EOS-08", desc: "Microsatellite · thermal & multispectral", products: ["Surface temperature", "Forest fire hotspots"], pass: "T+00:18:40 · over Uttarakhand", health: 0.97 },
  { name: "Oceansat-3", desc: "Ocean colour, scatterometer & SST", products: ["Wind vector", "Chlorophyll", "Cyclone genesis"], pass: "T+03:02:19 · over Bay of Bengal", health: 0.95 },
];

function SatellitePage() {
  return (
    <div>
      <PageHeader
        eyebrow="SATELLITE DATA CENTER · NRSC LINK"
        title="Earth-observation telemetry"
        description="Realtime status of ISRO assets feeding the digital twin. Imagery, rainfall estimates, cloud cover, land-use, surface temperature and vegetation indices."
        actions={<span className="panel px-2 py-1 text-xs font-mono inline-flex items-center gap-2"><Wifi className="h-3.5 w-3.5 text-isro-green" /> DOWNLINK · 412 Mb/s</span>}
      />

      <div className="grid grid-cols-12 gap-4 p-4 lg:p-6">
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Active assets" value="14" delta="all nominal" tone="up" />
          <Stat label="Daily acquisitions" value="2,148" unit="scenes" />
          <Stat label="Storage ingested" value="38.4" unit="TB / 24h" />
          <Stat label="AI inference latency" value="2.1" unit="s / scene" />
        </div>

        {SATS.map((s)=>(
          <Panel key={s.name} className="col-span-12 md:col-span-6 xl:col-span-4" eyebrow={`MISSION · HEALTH ${(s.health*100).toFixed(0)}%`} title={s.name}
            right={<span className="panel px-2 py-0.5 text-[10px] font-mono text-isro-cyan flex items-center gap-1"><Radio className="h-3 w-3" />LINK OK</span>}
          >
            <div className="flex gap-3">
              <div className="h-16 w-16 rounded-md border border-panel-border bg-gradient-to-br from-card to-background grid place-items-center shrink-0">
                <Satellite className="h-7 w-7 text-isro-cyan" />
              </div>
              <div className="text-sm text-muted-foreground leading-snug">{s.desc}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.products.map(p=>(
                <span key={p} className="px-2 py-0.5 rounded-sm border border-panel-border text-[11px] font-mono text-muted-foreground bg-card/40">{p}</span>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div className="text-muted-foreground">NEXT PASS<br /><span className="text-foreground">{s.pass}</span></div>
              <div className="text-muted-foreground">SIGNAL<br /><span className="text-isro-green">−92 dBm</span></div>
            </div>
            <div className="mt-3 h-10"><Sparkline points={Array.from({length:20},(_,i)=>60+Math.sin(i/2)*10+i*0.4)} color="var(--isro-cyan)" /></div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
