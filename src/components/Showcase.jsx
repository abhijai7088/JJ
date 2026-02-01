import { useEffect, useMemo, useRef, useState } from "react";
import { Card, Section, cx } from "./ui.jsx";

/**
 * Drag/Pointer rotate effect:
 * - On pointer move, card rotates up to ~10deg based on pointer position.
 * - Adds a professional "rotatory" premium feel (like product cards).
 */
function RotCard({ item }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const [active, setActive] = useState(false);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * 16; // left/right
    const rotX = -(py - 0.5) * 12; // up/down
    const glareX = px * 100;
    const glareY = py * 100;

    setStyle({
      transform: `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(0)`,
      "--gx": `${glareX}%`,
      "--gy": `${glareY}%`
    });
  };

  const reset = () => {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" });
    setActive(false);
  };

  return (
    <div
      ref={ref}
      className={cx(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-black/30",
        "transition-transform will-change-transform",
        active ? "" : "hover:scale-[1.01]"
      )}
      style={style}
      onPointerEnter={() => setActive(true)}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerUp={reset}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-200 pointer-events-none"
           style={{
             opacity: active ? 1 : 0,
             background: "radial-gradient(circle at var(--gx) var(--gy), rgba(245,158,11,0.28), transparent 55%)"
           }}
      />
      <div className="aspect-[4/3]">
        {item.type === "video" ? (
          <video src={item.src} className="h-full w-full object-cover" muted loop playsInline />
        ) : (
          <img src={item.src} alt={item.title || "Showcase"} className="h-full w-full object-cover" loading="lazy" />
        )}
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold">{item.title}</p>
        <p className="mt-1 text-xs text-zinc-400"></p>
      </div>
    </div>
  );
}

export default function Showcase({ data }) {
  const items = useMemo(() => data?.items || [], [data]);

  return (
    <Section id="showcase" title="Showcase" subtitle="Interactive premium preview — drag to rotate.">
      <Card className="p-0">
        <div className="px-4 pt-4">
          
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto px-4 pb-5 snap-x snap-mandatory">
          {items.map((it) => (
            <div key={it.id} className="min-w-[82%] snap-center">
              <RotCard item={it} />
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
