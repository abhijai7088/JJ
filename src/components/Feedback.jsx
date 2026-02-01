import { useMemo, useState } from "react";
import { Card, Section, Button } from "./ui.jsx";

export default function Feedback() {
  const [stars, setStars] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", contact: "", message: "" });
  const starRow = useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);

  const input =
    "w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm outline-none placeholder:text-zinc-500 focus:border-white/20";

  const submit = (e) => {
    e.preventDefault();
    alert("Thanks! Your feedback has been recorded (demo).");
    setStars(0);
    setForm({ name: "", email: "", contact: "", message: "" });
  };

  return (
    <Section id="feedback" title="Feedback" subtitle="Your review helps us serve you better.">
      <Card>
        <form onSubmit={submit} className="space-y-3">
          <div className="flex items-center gap-2">
            {starRow.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setStars(n)}
                className={"text-2xl transition " + (n <= stars ? "opacity-100" : "opacity-35")}
                aria-label={`${n} star`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-sm text-zinc-300">{stars ? `${stars}/5` : "Select Star"}</span>
          </div>

          <input className={input} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className={input} placeholder="Your email id" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className={input} placeholder="Your contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          <textarea className={input} rows={4} placeholder="Your feedback" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

          <p className="text-xs text-zinc-400">
            Note: for privacy and security reasons we do not show your contact details.
          </p>

          <Button variant="blue" className="w-full" as="button" type="submit">Submit</Button>
        </form>
      </Card>
    </Section>
  );
}
