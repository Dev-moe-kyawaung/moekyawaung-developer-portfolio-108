export const profile = {
  name: "Moe Kyaw Aung",
  handle: "@moekyawaung-tech",
  role: "Senior Full-Stack / PWA Engineer",
  avatar:
    "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
  gravatar: "https://gravatar.com/moekyawaung2026",
  github: "https://github.com/Dev-moe-kyawaung/",
  phones: ["+95 9 889 000 889", "+959 666 000 050"],
  summary:
    "I build production-grade web apps, PWAs and POS systems — 43+ deployed GitHub Pages domains, 30+ shipped Lovable apps and a long catalogue of open-source products. Systems thinking, offline-first architecture and obsessive performance tuning.",
};

export type Project = {
  id: string;
  name: string;
  icon: string;
  tag: string;
  repo: string;
  desc: string;
  stack: string[];
  metrics: { label: string; value: number }[];
  modules: string[];
};

export const projects: Project[] = [
  {
    id: "pos-ultimate",
    name: "POS Ultimate Pro Max",
    icon: "🧾",
    tag: "COMMERCE CORE",
    repo: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    desc: "Offline-first point-of-sale with multi-terminal sync, receipt engine, stock ledger and role-based access.",
    stack: ["React", "IndexedDB", "Service Worker", "Chart.js"],
    metrics: [
      { label: "Throughput", value: 94 },
      { label: "Offline", value: 100 },
      { label: "Lighthouse", value: 97 },
    ],
    modules: ["Sync Bus", "Ledger", "Receipt Engine", "Auth Matrix"],
  },
  {
    id: "social-dashboard",
    name: "Social Dashboard",
    icon: "📱",
    tag: "ANALYTICS NODE",
    repo: "https://github.com/moekyawaung-tech/social-dashboard",
    desc: "Realtime multi-network analytics surface with streaming charts, cohort filters and dark telemetry UI.",
    stack: ["React", "WebSocket", "D3", "Tailwind"],
    metrics: [
      { label: "Stream Rate", value: 88 },
      { label: "Render", value: 92 },
      { label: "Coverage", value: 81 },
    ],
    modules: ["Stream Pipe", "Aggregator", "Chart Grid", "Cohorts"],
  },
  {
    id: "video-player",
    name: "Video Player",
    icon: "🎯",
    tag: "MEDIA REACTOR",
    repo: "https://github.com/moekyawaung-tech/video-player",
    desc: "Custom HTML5 player: adaptive buffering, gesture scrub, PiP, subtitle engine and keyboard command deck.",
    stack: ["TypeScript", "MediaSource", "Canvas"],
    metrics: [
      { label: "Buffer Eff.", value: 91 },
      { label: "Input Lag", value: 96 },
      { label: "A11y", value: 89 },
    ],
    modules: ["Decoder", "Buffer Ctrl", "Gesture Layer", "Subtitles"],
  },
  {
    id: "game-collection",
    name: "Game Collection",
    icon: "🎮",
    tag: "SIMULATION ARRAY",
    repo: "https://github.com/moekyawaung-tech/game-collection",
    desc: "A hub of canvas mini-games with shared physics loop, score persistence and gamepad support.",
    stack: ["Canvas", "RAF Loop", "LocalStorage"],
    metrics: [
      { label: "FPS Stability", value: 95 },
      { label: "Bundle", value: 87 },
      { label: "Replay", value: 78 },
    ],
    modules: ["Physics", "Renderer", "Score Vault", "Input"],
  },
  {
    id: "pwa-app",
    name: "PWA App Shell",
    icon: "⚡",
    tag: "EDGE SHELL",
    repo: "https://github.com/moekyawaung-tech/pwa-app",
    desc: "Installable app shell: precache manifest, background sync, push channel and update choreography.",
    stack: ["Workbox", "Vite", "Push API"],
    metrics: [
      { label: "TTI", value: 98 },
      { label: "Cache Hit", value: 93 },
      { label: "Install", value: 100 },
    ],
    modules: ["Shell", "Precache", "Sync Queue", "Push"],
  },
  {
    id: "job-portal",
    name: "Job Portal App",
    icon: "💼",
    tag: "GRAPH SERVICE",
    repo: "https://github.com/moekyawaung-tech/Job-Portal-App",
    desc: "Two-sided marketplace: employer consoles, applicant tracking pipeline and relevance-ranked search.",
    stack: ["React", "REST", "Search Index"],
    metrics: [
      { label: "Query Speed", value: 90 },
      { label: "Match Score", value: 84 },
      { label: "Scale", value: 88 },
    ],
    modules: ["Index", "ATS Pipeline", "Employer", "Ranking"],
  },
  {
    id: "thailand-travel",
    name: "Thailand Travel",
    icon: "🌏",
    tag: "CONTENT LATTICE",
    repo: "https://github.com/moekyawaung-tech/thailand-travel",
    desc: "Immersive travel guide with map routing, lazy media galleries and itinerary builder.",
    stack: ["React", "Leaflet", "Image CDN"],
    metrics: [
      { label: "LCP", value: 93 },
      { label: "SEO", value: 96 },
      { label: "Media", value: 90 },
    ],
    modules: ["Map", "Gallery", "Itinerary", "CDN"],
  },
  {
    id: "weather-app",
    name: "Weather App",
    icon: "🌤️",
    tag: "SENSOR MESH",
    repo: "https://github.com/moekyawaung-tech/Weather-app",
    desc: "Geolocated forecasting client with animated conditions, hourly strips and resilient offline cache.",
    stack: ["API", "Geolocation", "CSS Anim"],
    metrics: [
      { label: "Freshness", value: 92 },
      { label: "Offline", value: 85 },
      { label: "Size", value: 97 },
    ],
    modules: ["Fetcher", "Cache", "Animator", "Geo"],
  },
];

