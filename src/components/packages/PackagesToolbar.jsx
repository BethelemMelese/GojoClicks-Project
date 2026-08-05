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
      <Container className="py-3 md:py-5">
        {/* Mobile: three compact filters in one row */}
        <div className="grid grid-cols-3 gap-2 md:hidden">
          <Select
            id="filter-industry-mobile"
            label="Industry"
            size="sm"
            value={industry}
            onChange={onIndustryChange}
            options={PACKAGE_INDUSTRY_OPTIONS}
          />
          <Select
            id="filter-budget-mobile"
            label="Budget"
            size="sm"
            value={budget}
            onChange={onBudgetChange}
            options={PACKAGE_BUDGET_OPTIONS}
          />
          <Select
            id="sort-packages-mobile"
            label="Sort"
            size="sm"
            value={sort}
            onChange={onSortChange}
            options={PACKAGE_SORT_OPTIONS}
          />
        </div>

        {/* Desktop / tablet: original spaced layout */}
        <div className="hidden md:flex md:items-center md:justify-between md:gap-6">
          <div className="flex flex-wrap items-center gap-3">
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

          <Select
            id="sort-packages"
            label="Sort:"
            value={sort}
            onChange={onSortChange}
            options={PACKAGE_SORT_OPTIONS}
          />
        </div>
      </Container>
    </section>
  );
}
