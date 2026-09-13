const accents: Record<string, string> = {
  cyan: "from-cyan-200 to-cyan-500 border-cyan-400/40 text-cyan-300",
  blue: "from-sky-200 to-blue-500 border-sky-400/40 text-sky-300",
  orange: "from-amber-200 to-orange-500 border-orange-400/40 text-orange-300",
  violet: "from-fuchsia-200 to-violet-500 border-fuchsia-400/40 text-fuchsia-300",
};

export default function SectionTitle({
  index,
  title,
  subtitle,
  accent = "cyan",
}: {
  index: string;
  title: string;
  subtitle: string;
  accent?: keyof typeof accents | string;
}) {
  const a = accents[accent] ?? accents.cyan;
  return (
    <div className="reveal">
      <div className={`flex items-center gap-3 text-[10px] tracking-[0.35em] ${a.split(" ")[3]}`}>
        <span className={`border px-2 py-0.5 ${a.split(" ")[2]}`}>{index}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-current to-transparent opacity-40" />
      </div>
      <h2
        className={`mt-4 text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r ${a
          .split(" ")
          .slice(0, 2)
          .join(" ")} bg-clip-text text-transparent`}
      >
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-cyan-100/45 font-sans">
        {subtitle}
      </p>
    </div>
  );
}
