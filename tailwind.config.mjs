/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paper: "#FDFBF7",
        ink: "#18181B", // zinc-950
        "ink-light": "#52525B", // zinc-600
        accent: "#800000", // maroon
      },
      fontFamily: {
        serif: ['"PT Serif"', "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};
