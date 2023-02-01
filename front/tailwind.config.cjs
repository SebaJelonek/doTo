/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        15: '3.75rem',
        16.5: '4.125rem',
      },
      colors: {
        'sky-1000': '#012033',
      },
    },
  },
  plugins: [],
};
