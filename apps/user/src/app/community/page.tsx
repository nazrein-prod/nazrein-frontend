import { VideoGrid } from "./_components/VideoGrid";
import Hero from "./_components/Hero";

export default function CommunityPage() {
  return (
    <div className="relative min-h-screen">
      <Hero />

      <section className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <VideoGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
