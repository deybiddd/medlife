/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'gradient-bg',
    'btn-primary',
    'feature-card',
    'glass-effect',
    'hover-lift',
    'icon-glow',
    'text-glow',
    'progress-bar',
    'animate-fadeIn',
    'animate-slideInLeft',
    'animate-slideInRight',
    'animate-bounce-slow',
    'floating',
    'ripple',
    'status-pending',
    'status-approved',
    'status-rejected',
  ],
  theme: {
    extend: {
      colors: {
        // MedLife Brand Colors
        'medlife-teal': '#1DB5A6',
        'medlife-yellow': '#F5C842',
        'medlife-red': '#E53E3E',
        'medlife-black': '#000000',
        'medlife-gray': '#6b7280',
        // Legacy colors for backward compatibility
        'medical-blue': '#1e40af',
        'medical-teal': '#0891b2',
        'medical-green': '#059669',
        'medical-gray': '#6b7280',
      },
    },
  },
  plugins: [],
}