export const appCollection = [
  "📱 Social Dashboard",
  "📱 PWA App",
  "📊 Admin Dashboard",
  "📈 Stock Market",
  "🎮 Game Collection",
  "🎵 Music Player",
  "💬 Chat App",
  "⚽ World Cup",
  "🛒 E-commerce",
  "💼 Portfolio",
  "💰 Money Tracker",
  "🌤️ Weather",
  "💸 Crypto",
  "📝 Todo",
  "🎯 Video Player",
  "🏆 LEGEND!",
];

export const domains = [
  "moekyawaung-tech.github.io",
  "moekyawaung-developer.github.io",
  "moekyawaung-cyber.github.io",
  "moekyawaung-senior.github.io",
  "moekyawaung-linux.github.io",
  "moekyawaung-google.github.io",
  "moekyawaung-microsoft.github.io",
  "moekyawaung-bangkok.github.io",
  "moekyawaung-china.github.io",
  "moekyawaung-designer.github.io",
  "moekyawaung-web.github.io",
  "moe-kyawaung.github.io",
];

export const lovableApps = [
  "moekyawaung.lovable.app",
  "happy-cv-creator.lovable.app",
  "dev-moekyawaung.lovable.app",
  "the-cv-palette.lovable.app",
  "cv-beacon.lovable.app",
  "profile-persuasion-hub.lovable.app",
  "moekyaw-url.lovable.app",
  "joy-codify-life.lovable.app",
];

export const gallery = [
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795675037_heh9xk.png",
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778794626112_ega7kk.png",
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795859/copilot_image_1778794430377_n7xlmz.png",
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795847/copilot_image_1778795115579_acfm5j.png",
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795853/copilot_image_1778794781671_kytvkc.png",
  "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp",
];

export const skills = [
  { name: "React / TypeScript", level: 96 },
  { name: "PWA & Offline Systems", level: 93 },
  { name: "UI Architecture", level: 91 },
  { name: "Canvas / Animation", level: 88 },
  { name: "API & Data Layers", level: 86 },
  { name: "Performance Tuning", level: 90 },
];
