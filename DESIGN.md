---
name: Kinetic Authority
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#45474d'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#515e7a'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1b33'
  on-primary-container: '#7784a1'
  inverse-primary: '#b9c6e6'
  secondary: '#7f5600'
  on-secondary: '#ffffff'
  secondary-container: '#ffbe4f'
  on-secondary-container: '#724d00'
  tertiary: '#000001'
  on-tertiary: '#ffffff'
  tertiary-container: '#151c27'
  on-tertiary-container: '#7d8493'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#b9c6e6'
  on-primary-fixed: '#0d1b33'
  on-primary-fixed-variant: '#3a4761'
  secondary-fixed: '#ffddaf'
  secondary-fixed-dim: '#fcbb4b'
  on-secondary-fixed: '#281800'
  on-secondary-fixed-variant: '#614000'
  tertiary-fixed: '#dce2f3'
  tertiary-fixed-dim: '#c0c7d6'
  on-tertiary-fixed: '#151c27'
  on-tertiary-fixed-variant: '#404754'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system establishes a persona of "Creative Professionalism." It targets marketing executives and business owners who require a platform that feels as dependable as a financial institution but as visionary as a creative agency.

The aesthetic is **Corporate Modern with Editorial Accents**, utilizing heavy whitespace and precise alignment to signal reliability, while using bold typographic scale and warm accents to spark inspiration. The goal is to make the complex process of booking high-value advertising packages feel structured, transparent, and premium.

## Colors

The palette is anchored by **Deep Navy (#0D1B33)**, used for structural elements like headers and navigation to provide a sense of "gravity" and authority.

**Warm Gold (#E8A93B)** is reserved strictly for high-priority actions and state indicators. It should be used sparingly to maintain its impact and prevent the interface from feeling "loud."

**Neutral Gray (#6B7280)** provides a soft contrast for secondary information and long-form body text, ensuring high legibility without the harshness of pure black. The **Off-White (#FAFAFA)** background prevents screen fatigue and differentiates content cards from the page foundation.

## Typography

This design system uses a high-contrast pairing. **Montserrat** is the voice of the brand, used for headlines to convey confidence and modernity. Its geometric nature scales beautifully from massive display hero sections to smaller section headers.

**Inter** handles all functional and body text. Its neutral, systematic design ensures that technical details about advertising specs and pricing remain highly readable. Labels and small metadata should use Inter with a medium weight and increased letter spacing to maintain clarity at small scales.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain an editorial, "magazine-like" feel, centering content within a 1280px container.

A 12-column system is used for desktop (64px margins), transitioning to a 4-column system for mobile (20px margins). Spacing follows an 8px linear scale. Large vertical gaps (stack-lg) should be used between major sections to emphasize the "Minimalist" influence and allow the content to breathe. Use "stack-md" for grouping related elements like input fields and their labels.

## Elevation & Depth

To maintain a professional and trustworthy feel, this design system avoids heavy drop shadows. Instead, it utilizes **Tonal Layers** and **Ambient Shadows**.

- **Level 0 (Base):** Off-white (#FAFAFA) background.
- **Level 1 (Cards):** White (#FFFFFF) surfaces with a subtle 1px border (#E5E7EB) or an extremely diffused shadow (0px 4px 20px rgba(13, 27, 51, 0.05)).
- **Level 2 (Hover/Active):** Slightly deeper shadow (0px 10px 30px rgba(13, 27, 51, 0.08)) to indicate interactivity.
- **Level 3 (Modals/Overlays):** High-diffusion shadow with a 20% opacity Deep Navy tint to create a focused, professional backdrop.

## Shapes

The shape language is **Rounded**, striking a balance between approachable and rigorous. A standard radius of 0.5rem (8px) is applied to all primary UI elements including buttons, input fields, and cards. This softens the "Corporate" edge of the navy palette, making the booking process feel more user-friendly.

Large containers or hero imagery can utilize the `rounded-xl` (1.5rem/24px) token to create a more contemporary, "app-like" aesthetic.

## Components

### Buttons
- **Primary:** Warm Gold (#E8A93B) background with Navy (#0D1B33) text for maximum visibility. Bold Montserrat 14px text.
- **Secondary:** Transparent background with a 2px Navy border.
- **Ghost:** Navy text only, used for tertiary actions like "Cancel."

### Input Fields
- White background with a 1px soft gray border.
- On focus, the border transitions to Warm Gold with a subtle glow.
- Labels sit above the field in Label-MD typography.

### Cards
- Used for advertising packages.
- White background, 8px corner radius, and Level 1 elevation.
- Use a 4px Deep Navy top-border to denote "Premium" or "Featured" packages.

### Chips & Badges
- Used for "Available," "Sold Out," or "Trending."
- Small, uppercase Inter Bold text.
- High-contrast background (Navy) for technical specs, low-contrast (Light Gray) for secondary tags.

### Progress Steppers
- Crucial for the booking flow.
- Horizontal lines in Light Gray, with active steps highlighted in Warm Gold.
- Use Montserrat for step titles to maintain brand consistency.
