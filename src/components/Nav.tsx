import { useEffect, useState } from "react";

const links = [
  { id: "core", label: "CORE" },
  { id: "quantum", label: "QUANTUM" },
  { id: "blueprint", label: "BLUEPRINT" },
  { id: "reactor", label: "REACTOR" },
  { id: "network", label: "NETWORK" },
  { id: "contact", label: "UPLINK" },
];

export default function Nav({ progress }: { progress: number }) {
  const [active, setActive] = useState("core");

  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setActive(x.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="backdrop-blur-xl bg-[#03060c]/70 border-b border-cyan-400/20">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between gap-4">
          <a href="#core" className="flex items-center gap-2 shrink-0">
            <span className="relative inline-flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-cyan-300/70 animate-spin-slow" />
              <span className="absolute inset-1 rounded-full border border-fuchsia-400/60 animate-spin-rev" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22e7ff]" />
            </span>
            <span className="text-xs tracking-[0.3em] text-cyan-200">MKA//SYS</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`px-3 py-1.5 text-[11px] tracking-[0.22em] border transition-all ${
                  active === l.id
                    ? "border-cyan-300/70 text-cyan-200 bg-cyan-400/10 shadow-[0_0_18px_rgba(34,231,255,0.25)]"
                    : "border-transparent text-cyan-100/45 hover:text-cyan-200 hover:border-cyan-400/30"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="text-[10px] tracking-[0.2em] text-orange-300/80 tabular-nums">
            SYNC {String(Math.round(progress * 100)).padStart(3, "0")}%
          </div>
        </div>
        <div
          className="h-[2px] bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-400 shadow-[0_0_14px_#22e7ff] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}
