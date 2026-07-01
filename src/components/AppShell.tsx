import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity, Satellite, Map as MapIcon, AlertTriangle, Cpu, ShieldCheck,
  FlaskConical, Users, Radio, Sparkles, FileText, Network, Trophy, Moon, Sun,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";


const NAV = [
  { to: "/", label: "Home", icon: Activity, group: "Overview" },
  { to: "/command-center", label: "Command Center", icon: Radio, group: "Overview" },
  { to: "/digital-twin", label: "Digital Twin", icon: MapIcon, group: "Intelligence" },
  { to: "/predictions", label: "AI Predictions", icon: Cpu, group: "Intelligence" },
  { to: "/resilience", label: "Resilience Index", icon: ShieldCheck, group: "Intelligence" },
  { to: "/simulation", label: "Simulation Lab", icon: FlaskConical, group: "Operations" },
  { to: "/warnings", label: "Early Warnings", icon: AlertTriangle, group: "Operations" },
  { to: "/satellite", label: "Satellite Data", icon: Satellite, group: "Operations" },
  { to: "/citizen-impact", label: "Citizen Impact", icon: Users, group: "Operations" },
  { to: "/copilot", label: "Climate Copilot", icon: Sparkles, group: "Tools" },
  { to: "/reports", label: "Reports", icon: FileText, group: "Tools" },
  { to: "/technology", label: "Architecture", icon: Network, group: "Tools" },
  { to: "/hackathon", label: "Hackathon", icon: Trophy, group: "Tools" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const groups = Array.from(new Set(NAV.map((n) => n.group)));

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar sticky top-0 h-screen">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">Govt. of India · ISRO</div>
              <div className="text-sm font-semibold tracking-tight">Bharat Climate Twin</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">National Climate Intelligence Platform</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {groups.map((g) => (
            <div key={g}>
              <div className="px-2 mb-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">{g}</div>
              <ul className="space-y-0.5">
                {NAV.filter((n) => n.group === g).map((n) => {
                  const active = pathname === n.to;
                  const Icon = n.icon;
                  return (
                    <li key={n.to}>
                      <Link
                        to={n.to}
                        className={cn(
                          "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition",
                          active
                            ? "bg-accent text-foreground border border-panel-border"
                            : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{n.label}</span>
                        {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-isro-cyan" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-border text-[10px] font-mono text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-isro-green pulse-dot" /> SYS-LINK · ONLINE</div>
          <div>Node · NRSC-HYD-04</div>
          <div>Team Nexus Freak · A. Upadhyay</div>
          <div>Build 2026.01</div>
        </div>
      </aside>


      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 min-w-0">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

function TopBar() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("bct-theme");
    const initial = saved ? saved === "dark" : false;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("bct-theme", next ? "dark" : "light"); } catch {}
  };
  const time = new Date().toUTCString().replace("GMT", "IST");
  return (
    <div className="border-b border-border bg-card sticky top-0 z-30">
      <div className="flex items-center gap-4 px-4 lg:px-6 h-11 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-isro-green">
          <span className="h-1.5 w-1.5 rounded-full bg-isro-green pulse-dot" /> LIVE
        </div>
        <span className="text-muted-foreground">{time}</span>
        <span className="text-muted-foreground hidden md:inline">· INSAT-3DR · Nominal</span>
        <span className="text-muted-foreground hidden lg:inline">· EOS-08 · Nominal</span>
        <span className="text-muted-foreground hidden lg:inline">· RISAT-2BR1 · Nominal</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden md:inline px-2 py-0.5 rounded-sm border border-border text-muted-foreground">
            BAH ISRO Hackathon 2026 · PS-05
          </span>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-1.5 rounded-sm border border-border hover:bg-accent"
          >
            {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <Ticker />
    </div>
  );
}


function Ticker() {
  const items = [
    "ORANGE ALERT · West Bengal · Cyclone formation probability 72% (72h)",
    "RED ALERT · Assam · Brahmaputra exceeding danger mark at Dibrugarh +0.42m",
    "YELLOW ALERT · Maharashtra · Marathwada drought index rising (SPI -1.4)",
    "ADVISORY · Uttarakhand · Forest fire risk elevated in Pauri Garhwal",
    "INSAT-3DR · imagery refresh 14:30 IST",
    "EOS-08 pass · Kerala coastline acquisition complete",
    "AI MODEL · BharatFlood-v3.2 deployed across 18 basins",
  ];
  const line = items.join("   ◇   ");
  return (
    <div className="overflow-hidden border-t border-border bg-card/40">
      <div className="flex whitespace-nowrap ticker-track py-1 text-[11px] font-mono text-muted-foreground">
        <span className="px-6">{line}</span>
        <span className="px-6">{line}</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-sidebar/60 px-6 py-4 text-[11px] font-mono text-muted-foreground flex flex-wrap gap-x-6 gap-y-1">
      <span>© 2026 Bharat Climate Twin · ISRO / NDMA / IMD Joint Initiative</span>
      <span>Data: NRSC · MOSDAC · IMD · CWC · ESSO</span>
      <span className="ml-auto">Prototype build · Not for operational use</span>
    </footer>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--isro-saffron)" />
          <stop offset="100%" stopColor="var(--isro-green)" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="none" stroke="url(#lg)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="var(--isro-cyan)" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M14 12 L14 28 M14 12 L26 28 M26 12 L26 28" stroke="var(--foreground)" strokeWidth="2" fill="none" />
      <circle cx="32" cy="10" r="2" fill="var(--isro-saffron)" />
    </svg>
  );
}

export function PageHeader({
  eyebrow, title, description, actions,
}: { eyebrow: string; title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="border-b border-border bg-card/30">
      <div className="px-4 lg:px-8 py-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-isro-cyan font-mono">{eyebrow}</div>
          <h1 className="mt-1 text-2xl lg:text-3xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
