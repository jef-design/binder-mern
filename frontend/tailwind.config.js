/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '963px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '574px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      fontFamily: {
        'sans': ['Open Sans, sans-serif'],
      },
      backgroundColor: {
        'dark-main': '#212124',
        'dark-secondary': '#121212',
        // 'dark-main': '#121212',
        // 'dark-secondary': '#212124',
      },
      textColor: {
        'dark-main': '#212124',
        'dark-secondary': '#121212',
        // 'dark-main': '#121212',
        // 'dark-secondary': '#212124',
      },
      colors: {
        'dark-text': '#94a3b8'
      }
    },
  },
  plugins: [],
}