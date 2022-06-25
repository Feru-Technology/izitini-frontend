/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/components/**/*.{ts,tsx}', './public/index.html'],


  theme: {
    extend: {
      colors: {
        'dark-blue': '#004896',
        'middle-blue': '#0e87d2',
        'light-blue': '#00adef',
        'header-blue': '#02a6ea'

      },
      backgroundImage: {
        'sidebar-photo': "url('images/2754223.svg')",
      },
      height: {
        129: '29.9vh',
        130: '30.3vh',
        131: '31.3vh',
        132: '32.3vh',
        133: '33.3vh',
        134: '34.3vh',
        135: '35.3vh',
        136: '36.3vh',
        140: '40.3vh',
        160: '60.3vh',
        170: '70vh',
        180: '80vh',
        190: '90vh',
      }
    },
  },
  plugins: [
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
}
