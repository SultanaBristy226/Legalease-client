import Hero from "@/components/Hero";
import FeaturedLawyers from "@/components/FeaturedLawyers";
import TopExperts from "@/components/TopExperts";
import LegalCategories from "@/components/LegalCategories";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedLawyers />
      <TopExperts />
      <LegalCategories />
    </main>
  );
}