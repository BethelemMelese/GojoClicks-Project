"use client";

import Button from "@/components/ui/Button";
import CopyAccountButton from "@/components/booking/CopyAccountButton";
import { getPaymentAccounts } from "@/lib/constants/payment";
import { formatEtb } from "@/lib/packages";
import { IconArrowRight } from "@/components/ui/Icons";

export default function BookingPaymentGate({ package: pkg, onContinue }) {
  const payment = getPaymentAccounts();

  return (
    <div className="animate-hero-in">
      <p className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
        Step 0 · Pay first
      </p>
      <h2 className="mt-2 font-display text-headline-sm font-semibold text-navy">
        Pay for {pkg.title}
      </h2>
      <p className="mt-1 font-body text-sm text-neutral-gray">
        Transfer the package amount using Telebirr or CBE Birr, then start the
        booking form. You&apos;ll submit your transaction ID and receipt at the
        end.
      </p>

      <div className="mt-6 rounded-lg border border-gold/40 bg-[#fff8eb] p-4 md:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
              Amount to pay
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-navy">
              {formatEtb(pkg.price)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
              Account name
            </p>
            <p className="mt-1 font-body text-sm font-semibold text-navy">
              {payment.accountName}
            </p>
          </div>
        </div>
        <p className="mt-3 font-body text-caption text-neutral-gray">
          {payment.noteHint}
        </p>
      </div>

      <ul className="mt-5 space-y-3">
        {payment.methods.map((method) => (
          <li
            key={method.id}
            className="rounded-lg border border-border-soft bg-off-white p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-sm font-semibold text-navy">
                  {method.label}
                </p>
                <p className="mt-0.5 font-body text-sm text-neutral-gray">
                  {method.description}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-md border border-border-soft bg-white px-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
                  Account number
                </p>
                <p className="mt-0.5 break-all font-display text-base font-bold tracking-wide text-navy">
                  {method.accountNumber}
                </p>
              </div>
              <CopyAccountButton value={method.accountNumber} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-end">
        <Button type="button" variant="navy" onClick={onContinue}>
          I&apos;ve paid — start booking
          <IconArrowRight />
        </Button>
      </div>
    </div>
  );
}
