# Brand assets

| File | Use |
|------|-----|
| `logo.png` | **Header** (`BrandLogo` light) + **booking notification email** |
| `logo_oval.png` | **Footer** (`BrandLogo` dark) — circular mark on navy |
| `logo_have.png` | Alternate horizontal mark |
| `logo_no_white.png` | Alternate stacked mark |
| `favicon-source.png` | Source crop used for site favicon (`src/app/icon.png`, `favicon.ico`) |

`BrandLogo` picks assets via `variant`:

- `variant="light"` → `/brand/logo.png`
- `variant="dark"` → `/brand/logo_oval.png`

**Email logo:** `public/brand/logo.png` (embedded inline in booking emails).
To swap it, replace that file or change `EMAIL_LOGO_FILE` in `src/lib/email/bookingNotification.js`.
