import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/home/StatCounter";
import { HOME_STATS } from "@/lib/constants/site";

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-6 bg-transparent pb-4 md:-mt-8 md:pb-6">
      <Container>
        <Reveal>
          <div className="rounded-xl border border-white/10 bg-navy px-5 py-8 shadow-elev3 md:px-10 md:py-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
              {HOME_STATS.map((stat, index) => (
                <StatCounter
                  key={stat.label}
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={stat.label}
                  duration={1400 + index * 150}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
