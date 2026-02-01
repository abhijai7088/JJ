import { Card, Section } from "./ui.jsx";

export default function About({ site }) {
  return (
    <Section id="about" title="About Us" subtitle="A legacy of trust, purity and craftsmanship.">
      <Card>
        <div className="space-y-3 text-sm text-zinc-200">
          {(site.about || []).map((p, i) => (
            <p key={i} className="leading-relaxed text-zinc-200/95">{p}</p>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
            <p className="text-xs text-zinc-300">Purity</p>
            <p className="mt-1 text-sm font-semibold">Verified</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
            <p className="text-xs text-zinc-300">Pricing</p>
            <p className="mt-1 text-sm font-semibold">Transparent</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
            <p className="text-xs text-zinc-300">Design</p>
            <p className="mt-1 text-sm font-semibold">Elegant</p>
          </div>
        </div>
      </Card>
    </Section>
  );
}
