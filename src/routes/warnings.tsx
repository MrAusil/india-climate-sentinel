import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/warnings")({
  head: () => ({
    meta: [
      { title: "Alerts — Bharat Climate Twin" },
      { name: "description", content: "National feed of active climate and disaster alerts across Indian districts." },
    ],
  }),
  component: Alerts,
});

type Severity = "Red" | "Orange" | "Yellow" | "Green";

const ALERTS: Array<{
  district: string; state: string; type: string; severity: Severity;
  time: string; action: string;
}> = [
  { district: "Dibrugarh", state: "Assam", type: "Riverine flood", severity: "Red", time: "T+06h", action: "Evacuate 16 villages" },
  { district: "Puri", state: "Odisha", type: "Cyclone landfall", severity: "Red", time: "T+14h", action: "Evacuate 10 km coastal belt" },
  { district: "South 24 Parganas", state: "West Bengal", type: "Cyclone watch", severity: "Orange", time: "T+72h", action: "Activate shelters" },
  { district: "Pauri Garhwal", state: "Uttarakhand", type: "Forest fire", severity: "Orange", time: "T+18h", action: "Deploy helibucket teams" },
  { district: "Bikaner", state: "Rajasthan", type: "Heatwave", severity: "Orange", time: "5 days", action: "Open cooling centres" },
  { district: "Wayanad", state: "Kerala", type: "Landslide watch", severity: "Yellow", time: "T+24h", action: "Restrict NH-766 traffic" },
  { district: "Beed", state: "Maharashtra", type: "Drought escalation", severity: "Yellow", time: "ongoing", action: "Increase tanker frequency" },
  { district: "Chennai", state: "Tamil Nadu", type: "Heat advisory", severity: "Green", time: "ongoing", action: "Early school dismissal" },
];

const FILTERS: Array<Severity | "All"> = ["All", "Red", "Orange", "Yellow", "Green"];

function Alerts() {
  const [f, setF] = useState<Severity | "All">("All");
  const rows = f === "All" ? ALERTS : ALERTS.filter((a) => a.severity === f);

  return (
    <div>
      <PageHeader
        eyebrow="Alerts"
        title="National alert feed"
        description="Follows IMD colour coding. Alerts are auto-issued when two of three ensemble models agree above 0.75 confidence, and reviewed by an on-duty officer before broadcast."
      />

      <div className="px-4 lg:px-8 py-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {FILTERS.map((s) => {
            const count = s === "All" ? ALERTS.length : ALERTS.filter((a) => a.severity === s).length;
            return (
              <button
                key={s}
                onClick={() => setF(s)}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-sm border transition-colors",
                  f === s ? "border-primary bg-accent" : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {s !== "All" && <SeverityDot s={s} />}
                {s} <span className="font-mono text-muted-foreground">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="panel overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-mono text-muted-foreground border-b border-border bg-muted/40">
                <th className="py-2.5 px-4 font-normal">District</th>
                <th className="font-normal">State</th>
                <th className="font-normal">Alert type</th>
                <th className="font-normal">Severity</th>
                <th className="font-normal">Expected</th>
                <th className="font-normal">Recommended action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.district + a.type} className="border-b border-border last:border-b-0 hover:bg-accent/40">
                  <td className="py-3 px-4 font-medium">{a.district}</td>
                  <td className="text-muted-foreground">{a.state}</td>
                  <td>{a.type}</td>
                  <td>
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <SeverityDot s={a.severity} /> {a.severity}
                    </span>
                  </td>
                  <td className="font-mono text-xs text-muted-foreground">{a.time}</td>
                  <td className="text-muted-foreground">{a.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[11px] font-mono text-muted-foreground">
          Sources: IMD · NDMA · CWC · State disaster management authorities · CAP v1.2 fanout
        </p>
      </div>
    </div>
  );
}

function SeverityDot({ s }: { s: Severity }) {
  const cls = s === "Red" ? "bg-risk-severe" : s === "Orange" ? "bg-risk-high" : s === "Yellow" ? "bg-risk-moderate" : "bg-risk-low";
  return <span className={cn("h-2 w-2 rounded-full", cls)} />;
}
