/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-light": "rgb(var(--color-ink-light) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
      },
      fontFamily: {
        serif: ['"PT Serif"', "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "rgb(var(--color-accent) / 1)",
              textDecoration: "underline",
              "&:hover": {
                opacity: 0.8,
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
