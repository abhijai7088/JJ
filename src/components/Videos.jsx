import { Card, Section } from "./ui.jsx";

function toEmbed(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (u.hostname === "youtu.be") {
      const v = u.pathname.replace("/", "");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
  } catch {}
  return null;
}

export default function Videos({ data }) {
  const vids = data?.youtube || [];
  return (
    <Section id="videos" title="YouTube Videos" subtitle="Watch our latest collections and updates.">
      <Card>
        <div className="space-y-4">
          {vids.map((v) => {
            const src = toEmbed(v.url);
            return (
              <div key={v.id} className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <div className="aspect-video">
                  {src ? (
                    <iframe
                      className="h-full w-full"
                      src={src}
                      title={v.title || "YouTube video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-sm text-zinc-300">
                      Invalid YouTube link
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold">{v.title || "Video"}</p>
                </div>
              </div>
            );
          })}
          {!vids.length ? <p className="text-sm text-zinc-300">No videos added yet.</p> : null}
        </div>
      </Card>
    </Section>
  );
}
