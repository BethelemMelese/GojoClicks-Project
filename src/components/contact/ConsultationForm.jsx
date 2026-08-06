"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import FormSelect from "@/components/ui/FormSelect";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { INTEREST_AREA_OPTIONS } from "@/lib/constants/contact";

const INITIAL = {
  fullName: "",
  email: "",
  company: "",
  interestArea: "packages",
  vision: "",
};

export default function ConsultationForm() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitError("");
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email";
    }
    if (!form.interestArea) next.interestArea = "Select an interest area";
    if (!form.vision.trim()) next.vision = "Tell us a bit about your project";
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          interestArea: form.interestArea,
          vision: form.vision.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send request");
      }
      setSubmitted(true);
      setForm(INITIAL);
    } catch (error) {
      setSubmitError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-lg border border-border-soft border-t-4 border-t-gold bg-white p-6 text-center shadow-elev2 md:p-8">
        <p className="font-display text-headline-sm font-bold text-navy">
          Request received
        </p>
        <p className="mt-2 max-w-sm font-body text-sm text-neutral-gray">
          Thanks — our executive team will follow up shortly.
        </p>
        <Button
          type="button"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border-soft border-t-4 border-t-gold bg-white p-5 shadow-elev2 transition duration-300 md:p-7"
      noValidate
    >
      <h2 className="font-display text-headline-sm font-bold text-navy">
        Consultation Request
      </h2>
      <p className="mt-1 font-body text-sm text-neutral-gray">
        Share a few details and we’ll route you to the right strategist.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
          label="Email"
          type="email"
          placeholder="name@example.com"
          value={form.email}
          onChange={onChange("email")}
          error={errors.email}
        />
        <Input
          id="company"
          label="Company"
          placeholder="Agency or company"
          value={form.company}
          onChange={onChange("company")}
          className="sm:col-span-2"
        />
        <FormSelect
          id="interestArea"
          label="Interest Area"
          value={form.interestArea}
          onChange={onChange("interestArea")}
          options={INTEREST_AREA_OPTIONS}
          error={errors.interestArea}
          className="sm:col-span-2"
        />
        <Textarea
          id="vision"
          label="Project Vision"
          placeholder="What are you looking to achieve?"
          value={form.vision}
          onChange={onChange("vision")}
          error={errors.vision}
          className="sm:col-span-2"
          rows={5}
        />
      </div>

      {submitError ? (
        <p className="mt-4 rounded-lg border border-error/30 bg-error/5 px-4 py-3 font-body text-sm text-error">
          {submitError}
        </p>
      ) : null}

      <Button type="submit" className="mt-6 w-full" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}
