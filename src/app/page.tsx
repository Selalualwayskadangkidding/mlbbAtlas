import { Header } from "@/components/layout/Header";
import { CurrentHighlights } from "@/components/home/CurrentHighlights";
import { ExploreRegions } from "@/components/home/ExploreRegions";
import { FeaturedMatches } from "@/components/home/FeaturedMatches";
import { HeroSection } from "@/components/home/HeroSection";
import { featuredMatches, highlights, regions } from "@/data/mock/homepageData";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header logoOnly variant="light" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 pb-16 sm:px-8 lg:px-10">
        <HeroSection />
        <ExploreRegions regions={regions} />
        <FeaturedMatches matches={featuredMatches} />
        <CurrentHighlights highlights={highlights} />
      </div>
    </main>
  );
}
