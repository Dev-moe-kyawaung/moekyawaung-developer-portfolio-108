import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; h: number };

/** Full-screen canvas: particle simulation + linking graph + cascading data stream glyphs. */
export default function QuantumField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cvs = ref.current!;
    const ctx = cvs.getContext("2d")!;
    let w = 0,
      h = 0,
      raf = 0,
      t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const glyphs = "01λΨΦ∑∆◆▲●⬡アカサタナ".split("");

    let particles: P[] = [];
    let columns: { x: number; y: number; speed: number; chars: string[] }[] = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      cvs.style.width = w + "px";
      cvs.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(110, Math.floor((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: Math.random() * 1.8 + 0.5,
        h: Math.random() * 80 + 160,
      }));

      const colW = 26;
      columns = Array.from({ length: Math.ceil(w / colW) }, (_, i) => ({
        x: i * colW + 6,
        y: Math.random() * -h,
        speed: 0.8 + Math.random() * 2.2,
        chars: Array.from({ length: 12 }, () => glyphs[(Math.random() * glyphs.length) | 0]),
      }));
    }

    function frame() {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);

      // cascading data streams
      ctx.font = "13px ui-monospace, monospace";
      for (const c of columns) {
        c.y += c.speed;
        if (c.y > h + 200) {
          c.y = -Math.random() * 400;
          c.speed = 0.8 + Math.random() * 2.2;
        }
        for (let i = 0; i < c.chars.length; i++) {
          const alpha = (1 - i / c.chars.length) * 0.34;
          ctx.fillStyle = i === 0 ? `rgba(190,255,255,${alpha + 0.4})` : `rgba(34,231,255,${alpha})`;
          ctx.fillText(c.chars[i], c.x, c.y - i * 17);
        }
        if (Math.random() < 0.04)
          c.chars[(Math.random() * c.chars.length) | 0] = glyphs[(Math.random() * glyphs.length) | 0];
      }

      // particles + graph links
      for (const p of particles) {
        p.x += p.vx + Math.sin(t + p.y * 0.01) * 0.16;
        p.y += p.vy + Math.cos(t + p.x * 0.01) * 0.16;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const md = Math.hypot(dx, dy);
        if (md < 150) {
          p.x += (dx / md) * 0.9;
          p.y += (dy / md) * 0.9;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.h},100%,70%,0.85)`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i],
            b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 122) {
            ctx.strokeStyle = `rgba(120,200,255,${(1 - d / 122) * 0.24})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }

    const move = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#03060c]" />
      <div className="absolute inset-0 grid-matrix opacity-60" />
      <canvas ref={ref} className="absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,231,255,0.14),transparent_55%),radial-gradient(ellipse_at_80%_90%,rgba(255,90,31,0.12),transparent_55%),radial-gradient(ellipse_at_10%_60%,rgba(168,85,247,0.14),transparent_55%)]" />
      <div className="absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.35)_0px,rgba(0,0,0,0.35)_1px,transparent_1px,transparent_3px)] opacity-40" />
    </div>
  );
}
