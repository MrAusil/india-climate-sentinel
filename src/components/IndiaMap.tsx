import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { RISK_ZONES, RISK_COLOR, RISK_LABEL, type RiskKind } from "@/lib/india-geo";

type Props = {
  className?: string;
  activeLayers?: RiskKind[];
  showCities?: boolean;
  interactive?: boolean;
  height?: number | string;
  baseLayer?: "osm" | "satellite" | "terrain" | "admin";
  onDistrictSelect?: (name: string) => void;
};

const ALL: RiskKind[] = ["flood", "cyclone", "heatwave", "landslide", "drought", "fire"];

// Approx lat/lon for risk zones (mapped from earlier viewbox coords)
const ZONE_LATLNG: Record<string, [number, number]> = {
  z1: [19.5, 87.0], // Bay of Bengal cyclone
  z2: [25.8, 84.5], // Ganga
  z3: [26.5, 92.5], // Brahmaputra
  z4: [27.0, 74.5], // NW heatwave
  z5: [19.0, 76.5], // Marathwada
  z6: [32.5, 77.5], // Himalayan landslide
  z7: [11.5, 76.5], // W. Ghats
  z8: [30.0, 79.0], // Uttarakhand fire
  z9: [17.5, 71.5], // Arabian Sea
};

const CITIES: Array<{ name: string; lat: number; lon: number }> = [
  { name: "New Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", lat: 19.076, lon: 72.877 },
  { name: "Kolkata", lat: 22.572, lon: 88.363 },
  { name: "Chennai", lat: 13.083, lon: 80.27 },
  { name: "Bengaluru", lat: 12.972, lon: 77.594 },
  { name: "Hyderabad", lat: 17.385, lon: 78.487 },
  { name: "Ahmedabad", lat: 23.023, lon: 72.572 },
  { name: "Lucknow", lat: 26.847, lon: 80.947 },
  { name: "Bhopal", lat: 23.259, lon: 77.413 },
  { name: "Guwahati", lat: 26.144, lon: 91.736 },
  { name: "Bhubaneswar", lat: 20.296, lon: 85.824 },
  { name: "Thiruvananthapuram", lat: 8.524, lon: 76.936 },
  { name: "Srinagar", lat: 34.084, lon: 74.797 },
  { name: "Jaipur", lat: 26.912, lon: 75.787 },
];

const TILES: Record<NonNullable<Props["baseLayer"]>, { url: string; attr: string }> = {
  osm: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attr: "© OpenStreetMap contributors",
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attr: "Esri · Maxar · Earthstar Geographics",
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attr: "© OpenTopoMap (CC-BY-SA)",
  },
  admin: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attr: "© OpenStreetMap · © CARTO",
  },
};

const INDIA_STATES_URL =
  "https://raw.githubusercontent.com/udit-001/india-maps-data/main/geojson/india.geojson";

export function IndiaMap({
  className,
  activeLayers = ALL,
  showCities = true,
  interactive = true,
  height = "100%",
  baseLayer = "admin",
  onDistrictSelect,
}: Props) {
  const [ready, setReady] = useState(false);
  const [RL, setRL] = useState<any>(null);
  const [L, setL] = useState<any>(null);
  const [geo, setGeo] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([rl, l]) => {
      if (!mounted) return;
      setRL(rl);
      setL(l.default ?? l);
      setReady(true);
    });
    fetch(INDIA_STATES_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => mounted && setGeo(j))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const zones = useMemo(
    () => RISK_ZONES.filter((z) => activeLayers.includes(z.kind)),
    [activeLayers],
  );

  if (!ready || !RL || !L) {
    return (
      <div
        className={cn("h-full w-full flex items-center justify-center bg-muted/40", className)}
        style={{ height }}
      >
        <div className="text-xs font-mono text-muted-foreground">Initialising GIS engine…</div>
      </div>
    );
  }

  const { MapContainer, TileLayer, CircleMarker, Tooltip, GeoJSON, ZoomControl, ScaleControl } = RL;
  const tile = TILES[baseLayer];

  return (
    <div className={cn("relative h-full w-full", className)} style={{ height }}>
      <MapContainer
        center={[22.5, 80.5]}
        zoom={5}
        minZoom={4}
        maxZoom={12}
        zoomControl={false}
        scrollWheelZoom={interactive}
        dragging={interactive}
        doubleClickZoom={interactive}
        style={{ height: "100%", width: "100%", background: "var(--background)" }}
      >
        <TileLayer url={tile.url} attribution={tile.attr} />

        {geo && (
          <GeoJSON
            data={geo}
            style={() => ({
              color: "#1e3a8a",
              weight: 0.8,
              fillColor: baseLayer === "satellite" ? "#000" : "#1e40af",
              fillOpacity: baseLayer === "satellite" ? 0 : 0.04,
            })}
            onEachFeature={(feature: any, layer: any) => {
              const name =
                feature?.properties?.st_nm ||
                feature?.properties?.NAME_1 ||
                feature?.properties?.name ||
                "State";
              layer.bindTooltip(name, { sticky: true, direction: "top" });
              layer.on({
                mouseover: (e: any) =>
                  e.target.setStyle({ weight: 1.6, fillOpacity: 0.15, color: "#0369a1" }),
                mouseout: (e: any) =>
                  e.target.setStyle({
                    weight: 0.8,
                    fillOpacity: baseLayer === "satellite" ? 0 : 0.04,
                    color: "#1e3a8a",
                  }),
                click: () => onDistrictSelect?.(name),
              });
            }}
          />
        )}

        {zones.map((z) => {
          const ll = ZONE_LATLNG[z.id];
          if (!ll) return null;
          return (
            <CircleMarker
              key={z.id}
              center={ll}
              radius={12 + z.intensity * 14}
              pathOptions={{
                color: RISK_COLOR[z.kind],
                fillColor: RISK_COLOR[z.kind],
                fillOpacity: 0.25,
                weight: 1.5,
              }}
            >
              <Tooltip direction="top">
                <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">
                  {RISK_LABEL[z.kind]}
                </div>
                <div className="text-xs font-medium">{z.label}</div>
                <div className="text-[11px] opacity-70">
                  Intensity {(z.intensity * 100).toFixed(0)}%
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}

        {showCities &&
          CITIES.map((c) => (
            <CircleMarker
              key={c.name}
              center={[c.lat, c.lon]}
              radius={2.5}
              pathOptions={{ color: "#0f172a", fillColor: "#ffffff", fillOpacity: 1, weight: 1 }}
            >
              <Tooltip direction="right" offset={[6, 0]} permanent opacity={0.85}>
                <span className="text-[10px] font-mono">{c.name}</span>
              </Tooltip>
            </CircleMarker>
          ))}

        <ZoomControl position="topleft" />
        <ScaleControl position="bottomleft" imperial={false} />
      </MapContainer>
    </div>
  );
}
