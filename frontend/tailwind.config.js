/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0B0F19',
        darkSurface: 'rgba(17, 24, 39, 0.7)',
        neonCyan: 'rgb(var(--accent-cyan) / <alpha-value>)',
        neonPurple: 'rgb(var(--accent-purple) / <alpha-value>)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        neon: '0 0 15px rgba(0, 242, 254, 0.5)',
      },
    },
  },
  plugins: [],
}