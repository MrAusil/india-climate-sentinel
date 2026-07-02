import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IndiaMap } from "@/components/IndiaMap";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/digital-twin")({
  head: () => ({
    meta: [
      { title: "Map — Bharat Climate Twin" },
      { name: "description", content: "Full-screen GIS view of India with administrative, satellite and terrain basemaps and hazard overlays." },
    ],
  }),
  component: MapPage,
});

const BASE = [
  { id: "admin", label: "Administrative" },
  { id: "satellite", label: "Satellite" },
  { id: "terrain", label: "Terrain" },
  { id: "osm", label: "Street" },
] as const;

const OVERLAYS = [
  { id: "flood", label: "Flood" },
  { id: "cyclone", label: "Cyclone" },
  { id: "heatwave", label: "Heatwave" },
  { id: "drought", label: "Drought" },
  { id: "landslide", label: "Landslide" },
  { id: "fire", label: "Forest fire" },
] as const;

function MapPage() {
  const [base, setBase] = useState<(typeof BASE)[number]["id"]>("admin");
  const [overlays, setOverlays] = useState<Set<string>>(new Set(["flood", "cyclone", "heatwave"]));

  const toggle = (id: string) =>
    setOverlays((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-56px-40px)]">
      <aside className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">Basemap</div>
          <div className="mt-2 space-y-1">
            {BASE.map((b) => (
              <button
                key={b.id}
                onClick={() => setBase(b.id)}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-sm rounded-sm",
                  base === b.id ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-b border-border">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">Hazard overlays</div>
          <div className="mt-2 space-y-1">
            {OVERLAYS.map((o) => {
              const on = overlays.has(o.id);
              return (
                <label key={o.id} className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(o.id)}
                    className="h-3.5 w-3.5 accent-primary"
                  />
                  <span>{o.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="p-4 text-[11px] font-mono text-muted-foreground leading-relaxed">
          <div>Projection: EPSG:4326</div>
          <div className="mt-1">Boundaries: GADM v4.1</div>
          <div>Imagery: Esri World Imagery, Maxar</div>
          <div>Overlays: IMD, CWC, ISRO Bhuvan</div>
        </div>
      </aside>

      <div className="relative flex-1 min-h-[60vh]">
        <IndiaMap baseLayer={base} activeLayers={Array.from(overlays) as any} />
      </div>
    </div>
  );
}
