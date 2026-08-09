import AssetUploader from "@/components/booking/AssetUploader";
import CopyAccountButton from "@/components/booking/CopyAccountButton";
import FormSection from "@/components/booking/FormSection";
import Input from "@/components/ui/Input";
import { getPaymentAccounts } from "@/lib/constants/payment";
import { UPLOAD_LIMITS } from "@/lib/constants/uploads";
import { formatEtb } from "@/lib/packages";

export default function StepPayment({
  package: pkg,
  form,
  errors,
  onChange,
  onFieldChange,
  onUploadBusyChange,
}) {
  const payment = getPaymentAccounts();

  return (
    <div className="mt-6 space-y-5">
      <div className="rounded-lg border border-gold/40 bg-[#fff8eb] p-4 md:p-5">
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

      <ul className="space-y-3">
        {payment.methods.map((method) => (
          <li
            key={method.id}
            className="rounded-lg border border-border-soft bg-off-white p-4"
          >
            <div>
              <p className="font-display text-sm font-semibold text-navy">
                {method.label}
              </p>
              <p className="mt-0.5 font-body text-sm text-neutral-gray">
                {method.description}
              </p>
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

      <FormSection title="Payment proof">
        <p className="font-body text-sm leading-6 text-on-surface-variant">
          After transferring{" "}
          <strong className="text-navy">{formatEtb(pkg.price)}</strong>, enter
          your transaction ID and upload the receipt so we can verify payment.
        </p>

        <Input
          id="paymentTransactionId"
          label="Transaction / Reference ID"
          placeholder="e.g. Telebirr or CBE Birr reference"
          value={form.paymentTransactionId}
          onChange={onChange("paymentTransactionId")}
          error={errors.paymentTransactionId}
        />

        <AssetUploader
          label="Payment proof (image or PDF)"
          hint="Screenshot or PDF receipt — required"
          accept={UPLOAD_LIMITS.paymentProof.accept}
          allowedFormats={UPLOAD_LIMITS.paymentProof.allowedFormats}
          maxFiles={UPLOAD_LIMITS.paymentProof.maxFiles}
          maxSizeBytes={UPLOAD_LIMITS.paymentProof.maxSizeBytes}
          resourceType={UPLOAD_LIMITS.paymentProof.resourceType}
          folder={UPLOAD_LIMITS.paymentProof.folder}
          value={form.paymentProofAsset}
          onChange={onFieldChange("paymentProofAsset")}
          onBusyChange={onUploadBusyChange}
          error={errors.paymentProofAsset}
        />
      </FormSection>
    </div>
  );
}
