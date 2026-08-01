"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import StepperProgress from "@/components/booking/StepperProgress";
import StepAssets from "@/components/booking/steps/StepAssets";
import StepConfirm from "@/components/booking/steps/StepConfirm";
import StepContact from "@/components/booking/steps/StepContact";
import StepPlatform from "@/components/booking/steps/StepPlatform";
import StepProperty from "@/components/booking/steps/StepProperty";
import { IconArrowRight, IconCheck } from "@/components/ui/Icons";
import {
  BOOKING_STEPS,
  TOTAL_BOOKING_STEPS,
  buildBookingPayload,
  createInitialBookingForm,
  validateBookingStep,
} from "@/lib/constants/booking";

export default function BookingStepper({ package: pkg }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(() => createInitialBookingForm());
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [uploadBusy, setUploadBusy] = useState(false);
  const uploadBusyCount = useRef(0);

  const handleUploadBusyChange = (busy) => {
    uploadBusyCount.current += busy ? 1 : -1;
    if (uploadBusyCount.current < 0) uploadBusyCount.current = 0;
    setUploadBusy(uploadBusyCount.current > 0);
  };

  const copy = useMemo(
    () => ({
      1: {
        title: "Your Details",
        description: "Tell us who is booking this campaign.",
      },
      2: {
        title: "Platform & Leads",
        description: "Choose where ads run and how leads should reach you.",
      },
      3: {
        title: "Property & Budget",
        description: "Share the property brief and campaign timing.",
      },
      4: {
        title: "Assets & Goals",
        description: "Upload creatives, choose language, and set your goals.",
      },
      5: {
        title: "Confirm Booking",
        description:
          "Review your details, then confirm to send your booking request.",
      },
    }),
    []
  );

  const onChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
      ...(field === "externalContentUrl" ? { assets: undefined } : null),
    }));
    setSubmitError("");
  };

  const onFieldChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
      ...(field === "logoAsset" ||
      field === "imageAssets" ||
      field === "videoAsset" ||
      field === "assetMediaType" ||
      field === "externalContentUrl" ||
      field === "hasContentReady"
        ? { assets: undefined }
        : null),
    }));
    setSubmitError("");
  };

  const goNext = () => {
    if (uploadBusy) return;
    const nextErrors = validateBookingStep(step, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep((current) => Math.min(TOTAL_BOOKING_STEPS, current + 1));
  };

  const goBack = () => setStep((current) => Math.max(1, current - 1));

  const handleSubmit = async () => {
    const nextErrors = validateBookingStep(TOTAL_BOOKING_STEPS, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = buildBookingPayload(form, pkg);
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create booking");
      }

      const reference = data.booking?.reference;
      if (!reference) {
        throw new Error("Booking was created without a reference");
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }

      router.push(`/booking/confirmation?ref=${encodeURIComponent(reference)}`);
    } catch (error) {
      setSubmitError(error.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg border border-border-soft bg-white p-4 shadow-elev2 md:p-6">
      <StepperProgress steps={BOOKING_STEPS} currentStep={step} />

      <div key={step} className="animate-hero-in">
        <h2 className="font-display text-headline-sm font-semibold text-navy">
          {copy[step].title}
        </h2>
        <p className="mt-1 font-body text-sm text-neutral-gray">
          {copy[step].description}
        </p>

        {step === 1 ? (
          <StepContact form={form} errors={errors} onChange={onChange} />
        ) : null}
        {step === 2 ? (
          <StepPlatform
            form={form}
            errors={errors}
            onChange={onChange}
            onFieldChange={onFieldChange}
          />
        ) : null}
        {step === 3 ? (
          <StepProperty form={form} errors={errors} onChange={onChange} />
        ) : null}
        {step === 4 ? (
          <StepAssets
            form={form}
            errors={errors}
            onChange={onChange}
            onFieldChange={onFieldChange}
            onUploadBusyChange={handleUploadBusyChange}
          />
        ) : null}
        {step === 5 ? (
          <StepConfirm
            package={pkg}
            form={form}
            errors={errors}
            onChange={onChange}
            submitError={submitError}
          />
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={goBack}
          disabled={step === 1 || submitting}
          className="bg-surface-container-low"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Button>

        {step < TOTAL_BOOKING_STEPS ? (
          <Button
            type="button"
            variant="navy"
            onClick={goNext}
            disabled={uploadBusy}
          >
            {uploadBusy ? "Uploading..." : "Next Step"}
            {!uploadBusy ? <IconArrowRight /> : null}
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting || !form.termsAccepted}
          >
            {submitting ? "Submitting..." : "Confirm Booking"}
            {!submitting ? <IconCheck className="h-4 w-4" /> : null}
          </Button>
        )}
      </div>
    </div>
  );
}
