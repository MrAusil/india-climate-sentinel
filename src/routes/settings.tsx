import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Bharat Climate Twin" },
      { name: "description", content: "Platform configuration, data sources, model versions and account preferences." },
    ],
  }),
  component: Settings,
});

const SOURCES = [
  { name: "ISRO Bhuvan", detail: "Administrative boundaries, land cover", status: "Connected", lastSync: "14:20 IST" },
  { name: "MOSDAC", detail: "INSAT-3DR imagery, ocean state", status: "Connected", lastSync: "14:15 IST" },
  { name: "IMD Weather", detail: "Automatic Weather Station network", status: "Connected", lastSync: "14:30 IST" },
  { name: "CWC River Levels", detail: "Gauges across 12 river basins", status: "Connected", lastSync: "14:00 IST" },
  { name: "Copernicus ERA5", detail: "Reanalysis climate variables", status: "Connected", lastSync: "hourly" },
  { name: "NASA EarthData", detail: "MODIS, VIIRS thermal", status: "Connected", lastSync: "12:00 IST" },
  { name: "Sentinel-1/2", detail: "Radar and optical imagery", status: "Connected", lastSync: "daily" },
  { name: "WorldPop", detail: "Population exposure surfaces", status: "Connected", lastSync: "monthly" },
  { name: "OpenStreetMap", detail: "Basemaps and infrastructure", status: "Connected", lastSync: "weekly" },
  { name: "GADM", detail: "Administrative geometries", status: "Connected", lastSync: "static" },
];

const MODELS = [
  { name: "BharatFlood", version: "v3.2", metric: "F1 0.91", updated: "May 2026" },
  { name: "CycloneNet-IN", version: "v2.1", metric: "F1 0.87", updated: "Apr 2026" },
  { name: "HeatPredict-IMD", version: "v1.4", metric: "MAE 0.6 °C", updated: "Mar 2026" },
  { name: "DroughtFM", version: "v2.0", metric: "RMSE 0.21", updated: "Feb 2026" },
  { name: "SlopeRisk-Himalaya", version: "v1.2", metric: "AUC 0.88", updated: "Jan 2026" },
  { name: "FireIndex-EOS", version: "v1.0", metric: "F1 0.79", updated: "Dec 2025" },
];

function Settings() {
  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Platform configuration"
        description="Manage data sources, review model versions and adjust workspace preferences."
      />

      <div className="px-4 lg:px-8 py-6 space-y-8 max-w-5xl">
        <section>
          <h2 className="text-sm font-semibold mb-3">Connected data sources</h2>
          <div className="panel overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-mono text-muted-foreground border-b border-border bg-muted/40">
                  <th className="py-2.5 px-4 font-normal">Source</th>
                  <th className="font-normal">Provides</th>
                  <th className="font-normal">Status</th>
                  <th className="font-normal">Last sync</th>
                </tr>
              </thead>
              <tbody>
                {SOURCES.map((s) => (
                  <tr key={s.name} className="border-b border-border last:border-b-0">
                    <td className="py-3 px-4 font-medium">{s.name}</td>
                    <td className="text-muted-foreground">{s.detail}</td>
                    <td>
                      <span className="inline-flex items-center gap-1.5 text-xs text-isro-green">
                        <span className="h-1.5 w-1.5 rounded-full bg-isro-green" /> {s.status}
                      </span>
                    </td>
                    <td className="font-mono text-xs text-muted-foreground">{s.lastSync}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold mb-3">Deployed models</h2>
          <div className="panel overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-mono text-muted-foreground border-b border-border bg-muted/40">
                  <th className="py-2.5 px-4 font-normal">Model</th>
                  <th className="font-normal">Version</th>
                  <th className="font-normal">Validation metric</th>
                  <th className="font-normal">Last updated</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m) => (
                  <tr key={m.name} className="border-b border-border last:border-b-0">
                    <td className="py-3 px-4 font-medium">{m.name}</td>
                    <td className="font-mono text-xs">{m.version}</td>
                    <td className="text-muted-foreground">{m.metric}</td>
                    <td className="font-mono text-xs text-muted-foreground">{m.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold mb-3">Workspace</h2>
          <div className="panel p-5 grid sm:grid-cols-2 gap-4 text-sm">
            <Field label="Organisation" value="Nexus Freak · ISRO BAH 2026" />
            <Field label="Node" value="NRSC-HYD-04" />
            <Field label="Coordinate system" value="EPSG:4326 (WGS 84)" />
            <Field label="Units" value="Metric (SI)" />
            <Field label="Time zone" value="Asia/Kolkata (IST)" />
            <Field label="Build" value="2026.01" />
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">{label}</div>
      <div className="mt-0.5">{value}</div>
    </div>
  );
}
