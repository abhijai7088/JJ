import { useMemo, useState } from "react";
import { Card, Section, cx } from "./ui.jsx";

export default function Services({ data }) {
  const cats = data?.categories || ["All"];
  const [active, setActive] = useState(cats[0] || "All");

  const items = useMemo(() => {
    const list = data?.items || [];
    if (active === "All") return list;
    return list.filter(x => x.category === active);
  }, [active, data]);

  return (
    <Section id="services" title="Services" subtitle="Choose a category to explore.">
      <Card>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cx(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                active === c
                  ? "border-amber-400/60 bg-amber-400/15 text-amber-200"
                  : "border-white/10 bg-white/[0.05] text-zinc-200 hover:bg-white/[0.08]"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3">
          {items.map((it) => (
            <div key={it.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{it.title}</p>
                  <p className="mt-1 text-xs text-zinc-300">{it.desc}</p>
                </div>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-zinc-200">
                  {it.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
