# GojoClicks

Package booking frontend for an Ethiopian advertising agency. Clients browse packages (Sanity), upload campaign assets (Cloudinary), pay first and submit a transaction ID + receipt, then create bookings (Supabase). The team verifies payments in a password-protected admin panel.

## Stack

- Next.js 14 (App Router) + Tailwind CSS
- Design system: see [`DESIGN.md`](./DESIGN.md) (Kinetic Authority)
- Sanity CMS — advertising packages
- Supabase — bookings + payment verification status
- Cloudinary — signed direct uploads (creatives + payment proof)
- Resend — booking notification emails

## Getting started

Use Node 18.17+ (Node 20 recommended; see `.nvmrc`).

```bash
nvm use
npm install
cp .env.example .env.local
# fill in Sanity / Supabase / Cloudinary / Resend / admin values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home + featured packages |
| `/packages` | All packages |
| `/packages/[slug]` | Package detail + booking stepper |
| `/booking/confirmation` | Booking received |
| `/admin/login` | Admin sign-in |
| `/admin/bookings` | Bookings list + payment verification |
| `/studio` | Sanity Studio (manage packages) |
| `/api/upload-signature` | Cloudinary signed upload |
| `/api/booking` | Create pending booking |

## Pay-first bookings

Before the booking form starts, clients see **Telebirr** and **CBE Birr** account numbers (each with a copy button) and the package amount. After paying, they continue into the form. On Confirm they must provide:

1. **Transaction / reference ID**
2. **Payment proof** — image or PDF receipt (Cloudinary)

Bookings stay `pending` until you mark them `paid` (or `failed` / `cancelled`) in `/admin/bookings`.

Configure accounts via:

- `NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME`
- `NEXT_PUBLIC_PAYMENT_TELEBIRR_NUMBER`
- `NEXT_PUBLIC_PAYMENT_CBE_BIRR_NUMBER`

Run this SQL if the table already exists:

[`supabase/migrations/20260805_payment_proof.sql`](./supabase/migrations/20260805_payment_proof.sql)

## Admin

1. Set `ADMIN_PASSWORD` in `.env.local` (optional `ADMIN_SESSION_SECRET`)
2. Open `/admin/login`
3. Review transaction IDs + receipts and update status

## Sanity packages

Home and `/packages` load from Sanity when documents exist; otherwise mock packages are used as a fallback.

1. Add CORS origins in [Sanity Manage](https://www.sanity.io/manage)
2. Open `/studio`, create **Advertising Package** documents, publish

## Supabase bookings table

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
2. Run [`supabase/bookings.sql`](./supabase/bookings.sql) (fresh) or the migrations under `supabase/migrations/`
3. Confirm under **Table Editor** that `bookings` exists

| Column / field | Notes |
|----------------|--------|
| `status` | `pending`, `paid`, `failed`, `cancelled` |
| `payment_transaction_id` | Client-submitted transfer reference |
| `payment_proof_url` | Cloudinary URL of image/PDF receipt |

## Booking email alerts

After a booking is saved, Resend sends:

1. **Team alert** to `BOOKING_NOTIFY_TO` — payment details + **Open in admin**
2. **Customer confirmation** to the client’s booking email — reference, package, transaction ID

Email failures never block booking creation.

With Resend’s test sender (`onboarding@resend.dev`), mail can only go to your Resend account email. For real customer delivery, verify your domain and set `EMAIL_FROM` to that domain.

## Environment

See `.env.example`. Never commit `.env` or `.env.local`.
