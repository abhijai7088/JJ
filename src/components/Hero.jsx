import { useState } from "react";
import logo from "../assets/logo.png";
import { Button } from "./ui.jsx";
import MenuSheet from "./MenuSheet.jsx";
import QrModal from "./QrModal.jsx";

function digitsOnly(phone) { return (phone || "").replace(/[^0-9]/g, ""); }
function telLink(phone) {
  const p = (phone || "").replace(/[^0-9+]/g, "");
  return p.startsWith("+") ? `tel:${p}` : `tel:+91${p}`;
}
function waLink(phone, text) {
  const digits = digitsOnly(phone);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text || "")}`;
}

function Hamburger({ onClick }) {
  return (
    <button
      type="button"
      className="absolute right-4 top-4 z-20 rounded-2xl border border-white/10 bg-black/35 px-3 py-2 text-white backdrop-blur hover:bg-black/45"
      onClick={onClick}
      aria-label="Menu"
    >
      <span className="block h-0.5 w-5 bg-white/90" />
      <span className="mt-1.5 block h-0.5 w-5 bg-white/80" />
      <span className="mt-1.5 block h-0.5 w-5 bg-white/70" />
    </button>
  );
}

export default function Hero({ site }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: site.shopName, text: site.tagline, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied.");
      }
    } catch {}
  };

  return (
    <section className="pt-0">
      {/* Top video banner */}
      <div className="hero-bleed relative h-[52vh] min-h-[360px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover hero-video"
          src={site.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.20),transparent_55%)]" />

        <Hamburger onClick={() => setMenuOpen(true)} />

        <div className="absolute left-1/10 bottom-6 -translate-x-1/20 z-90 rounded-full border border-white/10 bg-black/30 px-1 py-0.5 text-xs text-zinc-100 backdrop-blur">
          Since 1995                                                                     
        </div>
        <div className="absolute right-0 bottom-6 z-30 rounded-full border border-white/10 bg-black/30 px-1 py-0.5 text-xs text-zinc-100 backdrop-blur">
   Trusted Jewellery
</div>

        
      </div>

      {/* Center logo overlapping video & card */}
      <div className="relative z-40 -mt-20 flex justify-center">
        <div className="shimmer-wrap relative">
          <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-amber-400/70 bg-black/25 ">
            <img
              src={logo}
              alt="Jaiswal Jewellers logo"
              className="h-full w-full object-cover scale-[1.08]"
            />
          </div>
        </div>
      </div>

      {/* Business card */}
      <div className="mx-auto max-w-md px-4 -mt-10 relative z-20">
        <div className="rounded-[32px] border border-amber-400/10 bg-zinc-950/70 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.75)] p-6 pt-10 text-center">
          <h1 className="text-xl font-semibold tracking-wide text-amber-300">
            {site.shopName}
          </h1>
          <p className="mt-1 text-xs text-zinc-200/90">
            {site.tagline}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-amber-200/85">
            {site.heroNote}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button as="a" href={telLink(site.phoneNumber)} variant="gold">Call</Button>
            <Button
              as="a"
              href={waLink(site.whatsappNumber, "Hello! I want to know about your jewellery collection.")}
              target="_blank"
              rel="noreferrer"
              variant="purple"
            >
              WhatsApp
            </Button>
            <Button as="a" href={site.googleMapsLink} target="_blank" rel="noreferrer" variant="soft">
              Directions
            </Button>
            <Button as="button" onClick={() => setQrOpen(true)} variant="outline">
              QR Share
            </Button>
          </div>

          <div className="mt-3 flex gap-3">
            <Button as="button" onClick={share} variant="outline" className="flex-1">
              Share
            </Button>
            <Button as="a" href="#about" variant="soft" className="flex-1">
              Explore ↓
            </Button>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4 text-left">
            <p className="text-sm font-semibold text-amber-200">📍 Address</p>
            <p className="mt-1 text-sm text-zinc-300">{site.address}</p>
            <div className="my-3 h-px bg-white/10" />
            <p className="text-sm font-semibold text-amber-200">🕒 Timings</p>
            <p className="mt-1 text-sm text-zinc-300">{site.timings}</p>
          </div>
        </div>
      </div>

      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
      <QrModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </section>
  );
}
