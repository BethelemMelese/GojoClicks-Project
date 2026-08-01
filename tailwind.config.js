/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kinetic Authority tokens (DESIGN.md)
        surface: {
          DEFAULT: "#f9f9f9",
          dim: "#dadada",
          bright: "#f9f9f9",
          variant: "#e2e2e2",
          container: {
            lowest: "#ffffff",
            low: "#f3f3f3",
            DEFAULT: "#eeeeee",
            high: "#e8e8e8",
            highest: "#e2e2e2",
          },
        },
        "on-surface": {
          DEFAULT: "#1a1c1c",
          variant: "#45474d",
        },
        "inverse-surface": "#2f3131",
        "inverse-on-surface": "#f0f1f1",
        outline: {
          DEFAULT: "#75777e",
          variant: "#c5c6ce",
        },
        "surface-tint": "#515e7a",
        primary: {
          DEFAULT: "#000000",
          container: "#0d1b33",
          fixed: "#d7e2ff",
          "fixed-dim": "#b9c6e6",
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#7784a1",
          fixed: "#0d1b33",
          "fixed-variant": "#3a4761",
        },
        "inverse-primary": "#b9c6e6",
        secondary: {
          DEFAULT: "#7f5600",
          container: "#ffbe4f",
          fixed: "#ffddaf",
          "fixed-dim": "#fcbb4b",
        },
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#724d00",
          fixed: "#281800",
          "fixed-variant": "#614000",
        },
        tertiary: {
          DEFAULT: "#000001",
          container: "#151c27",
          fixed: "#dce2f3",
          "fixed-dim": "#c0c7d6",
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#7d8493",
          fixed: "#151c27",
          "fixed-variant": "#404754",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-error": {
          DEFAULT: "#ffffff",
          container: "#93000a",
        },
        background: "#f9f9f9",
        "on-background": "#1a1c1c",
        // Brand aliases (DESIGN.md prose)
        navy: "#0d1b33",
        gold: "#e8a93b",
        "neutral-gray": "#6b7280",
        "off-white": "#fafafa",
        "border-soft": "#e5e7eb",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-lg-mobile": [
          "32px",
          { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-md": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "500" },
        ],
        caption: ["12px", { lineHeight: "16px", fontWeight: "400" }],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      maxWidth: {
        container: "1400px",
      },
      spacing: {
        gutter: "16px",
        "margin-desktop": "24px",
        "margin-mobile": "12px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "32px",
      },
      boxShadow: {
        elev1: "0px 4px 20px rgba(13, 27, 51, 0.05)",
        elev2: "0px 10px 30px rgba(13, 27, 51, 0.08)",
        elev3: "0px 20px 50px rgba(13, 27, 51, 0.2)",
      },
    },
  },
  plugins: [],
};
