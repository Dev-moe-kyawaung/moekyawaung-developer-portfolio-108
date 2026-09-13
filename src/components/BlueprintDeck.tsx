import { useState } from "react";
import { projects } from "../data";
import SectionTitle from "./SectionTitle";

function Schematic({ seed, exploded }: { seed: number; exploded: boolean }) {
  const o = exploded ? 1 : 0;
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      <g
        stroke="rgba(147,197,253,0.85)"
        fill="none"
        strokeWidth="0.8"
        strokeLinecap="round"
      >
        {/* main housing */}
        <rect
          x="60"
          y="45"
          width="100"
          height="55"
          className="draw-line"
          style={{ transform: `translateY(${o * 0}px)`, transition: "transform .6s" }}
        />
        {/* top plate explodes up */}
        <rect
          x="72"
          y="30"
          width="76"
          height="14"
          className="draw-line"
          style={{ transform: `translateY(${-o * 16}px)`, transition: "transform .6s" }}
        />
        {/* bottom rail explodes down */}
        <rect
          x="72"
          y="101"
          width="76"
          height="10"
          className="draw-line"
          style={{ transform: `translateY(${o * 16}px)`, transition: "transform .6s" }}
        />
        {/* side pods */}
        <path
          d="M40 60 h16 v25 h-16 z"
          className="draw-line"
          style={{ transform: `translateX(${-o * 18}px)`, transition: "transform .6s" }}
        />
        <path
          d="M164 60 h16 v25 h-16 z"
          className="draw-line"
          style={{ transform: `translateX(${o * 18}px)`, transition: "transform .6s" }}
        />
        {/* internals */}
        <circle cx="110" cy="72" r="16" className="draw-line" />
        <circle cx="110" cy="72" r="8" className="draw-line" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2 + seed;
          return (
            <line
              key={i}
              x1={110 + Math.cos(a) * 8}
              y1={72 + Math.sin(a) * 8}
              x2={110 + Math.cos(a) * 16}
              y2={72 + Math.sin(a) * 16}
            />
          );
        })}
        <line x1="20" y1="72" x2="40" y2="72" strokeDasharray="3 3" />
        <line x1="180" y1="72" x2="204" y2="72" strokeDasharray="3 3" />
        <line x1="110" y1="14" x2="110" y2="30" strokeDasharray="3 3" />
      </g>
      <g
        className="animate-spin-slow"
        style={{ transformOrigin: "110px 72px" }}
        stroke="rgba(34,231,255,0.8)"
        fill="none"
        strokeWidth="0.7"
      >
        <circle cx="110" cy="72" r="24" strokeDasharray="4 8" />
      </g>
      <g fill="rgba(147,197,253,0.55)" fontSize="5" fontFamily="monospace">
        <text x="18" y="66">IN</text>
        <text x="196" y="66">OUT</text>
        <text x="100" y="12">CTRL</text>
        <text x="62" y="126">SCALE 1:{20 + seed * 3}</text>
      </g>
    </svg>
  );
}

export default function BlueprintDeck() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="blueprint" className="relative py-24">
      <div className="absolute inset-0 grid-blueprint opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#03060c] via-[#04101f]/70 to-[#03060c] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionTitle
          index="02"
          title="MECHA BLUEPRINT DECK"
          subtitle="Technical modules rendered as engineering schematics. Trigger EXPLODE to separate assemblies and read the internals."
          accent="blue"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.slice(0, 6).map((p, i) => {
            const exploded = open === p.id;
            return (
              <article
                key={p.id}
                style={{ transitionDelay: `${i * 70}ms` }}
                className="reveal relative border border-sky-400/25 bg-[#040c18]/85 backdrop-blur-sm p-5 hover:border-sky-300/60 transition-colors"
              >
                <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-sky-400/60 to-transparent" />
                <header className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] tracking-[0.28em] text-sky-300/70">
                      MODULE-{String(i + 1).padStart(3, "0")} / {p.tag}
                    </div>
                    <h3 className="mt-1 text-base font-bold text-sky-100">{p.name}</h3>
                  </div>
                  <button
                    onClick={() => setOpen(exploded ? null : p.id)}
                    className={`text-[9px] tracking-[0.22em] px-3 py-1.5 border transition-all ${
                      exploded
                        ? "border-amber-300/70 text-amber-200 bg-amber-400/10"
                        : "border-sky-400/40 text-sky-200 hover:bg-sky-400/10"
                    }`}
                  >
                    {exploded ? "COLLAPSE" : "EXPLODE ▚"}
                  </button>
                </header>

                <div className="mt-4 grid grid-cols-[1.1fr_1fr] gap-4 items-center">
                  <div className="relative h-40 border border-sky-400/15 bg-[#02070f]">
                    <Schematic seed={i} exploded={exploded} />
                  </div>
                  <div>
                    <p className="text-[11px] leading-relaxed text-sky-100/50 font-sans">{p.desc}</p>
                    <ul className="mt-3 space-y-1.5">
                      {p.modules.map((m, j) => (
                        <li
                          key={m}
                          className="flex items-center gap-2 text-[10px] tracking-wider text-sky-200/70 transition-all duration-500"
                          style={{
                            transform: exploded ? `translateX(${j * 6}px)` : "none",
                            opacity: exploded ? 1 : 0.6,
                          }}
                        >
                          <span className="h-px w-4 bg-sky-400/60" />
                          {m.toUpperCase()}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-[9px] tracking-[0.22em] text-sky-300 hover:text-white border-b border-sky-400/40"
                    >
                      OPEN SOURCE FILE ↗
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
