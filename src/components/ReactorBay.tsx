import { useEffect, useRef, useState } from "react";
import { projects, skills } from "../data";
import SectionTitle from "./SectionTitle";

function Gauge({ value, label, delay }: { value: number; label: string; delay: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setTimeout(() => setV(value), delay);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, delay]);

  const c = 2 * Math.PI * 26;
  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-[70px] w-[70px]">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="url(#plasma)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (c * v) / 100}
            style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.2,.8,.2,1)" }}
          />
          <defs>
            <linearGradient id="plasma" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd27a" />
              <stop offset="60%" stopColor="#ff5a1f" />
              <stop offset="100%" stopColor="#ff2d95" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[11px] font-bold text-orange-200 tabular-nums">
          {v}%
        </span>
      </div>
      <span className="mt-1.5 text-[8px] tracking-[0.18em] text-orange-100/50">
        {label.toUpperCase()}
      </span>
    </div>
  );
}

export default function ReactorBay() {
  return (
    <section id="reactor" className="relative py-24">
      <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange-500/10 animate-heat pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionTitle
          index="03"
          title="PLASMA REACTOR BAY"
          subtitle="Live modules under load. Rings spin with throughput, gauges report real performance envelopes."
          accent="orange"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.35fr] items-start">
          {/* Core */}
          <div className="reveal relative aspect-square max-w-[420px] mx-auto w-full border border-orange-400/20 bg-[#0a0603]/70 grid place-items-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,31,0.25),transparent_65%)] animate-heat" />
            <div className="absolute h-[62%] w-[62%] rounded-full border border-orange-300/40 animate-spin-slow" />
            <div className="absolute h-[46%] w-[46%] rounded-full border-2 border-dashed border-amber-300/40 animate-spin-rev" />
            <div className="absolute h-[78%] w-[78%] rounded-full border border-pink-400/25 animate-spin-rev" />
            <div className="absolute h-[26%] w-[26%] rounded-full bg-gradient-to-br from-amber-200 via-orange-500 to-pink-600 blur-[2px] animate-flicker shadow-[0_0_90px_rgba(255,90,31,0.8)]" />
            <span className="absolute h-[30%] w-[30%] rounded-full border border-amber-200/60 animate-[pulse-ring_2.6s_ease-out_infinite]" />
            <span className="absolute h-[30%] w-[30%] rounded-full border border-pink-300/50 animate-[pulse-ring_2.6s_ease-out_infinite_1.3s]" />
            <div className="absolute bottom-3 left-3 text-[9px] tracking-[0.22em] text-orange-200/70">
              CORE OUTPUT · 1.21 GW
            </div>
            <div className="absolute top-3 right-3 text-[9px] tracking-[0.22em] text-orange-200/70 animate-pulse">
              ● STABLE
            </div>
          </div>

          {/* Skill conduits */}
          <div className="reveal space-y-4">
            {skills.map((s, i) => (
              <div key={s.name}>
                <div className="flex justify-between text-[10px] tracking-[0.2em] text-orange-100/70">
                  <span>{s.name.toUpperCase()}</span>
                  <span className="tabular-nums text-orange-300">{s.level}%</span>
                </div>
                <div className="mt-1.5 h-2 bg-white/5 border border-orange-400/15 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-200 via-orange-500 to-pink-500 shadow-[0_0_16px_rgba(255,90,31,0.7)]"
                    style={{
                      width: `${s.level}%`,
                      transition: `width 1.4s cubic-bezier(.2,.8,.2,1) ${i * 120}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-2 grid grid-cols-2 gap-3">
              {["UPTIME 99.98%", "BUILD Δ 1.4s", "ZERO-DOWNTIME DEPLOYS", "OFFLINE-FIRST BY DEFAULT"].map(
                (x) => (
                  <div
                    key={x}
                    className="border border-orange-400/20 bg-orange-500/5 px-3 py-2 text-[9px] tracking-[0.18em] text-orange-100/60"
                  >
                    {x}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Reactor modules */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.slice(2, 6).map((p, i) => (
            <div
              key={p.id}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="reveal group relative border border-orange-400/25 bg-[#0a0604]/80 p-5 hover:border-orange-300/70 hover:shadow-[0_0_40px_rgba(255,90,31,0.22)] transition-all"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
              <div className="flex items-center gap-3">
                <span className="relative grid h-9 w-9 place-items-center rounded-full border border-orange-300/40">
                  <span className="absolute inset-0 rounded-full border-t border-amber-200/70 animate-spin-slow" />
                  <span className="text-sm">{p.icon}</span>
                </span>
                <div>
                  <h3 className="text-xs font-bold tracking-wide text-orange-100">{p.name}</h3>
                  <div className="text-[8px] tracking-[0.2em] text-orange-300/60">{p.tag}</div>
                </div>
              </div>
              <div className="mt-5 flex justify-between">
                {p.metrics.map((m, j) => (
                  <Gauge key={m.label} value={m.value} label={m.label} delay={j * 180} />
                ))}
              </div>
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block text-center text-[9px] tracking-[0.24em] border border-orange-400/30 py-2 text-orange-200 hover:bg-orange-400/10 transition-colors"
              >
                ENGAGE MODULE ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
