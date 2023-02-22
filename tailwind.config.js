/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  extend: {
    keyframes: {
      spin: {
        to: { transform: 'rotate(360deg)' },
      },
    },
    animation: {
      spin: 'spin 1s linear infinite',
    },
  },
};
