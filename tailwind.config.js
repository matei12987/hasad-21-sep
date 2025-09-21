/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'ps-10': 'padding-inline-start: 2.5rem',
        'pe-4': 'padding-inline-end: 1rem',
        'pe-12': 'padding-inline-end: 3rem',
        'ms-2': 'margin-inline-start: 0.5rem',
      }
    },
  },
  plugins: [],
};
