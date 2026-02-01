import { Button } from "./ui.jsx";

export default function MenuSheet({ open, onClose }) {
  const Item = ({ href, label }) => (
    <a
      href={href}
      onClick={onClose}
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/[0.08]"
    >
      {label}
      <span className="text-zinc-400">›</span>
    </a>
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-md p-3">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/85 shadow-glow backdrop-blur-xl overflow-hidden">
          <div className="p-4">
            <p className="text-sm font-semibold">Navigate</p>
            <p className="mt-1 text-xs text-zinc-400">Jump to a section</p>
          </div>
          <div className="px-4 pb-4 space-y-2">
            <Item href="#about" label="About" />
            <Item href="#services" label="Services" />
            <Item href="#gallery" label="Gallery" />
            <Item href="#showcase" label="Showcase" />
            <Item href="#reels" label="Instagram Reels" />
            <Item href="#videos" label="YouTube Videos" />
            <Item href="#feedback" label="Feedback" />
            <Item href="#download" label="Download & Social" />
            <Button as="button" variant="outline" className="w-full mt-2" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
