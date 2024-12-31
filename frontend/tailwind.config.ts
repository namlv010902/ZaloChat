import {theme} from './src/lib/config'

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html", 
  ],
  theme: {
    extend: {
      colors: theme.colors, 
      fontFamily: theme.fontFamily,
      screens: theme.screens,
    },
  },
  plugins: [],
};
