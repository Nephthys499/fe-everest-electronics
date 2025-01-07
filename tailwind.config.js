/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", 
    "./public/index.html",             
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005FAB', 
        secondary: '#0D6EFD', 
        lightBlue: '#D9EEF8', 
        darkGray: '#E9E9E9', 
        white: '#FFFFFF', 
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'], 
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        neon: '0 0 15px #1E90FF',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}


