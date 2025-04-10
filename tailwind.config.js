/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    'text-red-500',
    'bg-blue-300',
    'hover:underline',
    // Add other dynamic classes here
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui(), require('@tailwindcss/typography')]
}

