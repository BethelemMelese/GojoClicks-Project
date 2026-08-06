"use client";

import { useState } from "react";

export default function CopyAccountButton({ value, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = String(value || "").trim();
    if (!text || text.startsWith("—")) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const input = document.createElement("textarea");
        input.value = text;
        input.setAttribute("readonly", "");
        input.style.position = "absolute";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded border border-navy/15 bg-white px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-wide text-navy transition hover:border-gold hover:bg-[#fff8eb]"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
