"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PackageListCard from "@/components/packages/PackageListCard";
import PackagesToolbar from "@/components/packages/PackagesToolbar";
import {
  MOCK_PACKAGES,
  PACKAGES_PAGE_SIZE,
  filterAndSortPackages,
} from "@/lib/constants/packages";

export default function PackagesCatalog({ packages = MOCK_PACKAGES }) {
  const [industry, setIndustry] = useState("all");
  const [budget, setBudget] = useState("all");
  const [sort, setSort] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(PACKAGES_PAGE_SIZE);

  const filtered = useMemo(
    () => filterAndSortPackages(packages, { industry, budget, sort }),
    [packages, industry, budget, sort]
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setVisibleCount(PACKAGES_PAGE_SIZE);
  };

  return (
    <div id="packages-catalog">
      <PackagesToolbar
        industry={industry}
        budget={budget}
        sort={sort}
        onIndustryChange={handleFilterChange(setIndustry)}
        onBudgetChange={handleFilterChange(setBudget)}
        onSortChange={handleFilterChange(setSort)}
      />

      <section className="bg-off-white py-12 md:py-16">
        <Container>
          {visible.length === 0 ? (
            <Reveal>
              <div className="rounded-lg border border-border-soft bg-white px-6 py-16 text-center shadow-elev1">
                <p className="font-display text-headline-sm text-navy">
                  No packages match your filters
                </p>
                <p className="mt-2 font-body text-sm text-neutral-gray">
                  Try a different industry, budget, or sort option.
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-6"
                  onClick={() => {
                    setIndustry("all");
                    setBudget("all");
                    setSort("popular");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </Reveal>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {visible.map((pkg, index) => (
                  <PackageListCard key={pkg.id} package={pkg} index={index} />
                ))}
              </div>

              {hasMore ? (
                <Reveal delay={120}>
                  <div className="mt-12 flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount((count) => count + PACKAGES_PAGE_SIZE)
                      }
                      className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-gold transition duration-300 hover:text-[#d9992f]"
                    >
                      Load More Packages
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M7 10l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </Reveal>
              ) : null}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
