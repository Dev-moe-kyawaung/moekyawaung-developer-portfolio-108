import { useEffect, useRef, useState } from "react";
import { projects } from "../data";
import SectionTitle from "./SectionTitle";

type Pt = { x: number; y: number };

export default function QuantumNodes({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const [pts, setPts] = useState<Pt[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const box = wrap.current?.getBoundingClientRect();
      if (!box) return;
      setSize({ w: box.width, h: box.height });
      setPts(
        nodes.current.map((n) => {
          const r = n?.getBoundingClientRect();
          return r
            ? { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }
            : { x: 0, y: 0 };
        })
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 600);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const edges: [number, number][] = [];
  for (let i = 0; i < projects.length; i++) {
    edges.push([i, (i + 1) % projects.length]);
    edges.push([i, (i + 3) % projects.length]);
  }

  return (
    <section id="quantum" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          index="01"
          title="QUANTUM NODE ARRAY"
          subtitle="Each project is an entangled node. Hover to collapse the waveform and light its edges."
          accent="cyan"
        />

        <div ref={wrap} className="relative mt-14">
          <svg
            className="pointer-events-none absolute inset-0 z-0"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          >
            <defs>
              <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22e7ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ff5a1f" />
              </linearGradient>
            </defs>
            {pts.length === projects.length &&
              edges.map(([a, b], i) => {
                const p1 = pts[a];
                const p2 = pts[b];
                const mx = (p1.x + p2.x) / 2 + (i % 2 ? 40 : -40);
                const my = (p1.y + p2.y) / 2 + (i % 3 ? -30 : 30);
                const active = hover === a || hover === b;
                return (
                  <path
                    key={i}
                    d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
                    fill="none"
                    stroke="url(#edge)"
                    strokeWidth={active ? 1.6 : 0.7}
                    opacity={active ? 0.95 : 0.22}
                    className="flow-line transition-all duration-300"
                  />
                );
              })}
            {pts.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={hover === i ? 6 : 3}
                fill="#22e7ff"
                opacity="0.5"
                className="transition-all duration-300"
              />
            ))}
          </svg>

          <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  nodes.current[i] = el;
                }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelect(p.id)}
                style={{ transitionDelay: `${i * 60}ms` }}
                className="reveal group cursor-pointer relative border border-cyan-400/25 bg-[#050b14]/85 backdrop-blur-sm p-5 hover:border-cyan-300/70 hover:-translate-y-1.5 hover:shadow-[0_0_40px_rgba(34,231,255,0.25)] transition-all"
              >
                <span className="absolute -top-px -left-px h-3 w-3 border-t border-l border-cyan-300" />
                <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-fuchsia-400" />
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-[8px] tracking-[0.2em] text-fuchsia-300/70 border border-fuchsia-400/30 px-1.5 py-0.5">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-bold tracking-wide text-cyan-100 group-hover:text-white">
                  {p.name}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-cyan-100/45 font-sans line-clamp-3">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {p.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="text-[8px] tracking-widest px-1.5 py-0.5 bg-cyan-400/10 text-cyan-200/70 border border-cyan-400/15"
                    >
                      {s.toUpperCase()}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-[9px] tracking-[0.2em] text-cyan-300/70">
                  <span>OBSERVE NODE</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
