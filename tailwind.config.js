/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const rtlUtilities = {
        '.gap-x-rtl-1': {
          '& > * + *': {
            'margin-inline-start': '0.25rem',
          },
        },
        '.gap-x-rtl-2': {
          '& > * + *': {
            'margin-inline-start': '0.5rem',
          },
        },
        '.gap-x-rtl-3': {
          '& > * + *': {
            'margin-inline-start': '0.75rem',
          },
        },
        '.gap-x-rtl-4': {
          '& > * + *': {
            'margin-inline-start': '1rem',
          },
        },
        '.gap-x-rtl-6': {
          '& > * + *': {
            'margin-inline-start': '1.5rem',
          },
        },
        '.gap-y-rtl-1': {
          '& > * + *': {
            'margin-block-start': '0.25rem',
          },
        },
        '.gap-y-rtl-2': {
          '& > * + *': {
            'margin-block-start': '0.5rem',
          },
        },
        '.gap-y-rtl-3': {
          '& > * + *': {
            'margin-block-start': '0.75rem',
          },
        },
        '.gap-y-rtl-4': {
          '& > * + *': {
            'margin-block-start': '1rem',
          },
        },
        '.gap-y-rtl-6': {
          '& > * + *': {
            'margin-block-start': '1.5rem',
          },
        },
        '.gap-rtl-1': {
          '& > * + *': {
            'margin-inline-start': '0.25rem',
            'margin-block-start': '0.25rem',
          },
        },
        '.gap-rtl-2': {
          '& > * + *': {
            'margin-inline-start': '0.5rem',
            'margin-block-start': '0.5rem',
          },
        },
        '.gap-rtl-3': {
          '& > * + *': {
            'margin-inline-start': '0.75rem',
            'margin-block-start': '0.75rem',
          },
        },
        '.gap-rtl-4': {
          '& > * + *': {
            'margin-inline-start': '1rem',
            'margin-block-start': '1rem',
          },
        },
        '.gap-rtl-6': {
          '& > * + *': {
            'margin-inline-start': '1.5rem',
            'margin-block-start': '1.5rem',
          },
        },
      };

      addUtilities(rtlUtilities);
    },
  ],
};
