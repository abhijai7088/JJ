import { Card, Button, Section } from "./ui.jsx";

function digitsOnly(phone) { return (phone || "").replace(/[^0-9]/g, ""); }

function buildVCard(site) {
  const name = site.shopName || "Jaiswal Jewellers";
  const phone = digitsOnly(site.phoneNumber);
  const addr = site.address || "";
  const note = site.tagline || "";
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `ORG:${name}`,
    phone ? `TEL;TYPE=CELL:+${phone}` : "",
    addr ? `ADR;TYPE=WORK:;;${addr};;;;` : "",
    note ? `NOTE:${note}` : "",
    site.socials?.instagram ? `URL:${site.socials.instagram}` : "",
    "END:VCARD"
  ].filter(Boolean).join("\n");
}

export default function Footer({ site }) {
  const downloadVcf = () => {
    const blob = new Blob([buildVCard(site)], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jaiswal-jewellers.vcf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Section id="download" title="Download & Social">
      <Card>
        <div className="grid grid-cols-2 gap-2">
          <Button as="button" variant="gold" onClick={downloadVcf}>Save to Contacts</Button>
          <Button as="a" variant="soft" href={site.socials?.googleBusiness || "#"} target="_blank" rel="noreferrer">
            Google
          </Button>
          <Button as="a" variant="outline" href={site.socials?.instagram || "#"} target="_blank" rel="noreferrer">
            Instagram
          </Button>
          <Button as="a" variant="outline" href={site.socials?.facebook || "#"} target="_blank" rel="noreferrer">
            Facebook
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} {site.shopName}. All rights reserved.
        </p>
      </Card>
    </Section>
  );
}
