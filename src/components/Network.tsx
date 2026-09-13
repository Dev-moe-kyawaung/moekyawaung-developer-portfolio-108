import { appCollection, domains, lovableApps, gallery } from "../data";
import SectionTitle from "./SectionTitle";

export default function Network() {
  return (
    <section id="network" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          index="04"
          title="DISTRIBUTED NETWORK"
          subtitle="43+ live GitHub Pages domains, 30+ Lovable deployments and a 16-module app collection — one engineer, many endpoints."
          accent="violet"
        />

        {/* marquee */}
        <div className="reveal mt-12 relative overflow-hidden border-y border-fuchsia-400/20 py-3">
          <div className="flex w-max animate-marquee gap-8">
            {[...appCollection, ...appCollection].map((a, i) => (
              <span key={i} className="text-xs tracking-[0.2em] text-fuchsia-100/60 whitespace-nowrap">
                {a}
                <span className="mx-4 text-fuchsia-400/40">◆</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="reveal border border-fuchsia-400/20 bg-[#0a0614]/70 p-5">
            <h3 className="text-[10px] tracking-[0.3em] text-fuchsia-300">GITHUB PAGES CLUSTER</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-1.5">
              {domains.map((d) => (
                <a
                  key={d}
                  href={`https://${d}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 border border-white/5 bg-white/[0.02] px-2.5 py-2 text-[10px] text-fuchsia-100/55 hover:border-fuchsia-400/50 hover:text-fuchsia-100 transition-all"
                >
                  <span className="h-1 w-1 rounded-full bg-fuchsia-400 group-hover:shadow-[0_0_10px_#e879f9]" />
                  <span className="truncate">{d}</span>
                </a>
              ))}
            </div>
            <p className="mt-3 text-[9px] tracking-[0.2em] text-fuchsia-100/35">+ 31 MORE NODES ONLINE</p>
          </div>

          <div className="reveal border border-cyan-400/20 bg-[#04101a]/70 p-5">
            <h3 className="text-[10px] tracking-[0.3em] text-cyan-300">LOVABLE DEPLOYMENTS</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-1.5">
              {lovableApps.map((d) => (
                <a
                  key={d}
                  href={`https://${d}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 border border-white/5 bg-white/[0.02] px-2.5 py-2 text-[10px] text-cyan-100/55 hover:border-cyan-400/50 hover:text-cyan-100 transition-all"
                >
                  <span className="h-1 w-1 rounded-full bg-cyan-400 group-hover:shadow-[0_0_10px_#22e7ff]" />
                  <span className="truncate">{d}</span>
                </a>
              ))}
            </div>
            <p className="mt-3 text-[9px] tracking-[0.2em] text-cyan-100/35">+ 22 MORE APPS SHIPPED</p>
          </div>
        </div>

        {/* gallery */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {gallery.map((g, i) => (
            <div
              key={g}
              style={{ transitionDelay: `${i * 60}ms` }}
              className="reveal group relative aspect-square overflow-hidden border border-cyan-400/20"
            >
              <img
                src={g}
                alt={`visual ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03060c] via-transparent to-transparent" />
              <div className="absolute inset-0 border border-cyan-300/0 group-hover:border-cyan-300/60 transition-colors" />
              <span className="absolute bottom-1.5 left-2 text-[8px] tracking-[0.2em] text-cyan-200/70">
                FRG_{String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
