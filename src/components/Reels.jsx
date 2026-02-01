import { useEffect, useRef } from "react";
import { Card, Section, Button } from "./ui.jsx";

function ReelCard({ item }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure correct settings
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.playbackRate = 2.0;

    // Force browser to render a frame
    const start = async () => {
      try {
        await video.play();        // REQUIRED
        video.currentTime = 0.1;   // force visible frame
      } catch (err) {
        // Autoplay might still be blocked until interaction (iOS)
        console.warn("Autoplay blocked, waiting for interaction");
      }
    };

    start();
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        video.playbackRate = 2.0;
      } else {
        video.pause();
        video.currentTime = 0.1;
      }
    } catch {}
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
      <div className="relative aspect-[9/16]">
        <video
          ref={videoRef}
          src={item.video}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onClick={togglePlay}
        />

        {/* Play indicator (only visual, video is already playing) */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
          <div className="rounded-full bg-black/50 px-3 py-2 text-white text-xs font-semibold">
            2× ▶
          </div>
        </div>

        {/* Title overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2">
          <p className="text-xs font-semibold text-white">
            {item.title || "Reel"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Reels({ data }) {
  const items = data?.items || [];

  return (
    <Section id="reels" title="Instagram Reels" subtitle="">
      <Card>
        <div className="grid grid-cols-2 gap-2">
          {items.map((item) => (
            <ReelCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-3">
          <Button
            as="a"
            href="https://www.instagram.com/jaiswal_jewellers16/"
            target="_blank"
            rel="noreferrer"
            variant="outline"
            className="w-full"
          >
            Open Instagram Profile
          </Button>
        </div>
      </Card>
    </Section>
  );
}
