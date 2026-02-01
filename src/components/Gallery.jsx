import { useMemo, useState } from "react";
import { Card, Section, Button } from "./ui.jsx";

function Img({ src, alt, className }) {
  // Using <img> for simplicity and compatibility in plain React
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

export default function Gallery({ data }) {
  const items = data?.items || [];
  const [open, setOpen] = useState(null);
  const active = useMemo(() => items.find(x => x.id === open), [open, items]);

  return (
    <Section id="gallery" title="Gallery" subtitle="A glimpse of our premium collection.">
      <Card>
        <div className="grid grid-cols-2 gap-2">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => setOpen(it.id)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20"
            >
              <div className="aspect-square">
                <Img src={it.imageUrl} alt={it.alt || it.label || "Gallery image"} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2">
                <p className="text-left text-xs font-semibold">{it.label || "Gallery"}</p>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 backdrop-blur"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/3]">
              <Img src={active.imageUrl} alt={active.alt || active.label || "Image"} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-semibold">{active.label || "Gallery"}</p>
                <p className="mt-1 text-xs text-zinc-300">Tap outside to close</p>
              </div>
              <Button as="button" variant="outline" onClick={() => setOpen(null)} className="px-3 py-2">Close</Button>
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
