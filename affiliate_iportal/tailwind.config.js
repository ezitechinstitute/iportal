/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Helvetica', 'Arial', 'serif'],
        mono: ['Montserrat', 'Helvetica', 'Arial', 'serif'],
      },
      boxShadow: {
        'all-sides': '4px 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
  
}

