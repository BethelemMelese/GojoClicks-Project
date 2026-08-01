import Link from "next/link";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "How it works — GojoClicks",
};

const STEPS = [
  {
    title: "Browse",
    body: "Explore advertising packages and pick the one that fits your campaign.",
  },
  {
    title: "Book",
    body: "Enter your contact and company details in the booking form.",
  },
  {
    title: "Submit assets",
    body: "Upload your logo, video, and images directly for the campaign.",
  },
  {
    title: "Pay",
    body: "Complete payment securely (Telebirr will be connected in a later phase).",
  },
  {
    title: "Get confirmation",
    body: "See your booking reference and status once payment succeeds.",
  },
];

export default function HowItWorksPage() {
  return (
    <Container className="py-10 md:py-14">
      <h1 className="font-display text-headline-md">How it works</h1>
      <p>Five simple steps from package to confirmed booking.</p>
      <ol style={{ display: "grid", gap: "1rem", paddingLeft: "1.25rem" }}>
        {STEPS.map((step, index) => (
          <li key={step.title}>
            <h2>
              {index + 1}. {step.title}
            </h2>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/packages">Browse packages</Link>
      </p>
    </Container>
  );
}
