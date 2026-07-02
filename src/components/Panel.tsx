import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Panel({
  title, eyebrow, right, className, children, padded = true,
}: {
  title?: string; eyebrow?: string; right?: ReactNode;
  className?: string; children: ReactNode; padded?: boolean;
}) {
  return (
    <section className={cn("panel relative", className)}>
      {(title || eyebrow || right) && (
        <header className="flex items-center gap-3 px-4 py-2.5 border-b border-panel-border">
          <div className="min-w-0">
            {eyebrow && (
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{eyebrow}</div>
            )}
            {title && <div className="text-sm font-semibold tracking-tight truncate">{title}</div>}
          </div>
          {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
        </header>
      )}
      <div className={cn(padded && "p-4")}>{children}</div>
    </section>
  );
}

export function Stat({
  label, value, unit, delta, tone = "neutral",
}: { label: string; value: string | number; unit?: string; delta?: string; tone?: "up" | "down" | "neutral" | "warn" }) {
  const toneCls =
    tone === "up" ? "text-isro-green" :
    tone === "down" ? "text-risk-severe" :
    tone === "warn" ? "text-isro-saffron" : "text-muted-foreground";
  return (
    <div className="panel p-3">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <div className="text-xl font-semibold tracking-tight">{value}</div>
        {unit && <div className="text-xs text-muted-foreground">{unit}</div>}
      </div>
      {delta && <div className={cn("mt-0.5 text-[11px] font-mono", toneCls)}>{delta}</div>}
    </div>
  );
}

export function RiskBadge({ level }: { level: "Green" | "Yellow" | "Orange" | "Red" }) {
  const map = {
    Green: "border-isro-green/50 text-isro-green bg-isro-green/10",
    Yellow: "border-risk-moderate/50 text-risk-moderate bg-risk-moderate/10",
    Orange: "border-risk-high/50 text-risk-high bg-risk-high/10",
    Red: "border-risk-severe/60 text-risk-severe bg-risk-severe/10",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono rounded-sm border", map[level])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level.toUpperCase()}
    </span>
  );
}

export function Bar({ value, color = "var(--isro-cyan)", label, right }: { value: number; color?: string; label?: string; right?: string }) {
  return (
    <div>
      {(label || right) && (
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-1">
          <span>{label}</span><span>{right}</span>
        </div>
      )}
      <div className="h-1.5 w-full rounded-sm bg-muted/60 overflow-hidden">
        <div className="h-full rounded-sm" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }} />
      </div>
    </div>
  );
}

export function Sparkline({ points, color = "var(--isro-cyan)", height = 36 }: { points: number[]; color?: string; height?: number }) {
  const max = Math.max(...points), min = Math.min(...points);
  const w = 120;
  const path = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = height - ((v - min) / Math.max(1e-9, max - min)) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full h-full">
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
      <path d={`${path} L${w},${height} L0,${height} Z`} fill={color} opacity="0.15" />
    </svg>
  );
}
