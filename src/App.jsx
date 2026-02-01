import site from "./data/site.json";
import services from "./data/services.json";
import gallery from "./data/gallery.json";
import videos from "./data/videos.json";
import showcase from "./data/showcase.json";
import reels from "./data/reels.json";

import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Hours from "./components/Hours.jsx";
import Services from "./components/Services.jsx";
import Gallery from "./components/Gallery.jsx";
import Showcase from "./components/Showcase.jsx";
import Reels from "./components/Reels.jsx";
import Videos from "./components/Videos.jsx";
import Feedback from "./components/Feedback.jsx";
import Footer from "./components/Footer.jsx";
import StickyBar from "./components/StickyBar.jsx";

export default function App() {
  return (
    <main className="min-h-screen text-zinc-50 bg-[#050507]">
      {/* Hero is full-bleed and self-contained */}
      <Hero site={site} />

      {/* Rest of page */}
      <div className="mx-auto max-w-md px-4 pb-24">
        <About site={site} />
        <Hours />
        <Services data={services} />
        <Gallery data={gallery} />
        <Showcase data={showcase} />
        <Reels data={reels} />
        <Videos data={videos} />
        <Feedback />
        <Footer site={site} />
      </div>

      
    </main>
  );
}
