import { VideoGrid } from "./_components/VideoGrid";
import Hero from "./_components/Hero";

export default function CommunityPage() {
  return (
    <div className="min-h-screen relative">
      <Hero />

      <section className="py-8 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <VideoGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
