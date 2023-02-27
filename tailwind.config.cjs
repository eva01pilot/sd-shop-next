/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx}", "./src/app/LayoutElements/Navbar.tsx",  "./app/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        "Inter": ['Inter', 'sans-serif']

      }
    },
  },
  plugins: [],
};
