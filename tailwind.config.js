/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        samarth: {
          bg: '#0f1115', // very dark charcoal / near-black
          card: '#16191f', // slightly lighter dark slate
          border: '#2a2e37', // subtle low-contrast lines
          primary: '#3b82f6', // electric blue
          primaryHover: '#2563eb', // deeper blue
          success: '#10b981', // muted green
          warning: '#f59e0b', // amber
          danger: '#ef4444', // muted red
          text: '#f8fafc', // near-white
          textSecondary: '#94a3b8', // cool gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
