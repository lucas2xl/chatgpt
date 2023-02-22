/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#343541',
        selectionBackground: '#434654',
        sideBarBackground: '#202123',
        loginBackground: '#11A37F',
      },
    },
  },
  plugins: [],
};
3;
