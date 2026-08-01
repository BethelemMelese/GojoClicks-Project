import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import ChannelsSection from "@/components/home/ChannelsSection";
import PackagesSection from "@/components/home/PackagesSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ChannelsSection />
      <PackagesSection />
      <CtaBanner />
    </>
  );
}
