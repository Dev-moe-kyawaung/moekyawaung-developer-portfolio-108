import { useEffect, useState } from "react";
import { profile } from "../data";

const roles = [
  "SENIOR FULL-STACK ENGINEER",
  "PWA / OFFLINE-FIRST ARCHITECT",
  "POS SYSTEMS BUILDER",
  "UI MOTION ENGINEER",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const full = roles[idx % roles.length];
    let i = 0;
    let del = false;
    const int = setInterval(() => {
      if (!del) {
        i++;
        setText(full.slice(0, i));
        if (i === full.length) {
          del = true;
          setTimeout(() => {}, 900);
        }
      } else {
        i -= 2;
        setText(full.slice(0, Math.max(0, i)));
        if (i <= 0) {
          clearInterval(int);
          setIdx((v) => v + 1);
        }
      }
    }, del ? 24 : 55);
    return () => clearInterval(int);
  }, [idx]);

  return (
    <section id="core" className="relative min-h-screen flex items-center pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2 border border-cyan-400/40 bg-cyan-400/5 px-3 py-1 text-[10px] tracking-[0.3em] text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            REACTOR ONLINE · CORE TEMP NOMINAL
          </div>

          <h1 className="mt-6 text-5xl sm:text-7xl font-black leading-[0.92] tracking-tight">
            <span className="block bg-gradient-to-r from-cyan-200 via-white to-fuchsia-300 bg-clip-text text-transparent text-glow">
              MOE KYAW
            </span>
            <span className="block bg-gradient-to-r from-orange-300 via-amber-200 to-orange-500 bg-clip-text text-transparent plasma-glow">
              AUNG
            </span>
          </h1>

          <div className="mt-5 h-7 text-sm sm:text-base tracking-[0.24em] text-cyan-300">
            {text}
            <span className="ml-0.5 inline-block w-2 h-4 align-middle bg-cyan-300 animate-pulse" />
          </div>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cyan-100/60 font-sans">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#quantum"
              className="group relative px-6 py-3 text-xs tracking-[0.24em] text-[#03060c] font-bold bg-gradient-to-r from-cyan-300 to-cyan-100 hover:from-white hover:to-cyan-200 transition-all shadow-[0_0_28px_rgba(34,231,255,0.45)]"
            >
              ENTER THE MATRIX
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 text-xs tracking-[0.24em] border border-orange-400/50 text-orange-200 hover:bg-orange-400/10 hover:shadow-[0_0_28px_rgba(255,90,31,0.35)] transition-all"
            >
              GITHUB ↗
            </a>
            <a
              href={profile.gravatar}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 text-xs tracking-[0.24em] border border-fuchsia-400/40 text-fuchsia-200 hover:bg-fuchsia-400/10 transition-all"
            >
              GRAVATAR ↗
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-cyan-400/15 border border-cyan-400/15">
            {[
              ["43+", "DOMAINS"],
              ["30+", "LOVABLE APPS"],
              ["20+", "REPOSITORIES"],
              ["16", "APP MODULES"],
            ].map(([v, l]) => (
              <div key={l} className="bg-[#050a12]/80 px-3 py-4 text-center">
                <dt className="text-2xl font-black text-cyan-200 text-glow">{v}</dt>
                <dd className="mt-1 text-[9px] tracking-[0.25em] text-cyan-100/45">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Reactor core with avatar */}
        <div className="relative mx-auto w-[300px] h-[300px] sm:w-[380px] sm:h-[380px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 via-fuchsia-500/20 to-orange-500/30 animate-heat" />
          <div className="absolute inset-0 rounded-full border border-cyan-300/40 animate-spin-slow">
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_#22e7ff]" />
          </div>
          <div className="absolute inset-5 rounded-full border border-dashed border-fuchsia-400/40 animate-spin-rev" />
          <div className="absolute inset-10 rounded-full border-2 border-orange-400/30 animate-spin-slow" />
          <span className="absolute inset-8 rounded-full border border-cyan-200/30 animate-[pulse-ring_3.4s_ease-out_infinite]" />
          <span className="absolute inset-8 rounded-full border border-orange-300/30 animate-[pulse-ring_3.4s_ease-out_infinite_1.7s]" />

          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="rgba(34,231,255,0.55)"
              strokeWidth="0.5"
              className="flow-line"
            />
          </svg>

          <div className="absolute inset-[22%] rounded-full overflow-hidden border border-cyan-200/50 shadow-[0_0_60px_rgba(34,231,255,0.35)] animate-float-y">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full object-cover contrast-110 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/25 to-transparent mix-blend-screen" />
            <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-200/25 to-transparent animate-[scan-y_3.2s_linear_infinite]" />
          </div>

          {["ARCH", "PWA", "UI/UX", "PERF"].map((tag, i) => (
            <div
              key={tag}
              className="absolute left-1/2 top-1/2 text-[9px] tracking-[0.2em] text-cyan-200/80"
              style={{
                transform: `rotate(${i * 90}deg) translate(0, -190px) rotate(${-i * 90}deg)`,
              }}
            >
              <span className="border border-cyan-400/30 bg-[#03060c]/80 px-2 py-0.5">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
