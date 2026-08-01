import FormSection from "@/components/booking/FormSection";
import Input from "@/components/ui/Input";

export default function StepContact({ form, errors, onChange }) {
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
          />
          <Input
            id="whatsappNumber"
            label="WhatsApp Number"
            placeholder="+251..."
            value={form.whatsappNumber}
            onChange={onChange("whatsappNumber")}
            error={errors.whatsappNumber}
          />
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
