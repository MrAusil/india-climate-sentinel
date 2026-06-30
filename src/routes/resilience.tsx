import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Panel, Bar, Stat } from "@/components/Panel";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/resilience")({
  head: () => ({
    meta: [
      { title: "District Resilience Index · Bharat Climate Twin" },
      { name: "description", content: "Climate resilience scores across districts of India, ranked on infrastructure, healthcare, water, agriculture, preparedness and recovery." },
    ],
  }),
  component: Resilience,
});

const DIMS = [
  ["Infrastructure", "var(--isro-cyan)"],
  ["Healthcare", "var(--isro-green)"],
  ["Water security", "oklch(0.72 0.18 220)"],
  ["Agriculture", "var(--isro-saffron)"],
  ["Preparedness", "oklch(0.72 0.18 295)"],
  ["Economic recovery", "var(--risk-high)"],
] as const;

const DISTRICTS = [
  { rank: 1, name: "Surat", state: "Gujarat", score: 84, dims: [88,82,86,80,84,84] },
  { rank: 2, name: "Coimbatore", state: "Tamil Nadu", score: 81, dims: [80,84,76,82,82,82] },
  { rank: 3, name: "Pune", state: "Maharashtra", score: 80, dims: [85,80,72,76,84,83] },
  { rank: 4, name: "Indore", state: "MP", score: 78, dims: [80,76,74,78,80,80] },
  { rank: 5, name: "Bengaluru Urban", state: "Karnataka", score: 77, dims: [82,80,68,72,78,82] },
  { rank: 84, name: "Mumbai Suburban", state: "Maharashtra", score: 64, dims: [76,72,52,40,72,72] },
  { rank: 142, name: "Kolkata", state: "West Bengal", score: 58, dims: [66,62,50,48,62,60] },
  { rank: 318, name: "Dibrugarh", state: "Assam", score: 46, dims: [52,48,40,46,44,46] },
  { rank: 502, name: "Beed", state: "Maharashtra", score: 38, dims: [42,36,28,34,42,46] },
  { rank: 698, name: "Pakur", state: "Jharkhand", score: 28, dims: [30,28,24,26,30,30] },
];

function Resilience() {
  return (
    <div>
      <PageHeader
        eyebrow="DISTRICT RESILIENCE INDEX · DRI v1.2"
        title="Climate resilience scoring across 766 districts"
        description="A composite 0–100 score combining six dimensions, updated weekly from satellite, socioeconomic and infrastructure datasets."
      />

      <div className="grid grid-cols-12 gap-4 p-4 lg:p-6">
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="National DRI · mean" value="62.4" unit="/100" delta="+1.1 YoY" tone="up" />
          <Stat label="Districts > 75" value="84" delta="High resilience" tone="up" />
          <Stat label="Districts < 40" value="129" delta="Vulnerable" tone="down" />
          <Stat label="Most improved" value="Tirupur" delta="+8 in 12 months" tone="up" />
        </div>

        <Panel className="col-span-12 lg:col-span-8" eyebrow="LEADERBOARD" title="District resilience ranking">
          <div className="overflow-x-auto -mx-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-mono text-muted-foreground border-b border-panel-border">
                  <th className="py-2 pl-4 font-normal">Rank</th>
                  <th className="font-normal">District</th>
                  <th className="font-normal">State</th>
                  <th className="font-normal w-[40%]">Composite</th>
                  <th className="font-normal text-right pr-4">DRI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-panel-border/60">
                {DISTRICTS.map((d)=>(
                  <tr key={d.name} className="hover:bg-accent/40">
                    <td className="py-2.5 pl-4 font-mono text-xs text-muted-foreground">#{d.rank}</td>
                    <td className="font-medium flex items-center gap-2">
                      {d.rank<=3 && <Trophy className="h-3.5 w-3.5 text-isro-saffron" />}
                      {d.name}
                    </td>
                    <td className="text-muted-foreground">{d.state}</td>
                    <td><Bar value={d.score} color={d.score>=70?"var(--isro-green)":d.score>=50?"var(--isro-saffron)":"var(--risk-severe)"} /></td>
                    <td className="text-right pr-4 font-mono">{d.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel className="col-span-12 lg:col-span-4" eyebrow="DIMENSION VIEW" title="Mumbai Suburban · 64 / 100">
          <div className="space-y-3">
            {DIMS.map(([d, c], i)=>{
              const v = DISTRICTS.find(x=>x.name==="Mumbai Suburban")!.dims[i];
              return <Bar key={d} label={d} right={`${v}/100`} value={v} color={c as string} />;
            })}
          </div>
          <div className="mt-5 panel p-3 text-sm">
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-isro-cyan mb-1">Copilot note</div>
            Mumbai Suburban shows strong infrastructure but persistent gaps in water security and agriculture under stress.
            Closing the water-security gap by 12 points would lift composite DRI to ≈ 70.
          </div>
        </Panel>
      </div>
    </div>
  );
}
