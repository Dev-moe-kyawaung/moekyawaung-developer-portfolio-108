import { useEffect, useRef, useState } from "react";
import { projects } from "../data";

type Mode = "BLUEPRINT" | "CIRCUIT" | "QUANTUM";
type Node = { id: string; x: number; y: number; label: string; kind: string };

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const LAYERS = [
  ["Client Shell", "PWA Shell", "UI Kernel", "Edge Client"],
  ["State Core", "Router Bus", "Cache Layer", "Sync Engine"],
  ["API Gateway", "Service Mesh", "Auth Guard", "Queue Broker"],
  ["Data Store", "IndexedDB", "Object Cache", "Ledger DB"],
];

function buildGraph(query: string): { nodes: Node[]; edges: [number, number][]; notes: string[] } {
  const h = hash(query || "system");
  const nodes: Node[] = [];
  const cols = 4;
  for (let c = 0; c < cols; c++) {
    const rows = 1 + ((h >> (c * 3)) % 2) + (c === 1 || c === 2 ? 1 : 0);
    for (let r = 0; r < rows; r++) {
      const label = LAYERS[c][(h >> (c * 2 + r)) % LAYERS[c].length];
      nodes.push({
        id: `${c}-${r}`,
        x: 60 + c * 150,
        y: 60 + r * 70 + (rows === 1 ? 70 : rows === 2 ? 35 : 0),
        label,
        kind: ["client", "state", "service", "data"][c],
      });
    }
  }
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    const col = Number(n.id.split("-")[0]);
    nodes.forEach((m, j) => {
      if (Number(m.id.split("-")[0]) === col + 1) edges.push([i, j]);
    });
  });
  const notes = [
    `entropy seed ${h % 99991}`,
    `${nodes.length} nodes / ${edges.length} links resolved`,
    `latency budget ${40 + (h % 60)}ms p95`,
    `failure domains isolated: ${2 + (h % 3)}`,
  ];
  return { nodes, edges, notes };
}

