/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dde8ff',
          200: '#c3d4fe',
          300: '#a3b8fc',
          400: '#7e96f8',
          500: '#6473f3',
          600: '#5258e8',
          700: '#4545cd',
          800: '#3939a6',
          900: '#333484',
        },
        surface: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          800: '#1a1b23',
          900: '#111118',
          950: '#0a0a10',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
