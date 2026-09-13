import { profile } from "../data";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          index="05"
          title="OPEN AN UPLINK"
          subtitle="Available for senior front-end, PWA and product engineering work. Response window: under 24h."
          accent="cyan"
        />

        <div className="reveal mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="relative border border-cyan-400/25 bg-[#040b14]/80 p-7 overflow-hidden">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-16 w-16 rounded-full object-cover border border-cyan-300/50 shadow-[0_0_28px_rgba(34,231,255,0.35)]"
              />
              <div>
                <h3 className="text-lg font-bold text-cyan-100">{profile.name}</h3>
                <p className="text-[10px] tracking-[0.22em] text-cyan-300/70">{profile.role}</p>
                <p className="text-[10px] tracking-[0.18em] text-fuchsia-300/60">{profile.handle}</p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              {profile.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="flex items-center justify-between border border-cyan-400/15 bg-white/[0.02] px-4 py-3 text-xs text-cyan-100/70 hover:border-cyan-300/60 hover:text-white transition-all"
                >
                  <span>📞 {p}</span>
                  <span>→</span>
                </a>
              ))}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border border-cyan-400/15 bg-white/[0.02] px-4 py-3 text-xs text-cyan-100/70 hover:border-cyan-300/60 hover:text-white transition-all"
              >
                <span>⌁ github.com/Dev-moe-kyawaung</span>
                <span>↗</span>
              </a>
              <a
                href={profile.gravatar}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border border-cyan-400/15 bg-white/[0.02] px-4 py-3 text-xs text-cyan-100/70 hover:border-cyan-300/60 hover:text-white transition-all"
              >
                <span>◉ gravatar.com/moekyawaung2026</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget;
              const btn = f.querySelector("button")!;
              btn.textContent = "SIGNAL TRANSMITTED ✓";
              btn.classList.add("bg-emerald-300");
              setTimeout(() => f.reset(), 400);
            }}
            className="border border-orange-400/25 bg-[#0a0604]/80 p-7 space-y-3"
          >
            <div className="text-[10px] tracking-[0.3em] text-orange-300/80">TRANSMISSION FORM</div>
            {[
              { n: "name", p: "CALLSIGN / NAME" },
              { n: "email", p: "RETURN FREQUENCY / EMAIL" },
            ].map((f) => (
              <input
                key={f.n}
                required
                name={f.n}
                placeholder={f.p}
                className="w-full bg-[#060d16] border border-orange-400/20 px-3 py-3 text-[11px] tracking-wider text-orange-50 placeholder:text-orange-100/25 outline-none focus:border-orange-300/70 transition-colors"
              />
            ))}
            <textarea
              required
              name="msg"
              rows={5}
              placeholder="PAYLOAD / PROJECT BRIEF"
              className="w-full bg-[#060d16] border border-orange-400/20 px-3 py-3 text-[11px] tracking-wider text-orange-50 placeholder:text-orange-100/25 outline-none focus:border-orange-300/70 transition-colors resize-none"
            />
            <button className="w-full py-3 text-[10px] tracking-[0.3em] font-bold text-[#0a0604] bg-gradient-to-r from-amber-200 via-orange-400 to-pink-500 hover:brightness-125 transition-all shadow-[0_0_30px_rgba(255,90,31,0.4)]">
              TRANSMIT
            </button>
          </form>
        </div>
      </div>

      <footer className="mt-20 border-t border-cyan-400/15">
        <div className="mx-auto max-w-7xl px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px] tracking-[0.24em] text-cyan-100/35">
          <span>© {new Date().getFullYear()} MOE KYAW AUNG · ALL SYSTEMS NOMINAL</span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            QUANTUM · BLUEPRINT · REACTOR BUILD v3.0
          </span>
        </div>
      </footer>
    </section>
  );
}
