/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'duo-green': '#58cc02',
        'duo-blue': '#1cb0f6',
        'duo-orange': '#ff9600',
      },
    },
  },
  plugins: [],
}