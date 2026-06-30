import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { Panel } from "@/components/Panel";
import { Send, Sparkles, FileText, ShieldAlert, ListChecks } from "lucide-react";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "Climate Copilot · Bharat Climate Twin" },
      { name: "description", content: "Climate Copilot — government-grade AI assistant for risk explanation, district reports and emergency response." },
    ],
  }),
  component: Copilot,
});

type Msg = { role: "user" | "assistant"; content: string };

const SEED: Msg[] = [
  { role: "assistant", content: "Namaste. I am Climate Copilot, the AI assistant of Bharat Climate Twin. I can explain risk surfaces, generate district reports, recommend mitigation strategies and brief response leadership. How may I assist?" },
  { role: "user", content: "Summarise the situation in Dibrugarh, Assam for the SDMA briefing." },
  { role: "assistant", content:
`**Dibrugarh · Situation as of 14:32 IST**

- Brahmaputra at Dibrugarh stage **0.42 m above danger mark**, rising.
- 72-hour rainfall **341 mm** (272% of normal); soil saturation 0.84.
- RISAT-2BR1 SAR confirms **318 km² inundation**, 41 villages affected.
- Population exposure **240,000**; vulnerable subgroups 38%.
- Probability of crest exceeding **+0.9 m** in 18 hours: **0.78**.

**Recommended actions** (priority order):
1. Evacuate 16 villages in red-zone (≈ 24k persons) — convoy from NH-37.
2. Pre-position 2 NDRF battalions & 6 PHC mobile units at Tinsukia staging.
3. Coordinate Subansiri reservoir release with CWC by 16:00.
4. Activate relief kitchens × 14; food-grain dispatch from Lahowal FCI.

Confidence on river forecast: **0.86** (ensemble of BharatFlood-v3.2 and HEC-RAS).` },
];

const SUGGESTIONS = [
  { icon: ListChecks, label: "Generate district report · Pune" },
  { icon: ShieldAlert, label: "Explain cyclone risk for Odisha coastline" },
  { icon: FileText, label: "Draft state climate report · Kerala" },
  { icon: Sparkles, label: "Mitigation strategy for Marathwada drought" },
];

function Copilot() {
  const [msgs, setMsgs] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");
  function send(text: string) {
    if (!text.trim()) return;
    setMsgs((m)=>[...m, { role: "user", content: text }, { role: "assistant", content:
`Working on **"${text}"**.

Aggregating signals from IMD, MOSDAC, CWC and the Digital Twin engine… 3 datasets matched, 2 model heads invoked (BharatClimate-FM v2.4, RegionalRisk-IN v1.1).

A full structured response will appear here in the operational build — this prototype renders the conversational UX only.` }]);
    setInput("");
  }
  return (
    <div>
      <PageHeader
        eyebrow="CLIMATE COPILOT · BHARATCLIMATE-FM v2.4"
        title="Government intelligence assistant"
        description="Trained on ISRO datasets, IMD bulletins, NDMA doctrine and 40 years of disaster archives. For decision support — not a substitute for human authority."
      />

      <div className="grid grid-cols-12 gap-4 p-4 lg:p-6">
        <Panel className="col-span-12 lg:col-span-3" eyebrow="QUICK ACTIONS" title="Common queries">
          <ul className="space-y-1.5">
            {SUGGESTIONS.map(s=>{
              const Icon = s.icon;
              return (
                <li key={s.label}>
                  <button onClick={()=>send(s.label)} className="w-full text-left text-sm px-3 py-2 rounded-sm panel hover:bg-accent flex items-center gap-2">
                    <Icon className="h-4 w-4 text-isro-cyan shrink-0" />
                    <span>{s.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 panel p-3 text-xs text-muted-foreground space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-isro-cyan">Capabilities</div>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Explain climate risks</li>
              <li>Generate district reports</li>
              <li>Suggest mitigation strategies</li>
              <li>Explain disaster predictions</li>
              <li>Recommend emergency responses</li>
            </ul>
          </div>
        </Panel>

        <Panel className="col-span-12 lg:col-span-9" eyebrow="SESSION · CONFIDENTIAL" title="Climate Copilot" right={<span className="text-[10px] font-mono text-isro-green flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-isro-green pulse-dot" />ONLINE</span>}>
          <div className="flex flex-col h-[60vh]">
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {msgs.map((m, i)=>(
                <div key={i} className={m.role==="user"?"flex justify-end":"flex"}>
                  <div className={`max-w-[80%] panel px-3.5 py-2.5 text-sm whitespace-pre-wrap ${m.role==="user"?"bg-primary/20 border-primary/40":""}`}>
                    <div className="text-[10px] uppercase tracking-[0.16em] font-mono mb-1 text-muted-foreground">
                      {m.role==="user"?"Operator":"Copilot · BharatClimate-FM"}
                    </div>
                    <div className="leading-relaxed">{m.content}</div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={(e)=>{e.preventDefault();send(input);}} className="mt-3 flex gap-2">
              <input value={input} onChange={(e)=>setInput(e.target.value)}
                placeholder="Ask about a district, hazard or response plan…"
                className="flex-1 bg-input/60 border border-panel-border rounded-sm px-3 py-2 text-sm font-mono" />
              <button className="inline-flex items-center gap-2 px-4 rounded-sm bg-primary text-primary-foreground text-sm">
                <Send className="h-4 w-4" /> Send
              </button>
            </form>
            <div className="mt-2 text-[10px] font-mono text-muted-foreground">All Copilot outputs are advisory. Operational decisions remain with designated authority.</div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
