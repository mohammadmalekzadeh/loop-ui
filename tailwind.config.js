module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: { extend: {} },
  variants: { extend: {} },
  plugins: [],
  extend: {
    fontFamily: {
      myfont: ["Morabba", "sans-serif"],
    },
  },  
};
