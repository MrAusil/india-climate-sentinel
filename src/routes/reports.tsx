import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Download, Printer, FileText } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Bharat Climate Twin" },
      { name: "description", content: "Print-ready district and state climate risk reports formatted for government use." },
    ],
  }),
  component: Reports,
});

const AVAILABLE = [
  { id: "drr-dibrugarh", title: "District Risk Report — Dibrugarh, Assam", type: "District", updated: "2 July 2026", pages: 24 },
  { id: "scr-odisha", title: "State Climate Report — Odisha", type: "State", updated: "28 June 2026", pages: 62 },
  { id: "dar-cyclone-tej", title: "Post-event Assessment — Cyclone Tej 2025", type: "Assessment", updated: "12 January 2026", pages: 48 },
  { id: "crr-tn", title: "Climate Resilience Report — Tamil Nadu", type: "Resilience", updated: "10 May 2026", pages: 88 },
];

function Reports() {
  return (
    <div>
      <PageHeader
        eyebrow="Reports"
        title="Print-ready climate reports"
        description="Government-formatted PDF reports composed from the platform's live data. Reports include maps, time-series charts, observations, recommended actions and data lineage."
        actions={
          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-sm bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" /> New report
          </button>
        }
      />

      <div className="px-4 lg:px-8 py-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="panel overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-mono text-muted-foreground border-b border-border bg-muted/40">
                <th className="py-2.5 px-4 font-normal">Title</th>
                <th className="font-normal">Type</th>
                <th className="font-normal">Updated</th>
                <th className="font-normal">Pages</th>
                <th className="font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {AVAILABLE.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-b-0 hover:bg-accent/40">
                  <td className="py-3 px-4 font-medium">{r.title}</td>
                  <td className="text-muted-foreground">{r.type}</td>
                  <td className="text-muted-foreground font-mono text-xs">{r.updated}</td>
                  <td className="text-muted-foreground font-mono text-xs">{r.pages}</td>
                  <td className="text-right pr-4">
                    <button className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
                      <Download className="h-3.5 w-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="panel">
          <div className="p-4 border-b border-border">
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">Standard sections</div>
            <ol className="mt-2 space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
              <li>Executive summary</li>
              <li>Region and demographic snapshot</li>
              <li>Hazard maps and time-series</li>
              <li>Forecast horizons (24h / 72h / 7d)</li>
              <li>Exposure and vulnerability analysis</li>
              <li>Recommended actions</li>
              <li>Data lineage and model cards</li>
            </ol>
          </div>
          <div className="p-4 flex gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-sm border border-border hover:bg-accent">
              <Printer className="h-3.5 w-3.5" /> Print preview
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-sm border border-border hover:bg-accent">
              <Download className="h-3.5 w-3.5" /> Bulk export
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
