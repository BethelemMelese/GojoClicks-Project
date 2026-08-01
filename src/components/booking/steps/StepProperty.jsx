import FormSection from "@/components/booking/FormSection";
import Input from "@/components/ui/Input";
import FormSelect from "@/components/ui/FormSelect";
import {
  CAMPAIGN_DURATION_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "@/lib/constants/booking";

export default function StepProperty({ form, errors, onChange }) {
  return (
    <div className="mt-6 space-y-6">
      <FormSection title="Property information">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormSelect
            id="propertyType"
            label="Property Type"
            value={form.propertyType}
            onChange={onChange("propertyType")}
            options={PROPERTY_TYPE_OPTIONS}
            error={errors.propertyType}
          />
          <Input
            id="propertyCount"
            label="Number of Properties"
            type="number"
            min="1"
            value={form.propertyCount}
            onChange={onChange("propertyCount")}
            error={errors.propertyCount}
          />
          <Input
            id="propertyLocation"
            label="Property Location"
            placeholder="Neighborhood / city"
            value={form.propertyLocation}
            onChange={onChange("propertyLocation")}
            error={errors.propertyLocation}
            className="sm:col-span-2"
          />
          <Input
            id="priceRange"
            label="Price Range"
            placeholder="e.g. 3M – 8M ETB"
            value={form.priceRange}
            onChange={onChange("priceRange")}
            error={errors.priceRange}
          />
          <FormSelect
            id="campaignDuration"
            label="Campaign Duration"
            value={form.campaignDuration}
            onChange={onChange("campaignDuration")}
            options={CAMPAIGN_DURATION_OPTIONS}
            error={errors.campaignDuration}
          />
          <Input
            id="targetAudience"
            label="Target Audience"
            placeholder="Buyers, investors, diaspora..."
            value={form.targetAudience}
            onChange={onChange("targetAudience")}
            error={errors.targetAudience}
            className="sm:col-span-2"
          />
        </div>
      </FormSection>

      <FormSection title="Budget">
        <label className="flex items-start gap-3 rounded-lg border border-border-soft p-4">
          <input
            type="checkbox"
            checked={form.includeAdBudget}
            onChange={onChange("includeAdBudget")}
            className="mt-1 accent-gold"
          />
          <span className="font-body text-sm text-on-surface-variant">
            I want to include an additional Meta ad budget beyond the package.
          </span>
        </label>
        {form.includeAdBudget ? (
          <Input
            id="desiredAdBudget"
            label="Desired Ad Budget"
            placeholder="e.g. 10,000 ETB"
            value={form.desiredAdBudget}
            onChange={onChange("desiredAdBudget")}
          />
        ) : null}
      </FormSection>
    </div>
  );
}
