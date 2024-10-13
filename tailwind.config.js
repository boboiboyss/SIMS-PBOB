/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "saldo-bg": "url('/src/assets/Background%20Saldo.png')",
      },
    },
  },
  plugins: [],
};
