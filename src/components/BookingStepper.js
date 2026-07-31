"use client";

import { useState } from "react";

const STEPS = [
  { id: 1, title: "You / company", description: "Contact and company details" },
  {
    id: 2,
    title: "Campaign brief",
    description: "Optional campaign details (fields TBD)",
  },
  { id: 3, title: "Assets", description: "Logo, video, and images" },
  { id: 4, title: "Review & pay", description: "Confirm and continue to payment" },
];

/**
 * Multi-step booking shell. Field lists will be mapped into steps later.
 */
export default function BookingStepper({
  packageId,
  packageSlug,
  packageTitle,
  packagePrice,
}) {
  const [step, setStep] = useState(1);

  const current = STEPS.find((s) => s.id === step) || STEPS[0];
  const isFirst = step === 1;
  const isLast = step === STEPS.length;

  return (
    <div style={{ border: "1px solid #e5e5e5", padding: "1.25rem" }}>
      <ol
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 0,
          marginBottom: "1.25rem",
        }}
      >
        {STEPS.map((s) => (
          <li
            key={s.id}
            style={{
              fontWeight: s.id === step ? 700 : 400,
              opacity: s.id === step ? 1 : 0.6,
            }}
          >
            {s.id}. {s.title}
          </li>
        ))}
      </ol>

      <div style={{ minHeight: "140px", marginBottom: "1.25rem" }}>
        <h3>
          Step {current.id}: {current.title}
        </h3>
        <p>{current.description}</p>
        <p style={{ fontSize: "0.9rem", opacity: 0.75 }}>
          Package: {packageTitle} ({packagePrice} ETB) · slug: {packageSlug} ·
          id: {packageId}
        </p>
        <p style={{ fontSize: "0.9rem" }}>
          Form fields for this step will be added once the field list is
          finalized.
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          type="button"
          disabled={isFirst}
          onClick={() => setStep((s) => Math.max(1, s - 1))}
        >
          Back
        </button>
        {!isLast ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))}
          >
            Continue
          </button>
        ) : (
          <button type="button" disabled title="Wired in a later phase">
            Confirm &amp; pay (coming soon)
          </button>
        )}
      </div>
    </div>
  );
}
