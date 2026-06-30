// Simplified India states polygon outline (for prototype visualization).
// Coordinates are rough polygons, sufficient to read as India shape.
export const INDIA_VIEWBOX = "0 0 800 880";

export const INDIA_OUTLINE_PATH =
  "M395,40 L430,55 L455,80 L470,110 L500,130 L540,135 L575,150 L600,180 L612,215 L625,245 L640,265 L660,255 L685,245 L705,255 L715,275 L705,300 L680,310 L660,325 L645,355 L640,385 L630,415 L612,440 L600,470 L600,510 L612,540 L620,575 L612,610 L598,640 L585,665 L555,690 L520,720 L490,755 L470,790 L455,820 L440,845 L415,855 L390,840 L370,810 L355,775 L345,735 L335,695 L320,665 L300,640 L275,610 L255,580 L240,545 L235,510 L240,475 L255,445 L275,420 L290,395 L295,365 L290,335 L275,305 L255,280 L235,260 L218,235 L208,205 L210,170 L225,140 L245,115 L268,90 L295,70 L325,55 L360,42 Z";

// Major Indian cities w/ approx mapped coordinates in our viewbox
export const INDIA_CITIES: Array<{ name: string; x: number; y: number; state: string }> = [
  { name: "New Delhi", x: 360, y: 215, state: "Delhi" },
  { name: "Mumbai", x: 290, y: 510, state: "Maharashtra" },
  { name: "Kolkata", x: 580, y: 380, state: "West Bengal" },
  { name: "Chennai", x: 410, y: 685, state: "Tamil Nadu" },
  { name: "Bengaluru", x: 370, y: 660, state: "Karnataka" },
  { name: "Hyderabad", x: 400, y: 565, state: "Telangana" },
  { name: "Ahmedabad", x: 280, y: 380, state: "Gujarat" },
  { name: "Pune", x: 320, y: 540, state: "Maharashtra" },
  { name: "Jaipur", x: 320, y: 270, state: "Rajasthan" },
  { name: "Lucknow", x: 440, y: 295, state: "Uttar Pradesh" },
  { name: "Patna", x: 525, y: 320, state: "Bihar" },
  { name: "Bhubaneswar", x: 540, y: 470, state: "Odisha" },
  { name: "Guwahati", x: 660, y: 290, state: "Assam" },
  { name: "Srinagar", x: 290, y: 110, state: "J&K" },
  { name: "Thiruvananthapuram", x: 340, y: 780, state: "Kerala" },
  { name: "Visakhapatnam", x: 490, y: 545, state: "Andhra Pradesh" },
  { name: "Bhopal", x: 380, y: 380, state: "Madhya Pradesh" },
  { name: "Chandigarh", x: 330, y: 175, state: "Punjab" },
  { name: "Raipur", x: 460, y: 430, state: "Chhattisgarh" },
  { name: "Dehradun", x: 370, y: 175, state: "Uttarakhand" },
];

export type RiskKind = "flood" | "cyclone" | "heatwave" | "landslide" | "drought" | "fire";

export const RISK_ZONES: Array<{
  id: string;
  kind: RiskKind;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  intensity: number; // 0..1
  label: string;
}> = [
  { id: "z1", kind: "cyclone", cx: 560, cy: 460, rx: 70, ry: 55, intensity: 0.86, label: "Bay of Bengal Cyclone Zone" },
  { id: "z2", kind: "flood", cx: 520, cy: 330, rx: 75, ry: 40, intensity: 0.78, label: "Ganga Basin Flood Belt" },
  { id: "z3", kind: "flood", cx: 660, cy: 300, rx: 55, ry: 40, intensity: 0.72, label: "Brahmaputra Flood Plains" },
  { id: "z4", kind: "heatwave", cx: 330, cy: 280, rx: 80, ry: 60, intensity: 0.81, label: "Northwest Heatwave Belt" },
  { id: "z5", kind: "drought", cx: 380, cy: 480, rx: 70, ry: 55, intensity: 0.66, label: "Marathwada Drought Zone" },
  { id: "z6", kind: "landslide", cx: 320, cy: 130, rx: 60, ry: 30, intensity: 0.74, label: "Himalayan Landslide Arc" },
  { id: "z7", kind: "landslide", cx: 340, cy: 720, rx: 30, ry: 45, intensity: 0.58, label: "Western Ghats Landslide" },
  { id: "z8", kind: "fire", cx: 380, cy: 200, rx: 45, ry: 25, intensity: 0.62, label: "Uttarakhand Forest Fire" },
  { id: "z9", kind: "cyclone", cx: 290, cy: 530, rx: 45, ry: 35, intensity: 0.55, label: "Arabian Sea Cyclone Watch" },
];

export const RISK_COLOR: Record<RiskKind, string> = {
  flood: "var(--isro-cyan)",
  cyclone: "oklch(0.72 0.18 295)",
  heatwave: "var(--risk-high)",
  landslide: "oklch(0.65 0.13 50)",
  drought: "var(--isro-saffron)",
  fire: "var(--risk-severe)",
};

export const RISK_LABEL: Record<RiskKind, string> = {
  flood: "Flood",
  cyclone: "Cyclone",
  heatwave: "Heatwave",
  landslide: "Landslide",
  drought: "Drought",
  fire: "Forest Fire",
};
