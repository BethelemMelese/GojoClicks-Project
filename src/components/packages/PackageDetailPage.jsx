import BookingStepper from "@/components/booking/BookingStepper";
import PackageRecapCard from "@/components/booking/PackageRecapCard";
import TestimonialCard from "@/components/booking/TestimonialCard";
import PackageDetailHero from "@/components/packages/PackageDetailHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PackageDetailPage({ package: pkg }) {
  return (
    <>
      <PackageDetailHero package={pkg} />

      <section id="booking" className="bg-white py-12 md:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-8">
            <BookingStepper package={pkg} />
          </Reveal>

          <div className="space-y-5 lg:col-span-4 lg:sticky lg:top-24">
            <PackageRecapCard package={pkg} />
            <TestimonialCard />
          </div>
        </Container>
      </section>
    </>
  );
}
