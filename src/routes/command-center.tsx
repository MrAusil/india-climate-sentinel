import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Panel, Stat, RiskBadge, Sparkline, Bar } from "@/components/Panel";
import { IndiaMap } from "@/components/IndiaMap";

export const Route = createFileRoute("/command-center")({
  head: () => ({
    meta: [
      { title: "National Climate Command Center · Bharat Climate Twin" },
      { name: "description", content: "Wall-style operations dashboard — live India map, disaster feed, weather, alerts, satellite feed and AI insights." },
    ],
  }),
  component: Command,
});

function Command() {
  return (
    <div>
      <PageHeader
        eyebrow="NATIONAL CLIMATE COMMAND CENTER · NCCC"
        title="Wall-display operations"
        description="The single operational picture for ISRO, NDMA, IMD and state EOCs. Designed for 4K video-wall deployment."
        actions={
          <div className="panel px-3 py-1.5 text-xs font-mono flex items-center gap-3">
            <span className="text-muted-foreground">NATIONAL CLIMATE RISK STATUS</span>
            <span className="text-risk-high">ELEVATED · 68 / 100</span>
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-3 p-3 lg:p-4">
        <Panel className="col-span-12 xl:col-span-8 row-span-2" eyebrow="LIVE INDIA MAP" title="National risk surface" padded={false}>
          <div className="relative aspect-[12/10] bg-background/40 grid-bg">
            <IndiaMap />
            <div className="sweep-bar" />
          </div>
        </Panel>

        <Panel className="col-span-12 sm:col-span-6 xl:col-span-4" eyebrow="EMERGENCY ALERTS" title="Top severity">
          <ul className="text-sm space-y-2">
            {[
              ["Red", "Assam · Dibrugarh", "Riverine flood"],
              ["Red", "Odisha · Puri", "Cyclone landfall"],
              ["Orange", "WB · Sundarbans", "Cyclone watch"],
              ["Orange", "UK · Pauri", "Forest fire"],
            ].map(([l, where, what])=>(
              <li key={where} className="flex items-center gap-3 panel p-2.5">
                <RiskBadge level={l as any} />
                <div>
                  <div className="font-medium">{where}</div>
                  <div className="text-xs text-muted-foreground">{what}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="col-span-12 sm:col-span-6 xl:col-span-4" eyebrow="WEATHER FEED" title="National vitals · 14:32 IST">
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Max T" value="46.8" unit="°C" tone="warn" />
            <Stat label="Min T" value="14.2" unit="°C" />
            <Stat label="Rainfall 24h" value="38.4" unit="mm" tone="warn" />
            <Stat label="Wind peak" value="178" unit="km/h" tone="down" />
          </div>
          <div className="mt-3 h-12">
            <Sparkline points={[28,30,32,33,35,36,38,40,42,44,46,46,44,42]} color="var(--isro-saffron)" />
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-4" eyebrow="DISASTER FEED · 24h" title="Active events">
          <ul className="text-sm divide-y divide-panel-border/60">
            {[
              ["14:30","Brahmaputra crest +0.42m at Dibrugarh"],
              ["14:18","Cloud burst alert · Chamoli, UK"],
              ["14:02","EOS-08 detects 18 new fire pixels · Garhwal"],
              ["13:47","SAR pass confirms 320 km² inundation · Majuli"],
              ["13:30","SST anomaly +1.6°C · Bay of Bengal (NIO)"],
              ["13:12","Heat-stroke admissions +40% · Bikaner GH"],
            ].map(([t,m])=>(
              <li key={m} className="py-2 flex gap-3">
                <span className="font-mono text-xs text-isro-cyan w-12 shrink-0">{t}</span>
                <span className="text-muted-foreground">{m}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="col-span-12 sm:col-span-6 xl:col-span-4" eyebrow="SATELLITE FEED" title="Latest acquisitions">
          <ul className="text-sm space-y-2">
            {[
              ["RISAT-2BR1","Brahmaputra inundation map","T-04m"],
              ["EOS-08","Garhwal thermal mosaic","T-12m"],
              ["INSAT-3DR","Bay of Bengal cloud spiral","T-02m"],
              ["Cartosat-3","Puri coastal damage assessment","T-21m"],
            ].map(([n,d,t])=>(
              <li key={n} className="panel p-2.5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-sm bg-gradient-to-br from-isro-cyan/30 to-card border border-panel-border" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{n}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
                <div className="text-[11px] font-mono text-isro-cyan">{t}</div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="col-span-12 sm:col-span-6 xl:col-span-4" eyebrow="AI INSIGHTS · COPILOT" title="Strategic brief">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Two concurrent macro-events: Bay-of-Bengal cyclone genesis and northeast monsoon
            surplus over Brahmaputra. Combined population exposure 9.5M.
            Resource bottleneck likely on <span className="text-isro-saffron">aerial logistics in Assam</span>;
            pre-position 4 IAF C-130J sorties from Hindon.
          </p>
          <div className="mt-3 space-y-2.5">
            <Bar label="National confidence" right="0.84" value={84} color="var(--isro-cyan)" />
            <Bar label="Resource readiness" right="0.71" value={71} color="var(--isro-saffron)" />
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-4" eyebrow="RESPONSE RECOMMENDATIONS" title="Auto-prioritized">
          <ol className="text-sm space-y-2 list-decimal list-inside marker:text-isro-cyan marker:font-mono">
            <li>Trigger evacuation in 4 Brahmaputra blocks (red zone)</li>
            <li>Pre-deploy 8 NDRF teams to coastal Odisha</li>
            <li>Open cooling centres across 22 NW India districts</li>
            <li>Stage relief food packages at Hindon, Kolkata, Bhubaneswar</li>
            <li>Coordinate dam release · Bhakra & Subansiri</li>
          </ol>
        </Panel>
      </div>
    </div>
  );
}
