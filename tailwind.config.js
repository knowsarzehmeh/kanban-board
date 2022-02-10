module.exports = {
  purge: [],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        '128': '32rem',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'hover'],
      
    },
  },
  plugins: [],
}
