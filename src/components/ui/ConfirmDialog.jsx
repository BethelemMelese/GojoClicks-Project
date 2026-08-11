"use client";

import { useEffect, useId, useRef } from "react";
import Button from "@/components/ui/Button";

/**
 * Accessible confirm dialog (replaces window.confirm).
 */
export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "danger",
  busy = false,
  onConfirm,
  onCancel,
}) {
  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape" && !busy) onCancel?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, busy, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-navy/50 backdrop-blur-[2px]"
        disabled={busy}
        onClick={() => {
          if (!busy) onCancel?.();
        }}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="relative z-10 w-full max-w-md rounded-lg border border-border-soft bg-white p-5 shadow-elev2"
      >
        <h2
          id={titleId}
          className="font-display text-base font-bold text-navy"
        >
          {title}
        </h2>
        {description ? (
          <p
            id={descriptionId}
            className="mt-2 font-body text-sm leading-relaxed text-neutral-gray"
          >
            {description}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <Button
            ref={cancelRef}
            type="button"
            variant="ghost"
            size="sm"
            disabled={busy}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            size="sm"
            disabled={busy}
            onClick={onConfirm}
          >
            {busy ? "Working…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
