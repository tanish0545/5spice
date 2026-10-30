/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '380px',
      },
      colors: {
        brand: {
          dark: '#17110F',       // Primary dark background
          espresso: '#30201B',   // Dark espresso
          burgundy: '#641F29',   // Deep burgundy
          wine: '#862D35',       // Rich wine red
          chilli: '#B8322A',     // Chilli red
          ivory: '#F4EBDD',      // Warm ivory
          cream: '#E8D8C5',      // Warm cream
          copper: '#B77B4A',     // Muted copper
          white: '#FFF9F1',      // Soft white
          surface: '#FFF9F1',    // White surface cards
          border: '#3D2A24',     // Dark border
          borderLight: '#E2D3C0', // Light border
        },
        // Semantic aliases
        dark: '#17110F',
        espresso: '#30201B',
        burgundy: '#641F29',
        wine: '#862D35',
        chilli: '#B8322A',
        ivory: '#F4EBDD',
        cream: '#E8D8C5',
        copper: '#B77B4A',
        softwhite: '#FFF9F1',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Cinzel', 'Cormorant Garamond', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
