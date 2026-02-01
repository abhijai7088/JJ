import { Card, Section } from "./ui.jsx";

export default function Hours() {
  return (
    <Section id="hours" title="Opening Hours">
      <Card>
        <div className="text-sm text-zinc-200">
          <p className="text-zinc-300">Mon–Sat</p>
          <p className="mt-1 font-semibold">10:00 AM – 8:00 PM</p>
          <div className="my-3 h-px bg-white/10" />
          <p className="text-zinc-300">Sunday</p>
          <p className="mt-1 font-semibold">11:00 AM – 6:00 PM</p>
        </div>
      </Card>
    </Section>
  );
}
