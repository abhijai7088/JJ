export function cx(...c) { return c.filter(Boolean).join(" "); }

export function Card({ children, className }) {
  return (
    <div className={cx("rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-glow backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}

export function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mt-7 scroll-mt-24">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-zinc-300">{subtitle}</p> : null}
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function Button({ as: Comp="button", href, onClick, children, variant="soft", className, target, rel, type }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-white/15";
  const styles = {
    soft: "border border-white/10 bg-white/[0.06] hover:bg-white/[0.10]",
    gold: "bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 hover:from-amber-300 hover:to-amber-400",
    outline: "border border-white/12 bg-transparent hover:bg-white/[0.06]",
    purple: "bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-400 hover:to-purple-400",
    blue: "bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400"
  };
  return (
    <Comp href={href} onClick={onClick} target={target} rel={rel} type={type} className={cx(base, styles[variant], className)}>
      {children}
    </Comp>
  );
}
