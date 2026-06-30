import { useMemo, useState } from "react";
import {
  INDIA_VIEWBOX,
  INDIA_OUTLINE_PATH,
  INDIA_CITIES,
  RISK_ZONES,
  RISK_COLOR,
  RISK_LABEL,
  type RiskKind,
} from "@/lib/india-geo";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  activeLayers?: RiskKind[];
  showCities?: boolean;
  showGrid?: boolean;
  interactive?: boolean;
  height?: number | string;
};

const ALL: RiskKind[] = ["flood", "cyclone", "heatwave", "landslide", "drought", "fire"];

export function IndiaMap({
  className,
  activeLayers = ALL,
  showCities = true,
  showGrid = true,
  interactive = true,
  height = "100%",
}: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const zones = useMemo(
    () => RISK_ZONES.filter((z) => activeLayers.includes(z.kind)),
    [activeLayers],
  );

  return (
    <div className={cn("relative h-full w-full", className)} style={{ height }}>
      <svg
        viewBox={INDIA_VIEWBOX}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="india-fill" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="oklch(0.32 0.05 235)" />
            <stop offset="60%" stopColor="oklch(0.24 0.04 245)" />
            <stop offset="100%" stopColor="oklch(0.18 0.035 250)" />
          </radialGradient>
          <pattern id="topo" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 7 Q3.5 3 7 7 T14 7" fill="none" stroke="oklch(0.55 0.06 220 / 0.18)" strokeWidth="0.6" />
          </pattern>
          <filter id="glow"><feGaussianBlur stdDeviation="3" /></filter>
          {ALL.map((k) => (
            <radialGradient key={k} id={`g-${k}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={RISK_COLOR[k]} stopOpacity="0.85" />
              <stop offset="60%" stopColor={RISK_COLOR[k]} stopOpacity="0.35" />
              <stop offset="100%" stopColor={RISK_COLOR[k]} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {showGrid && (
          <g opacity="0.5">
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="880" stroke="oklch(0.45 0.05 230 / 0.10)" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 48} x2="800" y2={i * 48} stroke="oklch(0.45 0.05 230 / 0.10)" />
            ))}
          </g>
        )}

        {/* India landmass */}
        <path d={INDIA_OUTLINE_PATH} fill="url(#india-fill)" stroke="oklch(0.75 0.10 220 / 0.6)" strokeWidth="1.2" />
        <path d={INDIA_OUTLINE_PATH} fill="url(#topo)" opacity="0.5" />

        {/* Coastline glow */}
        <path d={INDIA_OUTLINE_PATH} fill="none" stroke="oklch(0.78 0.14 200 / 0.35)" strokeWidth="3" filter="url(#glow)" />

        {/* Major river hint */}
        <path d="M285,180 Q380,230 460,250 Q540,280 605,330" fill="none" stroke="oklch(0.75 0.14 210 / 0.55)" strokeWidth="1.6" strokeDasharray="3 3" />
        <path d="M340,300 Q420,420 480,560 Q500,640 470,720" fill="none" stroke="oklch(0.75 0.14 210 / 0.35)" strokeWidth="1.2" strokeDasharray="2 4" />

        {/* Risk zones */}
        <g>
          {zones.map((z) => (
            <g
              key={z.id}
              onMouseEnter={() => interactive && setHover(z.id)}
              onMouseLeave={() => interactive && setHover(null)}
              style={{ cursor: interactive ? "pointer" : "default" }}
            >
              <ellipse cx={z.cx} cy={z.cy} rx={z.rx} ry={z.ry} fill={`url(#g-${z.kind})`} />
              <circle cx={z.cx} cy={z.cy} r={4} fill={RISK_COLOR[z.kind]} />
              <circle cx={z.cx} cy={z.cy} r={4} fill={RISK_COLOR[z.kind]} className="pulse-dot" />
            </g>
          ))}
        </g>

        {/* Cities */}
        {showCities && (
          <g>
            {INDIA_CITIES.map((c) => (
              <g key={c.name}>
                <circle cx={c.x} cy={c.y} r={2.5} fill="oklch(0.92 0.02 240)" />
                <circle cx={c.x} cy={c.y} r={5} fill="none" stroke="oklch(0.92 0.02 240 / 0.4)" />
                <text x={c.x + 8} y={c.y + 3} fontSize="10" fill="oklch(0.88 0.02 240)" className="font-mono">
                  {c.name}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Corner crosshairs */}
        {[[20,20],[780,20],[20,860],[780,860]].map(([x,y],i)=>(
          <g key={i} stroke="oklch(0.78 0.14 200 / 0.6)" strokeWidth="1">
            <line x1={x-10} y1={y} x2={x+10} y2={y} />
            <line x1={x} y1={y-10} x2={x} y2={y+10} />
          </g>
        ))}

        {/* Lat/Lon labels */}
        <g fill="oklch(0.65 0.04 230)" fontSize="10" className="font-mono">
          <text x="30" y="40">28°N 77°E</text>
          <text x="640" y="855">08°N 92°E</text>
        </g>
      </svg>

      {hover && (
        <div className="pointer-events-none absolute left-3 top-3 panel px-3 py-2 text-xs">
          {(() => {
            const z = RISK_ZONES.find((r) => r.id === hover)!;
            return (
              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {RISK_LABEL[z.kind]} · Zone {z.id.toUpperCase()}
                </div>
                <div className="text-sm font-medium">{z.label}</div>
                <div className="text-muted-foreground">Intensity {(z.intensity * 100).toFixed(0)}%</div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
