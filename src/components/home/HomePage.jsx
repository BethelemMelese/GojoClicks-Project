import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import ServicesSection from "@/components/home/ServicesSection";
import PackagesSection from "@/components/home/PackagesSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage({ featuredPackages = [] }) {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <PackagesSection packages={featuredPackages} />
      <CtaBanner />
    </>
  );
}
