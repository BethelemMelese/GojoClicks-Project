# GojoClicks

Package booking frontend for an Ethiopian advertising agency. Clients browse packages (Sanity), submit campaign assets (Cloudinary), create bookings (Supabase), and will later pay via Telebirr through a separate payment service.

## Stack

- Next.js 14 (App Router)
- Sanity CMS — advertising packages
- Supabase — bookings + payment status
- Cloudinary — signed direct uploads
- External payment service (later) — Telebirr on a fixed-IP host

## Getting started

Use Node 18.17+ (Node 20 recommended; see `.nvmrc`).

```bash
nvm use
npm install
cp .env.example .env.local
# fill in Sanity / Supabase / Cloudinary values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home + featured packages |
| `/packages` | All packages |
| `/packages/[slug]` | Package detail + booking stepper shell |
| `/booking/confirmation` | Post-payment confirmation |
| `/booking/failed` | Failed / pending payment |
| `/how-it-works` | Static flow explanation |
| `/api/upload-signature` | Cloudinary signed upload |
| `/api/booking` | Create pending booking (+ payment URL when configured) |
| `/api/booking/status` | Booking status lookup |

## Environment

See `.env.example`. Never commit `.env` or `.env.local`.
