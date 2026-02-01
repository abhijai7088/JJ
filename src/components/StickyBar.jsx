import { Button } from "./ui.jsx";

function digitsOnly(phone) { return (phone || "").replace(/[^0-9]/g, ""); }
function telLink(phone) {
  const p = (phone || "").replace(/[^0-9+]/g, "");
  return p.startsWith("+") ? `tel:${p}` : `tel:+91${p}`;
}
function waLink(phone, text) {
  const digits = digitsOnly(phone);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text || "")}`;
}

export default function StickyBar({ site }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md px-3 pb-3">
      <div className="rounded-3xl border border-white/10 bg-zinc-950/70 backdrop-blur shadow-glow p-2">
        <div className="grid grid-cols-2 gap-2">
          <Button as="a" href={telLink(site.phoneNumber)} variant="gold" className="py-3">Call</Button>
          <Button as="a" href={waLink(site.whatsappNumber, "Hello! I want to know about your jewellery collection.")} target="_blank" rel="noreferrer" variant="purple" className="py-3">
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