function Burst({ trigger }: { trigger: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!trigger) return;
    const cvs = ref.current!;
    const ctx = cvs.getContext("2d")!;
    const S = 180;
    cvs.width = S;
    cvs.height = S;
    const parts = Array.from({ length: 70 }, () => {
      const a = Math.random() * Math.PI * 2;
      const sp = 0.7 + Math.random() * 3.4;
      return {
        x: S / 2,
        y: S / 2,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        life: 1,
        h: 170 + Math.random() * 150,
      };
    });
    let raf = 0;
    const step = () => {
      ctx.clearRect(0, 0, S, S);
      let alive = false;
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.965;
        p.vy *= 0.965;
        p.life -= 0.016;
        if (p.life > 0) {
          alive = true;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.6 * p.life + 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.h},100%,68%,${p.life})`;
          ctx.fill();
        }
      }
      if (alive) raf = requestAnimationFrame(step);
    };
    step();
    return () => cancelAnimationFrame(raf);
  }, [trigger]);
  return <canvas ref={ref} className="pointer-events-none absolute -inset-[45px] h-[180px] w-[180px]" />;
}

const MODE_STYLE: Record<Mode, { stroke: string; fill: string; text: string }> = {
  BLUEPRINT: { stroke: "#7dd3fc", fill: "rgba(14,40,72,0.85)", text: "#bae6fd" },
  CIRCUIT: { stroke: "#ff8a3d", fill: "rgba(52,18,4,0.85)", text: "#fed7aa" },
  QUANTUM: { stroke: "#c084fc", fill: "rgba(34,12,58,0.85)", text: "#e9d5ff" },
};

export default function AIOrb({
  request,
  clearRequest,
}: {
  request: string | null;
  clearRequest: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("BLUEPRINT");
  const [query, setQuery] = useState("");
  const [graph, setGraph] = useState<ReturnType<typeof buildGraph> | null>(null);
  const [burst, setBurst] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [thinking, setThinking] = useState(false);
  const [drawKey, setDrawKey] = useState(0);

  const run = (q: string) => {
    setQuery(q);
    setThinking(true);
    setBurst((b) => b + 1);
    setLog([]);
    const steps = [
      `> parsing intent :: "${q}"`,
      "> sampling architecture space…",
      "> collapsing candidate topologies…",
      "> rendering map",
    ];
    steps.forEach((s, i) => setTimeout(() => setLog((l) => [...l, s]), i * 260));
    setTimeout(() => {
      setGraph(buildGraph(q));
      setDrawKey((k) => k + 1);
      setThinking(false);
      setBurst((b) => b + 1);
    }, steps.length * 260 + 200);
  };

  useEffect(() => {
    if (request) {
      setOpen(true);
      const p = projects.find((x) => x.id === request);
      run(p ? `${p.name} — ${p.stack.join(" / ")}` : request);
      clearRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  const st = MODE_STYLE[mode];

  return (
    <>
      {/* Orb */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="AI architect orb"
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full grid place-items-center group"
      >
        <Burst trigger={burst} />
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 via-fuchsia-500/30 to-orange-500/40 blur-md animate-heat" />
        <span className="absolute inset-0 rounded-full border border-cyan-300/70 animate-spin-slow" />
        <span className="absolute inset-2 rounded-full border border-dashed border-fuchsia-400/70 animate-spin-rev" />
        <span className="absolute inset-0 rounded-full border border-cyan-200/40 animate-[pulse-ring_2.8s_ease-out_infinite]" />
        <span className="relative h-6 w-6 rounded-full bg-gradient-to-br from-white via-cyan-200 to-fuchsia-400 shadow-[0_0_26px_rgba(34,231,255,0.9)] animate-flicker" />
        <span className="absolute -top-6 right-0 text-[8px] tracking-[0.2em] text-cyan-200/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI ARCHITECT
        </span>
      </button>

      {/* Panel */}
      <div
        className={`fixed z-50 bottom-24 right-4 left-4 sm:left-auto sm:w-[560px] origin-bottom-right transition-all duration-300 ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="border border-cyan-400/30 bg-[#03070e]/95 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between border-b border-cyan-400/20 px-4 py-2.5">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              MKA ARCHITECT AI
            </div>
            <div className="flex gap-1">
              {(Object.keys(MODE_STYLE) as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setDrawKey((k) => k + 1);
                    setBurst((b) => b + 1);
                  }}
                  className={`px-2 py-1 text-[8px] tracking-[0.18em] border transition-all ${
                    mode === m
                      ? "border-cyan-300/70 text-cyan-100 bg-cyan-400/15"
                      : "border-white/10 text-cyan-100/40 hover:text-cyan-200"
                  }`}
                >
                  {m}
                </button>
              ))}
              <button
                onClick={() => setOpen(false)}
                className="px-2 py-1 text-[10px] text-cyan-100/40 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Canvas map */}
          <div className="relative h-[240px] bg-[#020609] overflow-hidden">
            <div
              className={`absolute inset-0 ${
                mode === "BLUEPRINT" ? "grid-blueprint opacity-50" : "grid-matrix opacity-40"
              }`}
            />
            {!graph && (
              <div className="absolute inset-0 grid place-items-center text-center px-6">
                <p className="text-[10px] tracking-[0.22em] text-cyan-100/40 leading-relaxed">
                  ASK FOR AN ARCHITECTURE MAP.
                  <br />
                  I WILL SYNTHESIZE A {mode} DIAGRAM.
                </p>
              </div>
            )}
            {graph && (
              <svg key={drawKey} viewBox="0 0 620 240" className="absolute inset-0 h-full w-full">
                {graph.edges.map(([a, b], i) => {
                  const p = graph.nodes[a];
                  const q = graph.nodes[b];
                  return (
                    <path
                      key={i}
                      d={`M ${p.x + 46} ${p.y} C ${p.x + 100} ${p.y}, ${q.x - 100} ${q.y}, ${q.x - 46} ${q.y}`}
                      fill="none"
                      stroke={st.stroke}
                      strokeWidth={mode === "CIRCUIT" ? 1.4 : 0.9}
                      opacity="0.55"
                      className={mode === "QUANTUM" ? "flow-line" : "draw-line"}
                      style={{ animationDelay: `${i * 60}ms` }}
                    />
                  );
                })}
                {graph.nodes.map((n, i) => (
                  <g key={n.id} style={{ animation: `dash-draw .8s ease ${i * 70}ms both` }}>
                    {mode === "CIRCUIT" ? (
                      <rect
                        x={n.x - 46}
                        y={n.y - 15}
                        width="92"
                        height="30"
                        rx="15"
                        fill={st.fill}
                        stroke={st.stroke}
                        strokeWidth="1"
                      />
                    ) : (
                      <rect
                        x={n.x - 46}
                        y={n.y - 15}
                        width="92"
                        height="30"
                        fill={st.fill}
                        stroke={st.stroke}
                        strokeWidth="0.9"
                      />
                    )}
                    <circle cx={n.x - 46} cy={n.y} r="2.4" fill={st.stroke} />
                    <circle cx={n.x + 46} cy={n.y} r="2.4" fill={st.stroke} />
                    <text
                      x={n.x}
                      y={n.y + 3}
                      textAnchor="middle"
                      fontSize="8.5"
                      fontFamily="monospace"
                      fill={st.text}
                    >
                      {n.label}
                    </text>
                  </g>
                ))}
              </svg>
            )}
            {thinking && (
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-400 animate-pulse" />
            )}
          </div>

          {/* Log + notes */}
          <div className="max-h-[110px] overflow-y-auto px-4 py-2.5 text-[10px] leading-relaxed text-cyan-100/55 space-y-0.5 border-t border-cyan-400/10">
            {log.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
            {graph && !thinking && (
              <>
                <div className="text-cyan-300">
                  ✓ {mode} map synthesized for “{query}”
                </div>
                {graph.notes.map((n) => (
                  <div key={n} className="text-cyan-100/40">· {n}</div>
                ))}
              </>
            )}
          </div>

          <div className="border-t border-cyan-400/20 p-3">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {["Offline POS sync", "Realtime dashboard", "PWA app shell", "Video streaming"].map((s) => (
                <button
                  key={s}
                  onClick={() => run(s)}
                  className="text-[8px] tracking-[0.16em] px-2 py-1 border border-cyan-400/20 text-cyan-100/55 hover:border-cyan-300/60 hover:text-cyan-100 transition-colors"
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const v = (new FormData(e.currentTarget).get("q") as string)?.trim();
                if (v) run(v);
                e.currentTarget.reset();
              }}
              className="flex gap-2"
            >
              <input
                name="q"
                placeholder="describe a system to diagram…"
                className="flex-1 bg-[#060d16] border border-cyan-400/25 px-3 py-2 text-[11px] text-cyan-100 placeholder:text-cyan-100/25 outline-none focus:border-cyan-300/70"
              />
              <button className="px-4 py-2 text-[9px] tracking-[0.2em] bg-cyan-300 text-[#03060c] font-bold hover:bg-white transition-colors">
                MAP IT
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
