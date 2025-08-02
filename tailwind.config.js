/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'fade-in-out': 'fadeInOut 2s infinite',
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}