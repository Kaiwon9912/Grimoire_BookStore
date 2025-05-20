/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        allura: ['Allura', 'cursive'],
        bangers: ['Bangers', 'cursive'],
        luckiest: ['Luckiest Guy', 'cursive'],
        greatvb: ['Great Vibes', 'cursive'],
        playwrite: ['Playwrite HU', 'cursive']
      }
      
      ,
    },
  },
  plugins: [

      function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          /* Cho tất cả trình duyệt */
          '-ms-overflow-style': 'none', /* IE và Edge */
          'scrollbar-width': 'none',    /* Firefox */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',              /* Chrome, Safari và Opera */
        },
      };

      addUtilities(newUtilities);
    }

  ],
}
