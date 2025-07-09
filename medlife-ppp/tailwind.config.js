/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-blue': '#1e40af',
        'medical-teal': '#0891b2',
        'medical-green': '#059669',
        'medical-gray': '#6b7280',
      },
    },
  },
  plugins: [],
}