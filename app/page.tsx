import FeaturedProducts from "@/components/feature/FeaturedProducts";
import Hero from "@/components/feature/Hero";
import PromoBanner from "@/components/feature/PromoBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home Page with simple components',
}

export default function Home() {

  return (
    <>
      <PromoBanner />
      <Hero
        title="Independence Day Line"
        description="Check out our Independence Day line of stationery products in time for the semiquincentennial festivities."
        image="/assets/independence-day.png"
        ctaText="View"
        ctaLink="/search?category=stationery"
      />
      <FeaturedProducts title="Featured Products" ctaText="View All" ctaLink="/search/" />
    </>

  );
}
