module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        loop: "#FF9800",
        jet: "#333333",
        pine_green: "#00796B",
        isabelline: "#F9F5F0",
        eggshell: "#F7EEDB",
        pigment_green: "#4CAF50",
        orange_web: "#FFAD33",
        fulvous: "#E08800",
        azul: "#016BB7",
        fire_brick: "#BE2323",
        mantis: "#63BB66",
        golden: "#F7FF00",
        sea_green: "#26945E",
        dim_gray: "#656463",
        silver: "#C8C5C1",
        platinum: "#E7E3DF",
      },
    }
  },
  variants: { extend: {} },
  plugins: [],
  extend: {
    fontFamily: {
      myfont: ["Morabba", "sans-serif"],
    },
  },  
};
