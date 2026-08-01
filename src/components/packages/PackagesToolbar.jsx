"use client";

import Container from "@/components/ui/Container";
import Select from "@/components/ui/Select";
import {
  PACKAGE_BUDGET_OPTIONS,
  PACKAGE_INDUSTRY_OPTIONS,
  PACKAGE_SORT_OPTIONS,
} from "@/lib/constants/packages";

export default function PackagesToolbar({
  industry,
  budget,
  sort,
  onIndustryChange,
  onBudgetChange,
  onSortChange,
}) {
  return (
    <section className="border-y border-border-soft bg-surface-container-low">
      <Container className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-6 md:py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-gray">
            Filter by:
          </span>
          <Select
            id="filter-industry"
            value={industry}
            onChange={onIndustryChange}
            options={PACKAGE_INDUSTRY_OPTIONS}
          />
          <Select
            id="filter-budget"
            value={budget}
            onChange={onBudgetChange}
            options={PACKAGE_BUDGET_OPTIONS}
          />
        </div>

        <div className="flex items-center gap-3">
          <Select
            id="sort-packages"
            label="Sort:"
            value={sort}
            onChange={onSortChange}
            options={PACKAGE_SORT_OPTIONS}
            className="w-full sm:w-auto"
          />
        </div>
      </Container>
    </section>
  );
}
