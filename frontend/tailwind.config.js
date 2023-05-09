/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    space: {
      borderspace: '1px',
    },
    height: {
      main: '825px',
      navbar: '140px',
      availablequests: '35vh',
    },
    extend: {
    },
    fontSize: {
      navtab: '.7vw',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

