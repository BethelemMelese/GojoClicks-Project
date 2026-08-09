/**
 * Booking payment accounts (Telebirr + CBE Birr).
 * Override via env in production without a code change.
 */
export function getPaymentAccounts() {
  const accountName =
    process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME || "GojoClicks Media";
  const noteHint =
    process.env.NEXT_PUBLIC_PAYMENT_NOTE_HINT ||
    "Use your full name or phone number as the transfer note.";

  return {
    accountName,
    noteHint,
    methods: [
      {
        id: "telebirr",
        label: "Telebirr",
        description: "Send via Telebirr to this number",
        accountNumber:
          process.env.NEXT_PUBLIC_PAYMENT_TELEBIRR_NUMBER ||
          process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NUMBER ||
          "— add Telebirr number —",
      },
      {
        id: "cbe_birr",
        label: "CBE Birr",
        description: "Send via CBE Birr to this account",
        accountNumber:
          process.env.NEXT_PUBLIC_PAYMENT_CBE_BIRR_NUMBER ||
          "— add CBE Birr account —",
      },
    ],
  };
}

/** @deprecated use getPaymentAccounts — kept for any older imports */
export function getPaymentInstructions() {
  const accounts = getPaymentAccounts();
  const telebirr = accounts.methods.find((m) => m.id === "telebirr");
  return {
    methodLabel: "Telebirr / CBE Birr",
    accountName: accounts.accountName,
    accountNumber: telebirr?.accountNumber || "",
    bankName: "CBE Birr",
    noteHint: accounts.noteHint,
  };
}
