/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'automata-black': ['AutomataBlack', 'sans-serif'],
      },
      dropShadow: {
        text: '0 1.2px 1.2px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}
