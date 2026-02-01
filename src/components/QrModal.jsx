import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Button } from "./ui.jsx";

export default function QrModal({ open, onClose, value }) {
  const [dataUrl, setDataUrl] = useState(null);

  const v = useMemo(() => value || (typeof window !== "undefined" ? window.location.href : ""), [value]);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      try {
        const url = await QRCode.toDataURL(v, { margin: 1, width: 320, color: { dark: "#f59e0b", light: "#00000000" } });
        if (alive) setDataUrl(url);
      } catch {
        if (alive) setDataUrl(null);
      }
    })();
    return () => { alive = false; };
  }, [open, v]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/65 backdrop-blur" onClick={onClose} />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto max-w-md p-4">
        <div className="rounded-3xl border border-amber-400/25 bg-zinc-950/90 shadow-glow backdrop-blur-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-amber-200">Scan to Share</p>
              <p className="mt-1 text-sm text-zinc-300">Open this card instantly on any phone.</p>
            </div>
            <Button as="button" variant="outline" className="px-3 py-2" onClick={onClose}>Close</Button>
          </div>

          <div className="mt-4 grid place-items-center">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-4">
              {dataUrl ? (
                <img src={dataUrl} alt="QR code" className="h-56 w-56" />
              ) : (
                <div className="h-56 w-56 grid place-items-center text-sm text-zinc-400">Generating…</div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Button
              as="button"
              variant="gold"
              className="w-full"
              onClick={async () => {
                try { await navigator.clipboard.writeText(v); alert("Link copied."); } catch {}
              }}
            >
              Copy Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
