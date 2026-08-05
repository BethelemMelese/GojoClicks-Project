import FormSection from "@/components/booking/FormSection";
import Input from "@/components/ui/Input";

export default function StepContact({ form, errors, onChange }) {
  const whatsappSameAsPhone = form.whatsappSameAsPhone !== false;

  return (
    <div className="mt-6 space-y-6">
      <FormSection title="Personal information">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="fullName"
            label="Full Name"
            placeholder="Your full name"
            value={form.fullName}
            onChange={onChange("fullName")}
            error={errors.fullName}
          />
          <Input
            id="email"
            label="Work Email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={onChange("email")}
            error={errors.email}
          />
          <Input
            id="phone"
            label="Phone Number"
            placeholder="+251..."
            value={form.phone}
            onChange={onChange("phone")}
            error={errors.phone}
            className="sm:col-span-2"
          />
          <label className="flex items-start gap-3 rounded-lg border border-border-soft p-4 sm:col-span-2">
            <input
              type="checkbox"
              checked={whatsappSameAsPhone}
              onChange={onChange("whatsappSameAsPhone")}
              className="mt-1 accent-gold"
            />
            <span className="font-body text-sm text-on-surface-variant">
              WhatsApp is the same as my phone number
            </span>
          </label>
          {!whatsappSameAsPhone ? (
            <Input
              id="whatsappNumber"
              label="WhatsApp Number"
              placeholder="+251..."
              value={form.whatsappNumber}
              onChange={onChange("whatsappNumber")}
              error={errors.whatsappNumber}
              className="sm:col-span-2"
            />
          ) : null}
          <Input
            id="companyName"
            label="Company Name"
            placeholder="Agency or company"
            value={form.companyName}
            onChange={onChange("companyName")}
          />
          <Input
            id="cityArea"
            label="City / Area"
            placeholder="Addis Ababa, Bole"
            value={form.cityArea}
            onChange={onChange("cityArea")}
            error={errors.cityArea}
          />
        </div>
      </FormSection>
    </div>
  );
}
