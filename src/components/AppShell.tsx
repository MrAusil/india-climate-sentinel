import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/digital-twin", label: "Map" },
  { to: "/predictions", label: "Predictions" },
  { to: "/warnings", label: "Alerts" },
  { to: "/reports", label: "Reports" },
  { to: "/settings", label: "Settings" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <main className="flex-1 min-w-0 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

function TopBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
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

  return (
    <header className="border-b border-border bg-card sticky top-0 z-30">
      <div className="flex items-center gap-6 px-4 lg:px-6 h-14">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <Emblem className="h-8 w-8" />
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-mono">Government of India</div>
            <div className="text-sm font-semibold tracking-tight">Bharat Climate Twin</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          {NAV.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "px-3 py-1.5 rounded-sm text-sm transition-colors",
                  active
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-isro-green" />
            Systems nominal
          </span>
          <span className="hidden md:inline text-[11px] font-mono text-muted-foreground border-l border-border pl-3">
            BAH-2026-PS-05
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

      {/* Mobile nav */}
      <nav className="md:hidden flex overflow-x-auto border-t border-border px-2 py-1 gap-1">
        {NAV.map((n) => {
          const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "px-3 py-1.5 rounded-sm text-xs whitespace-nowrap",
                active ? "bg-accent text-foreground" : "text-muted-foreground",
              )}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 lg:px-6 py-3 text-[11px] text-muted-foreground flex flex-wrap gap-x-6 gap-y-1">
      <span>© 2026 Bharat Climate Twin</span>
      <span>Data: ISRO Bhuvan · MOSDAC · IMD · CWC · Copernicus · NASA EarthData · OpenStreetMap</span>
      <span className="ml-auto font-mono">Prototype build 2026.01 · BAH ISRO Hackathon</span>
    </footer>
  );
}

export function Emblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="18" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="11" fill="none" stroke="var(--primary)" strokeWidth="0.8" opacity="0.5" />
      <path d="M4 20 H36 M20 4 V36" stroke="var(--primary)" strokeWidth="0.6" opacity="0.35" />
      <text x="20" y="24" textAnchor="middle" fill="var(--primary)" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700">BCT</text>
    </svg>
  );
}

export function PageHeader({
  eyebrow, title, description, actions,
}: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="border-b border-border bg-card">
      <div className="px-4 lg:px-8 py-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">{eyebrow}</div>}
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

// Backwards-compat export
export const Logo = Emblem;
