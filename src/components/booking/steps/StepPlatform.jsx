import ChoiceGroup from "@/components/booking/ChoiceGroup";
import FormSection from "@/components/booking/FormSection";
import Input from "@/components/ui/Input";
import FormSelect from "@/components/ui/FormSelect";
import {
  AD_PLATFORM_OPTIONS,
  LEAD_DELIVERY_OPTIONS,
  META_ACCESS_OPTIONS,
} from "@/lib/constants/booking";

export default function StepPlatform({ form, errors, onChange, onFieldChange }) {
  const needsOwnPage =
    form.adPlatform === "own_page" || form.adPlatform === "both";

  return (
    <div className="mt-6 space-y-6">
      <FormSection title="Advertising platform">
        <ChoiceGroup
          label="Where should we run the ads?"
          name="adPlatform"
          options={AD_PLATFORM_OPTIONS}
          value={form.adPlatform}
          onChange={onFieldChange("adPlatform")}
          error={errors.adPlatform}
        />
        {needsOwnPage ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="facebookPageUrl"
              label="Facebook Page URL"
              placeholder="https://facebook.com/..."
              value={form.facebookPageUrl}
              onChange={onChange("facebookPageUrl")}
              error={errors.facebookPageUrl}
            />
            <Input
              id="instagramPageUrl"
              label="Instagram Page URL"
              placeholder="https://instagram.com/..."
              value={form.instagramPageUrl}
              onChange={onChange("instagramPageUrl")}
            />
            <FormSelect
              id="metaBusinessAccess"
              label="Meta Business access granted?"
              value={form.metaBusinessAccess}
              onChange={onChange("metaBusinessAccess")}
              options={META_ACCESS_OPTIONS}
              className="sm:col-span-2"
            />
          </div>
        ) : null}
      </FormSection>

      <FormSection title="Lead delivery">
        <ChoiceGroup
          label="How should we deliver leads?"
          name="leadDeliveryMethod"
          options={LEAD_DELIVERY_OPTIONS}
          value={form.leadDeliveryMethod}
          onChange={onFieldChange("leadDeliveryMethod")}
          error={errors.leadDeliveryMethod}
        />
        {form.leadDeliveryMethod === "whatsapp" ? (
          <Input
            id="leadsWhatsappNumber"
            label="WhatsApp number for leads"
            placeholder="+251..."
            value={form.leadsWhatsappNumber}
            onChange={onChange("leadsWhatsappNumber")}
            error={errors.leadsWhatsappNumber}
          />
        ) : null}
      </FormSection>
    </div>
  );
}
