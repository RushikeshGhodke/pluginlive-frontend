// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Make sure Tailwind scans all your files
  ],
  theme: {
    extend: {
      fontFamily: {
        // Set Plus Jakarta Sans as the default font family for all elements
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
