const colors = require("tailwindcss/colors");
module.exports = {
  separator: "_",
  purge: ["./src/**/*.vue"],
  corePlugins: {
    space: false,
    divideStyle: false,
    divideWidth: false,
    divideColor: false,
    divideOpacity: false,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      hello: "#ff0000",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blue: {
        50: "#2A62FF",
      },
    },
    spacing: {
      px: "1px",
      0: "0px",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
    },
    fontSize: {
      xs: [
        "0.75rem",
        {
          lineHeight: "1rem",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "1.25rem",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "1.5rem",
        },
      ],
      lg: [
        "1.125rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      xl: [
        "1.25rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
        },
      ],
      "3xl": [
        "1.875rem",
        {
          lineHeight: "2.25rem",
        },
      ],
      "4xl": [
        "2.25rem",
        {
          lineHeight: "2.5rem",
        },
      ],
      "5xl": [
        "3rem",
        {
          lineHeight: "1",
        },
      ],
      "6xl": [
        "3.75rem",
        {
          lineHeight: "1",
        },
      ],
      "7xl": [
        "4.5rem",
        {
          lineHeight: "1",
        },
      ],
      "8xl": [
        "6rem",
        {
          lineHeight: "1",
        },
      ],
      "9xl": [
        "8rem",
        {
          lineHeight: "1",
        },
      ],
    },
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      "1_2": "50%",
      "1_3": "33.333333%",
      "2_3": "66.666667%",
      "1_4": "25%",
      "2_4": "50%",
      "3_4": "75%",
      "1_5": "20%",
      "2_5": "40%",
      "3_5": "60%",
      "4_5": "80%",
      "1_6": "16.666667%",
      "2_6": "33.333333%",
      "3_6": "50%",
      "4_6": "66.666667%",
      "5_6": "83.333333%",
      full: "100%",
      screen: "100vh",
    }),
    inset: (theme, { negative }) => ({
      auto: "auto",
      ...theme("spacing"),
      ...negative(theme("spacing")),
      "1_2": "50%",
      "1_3": "33.333333%",
      "2_3": "66.666667%",
      "1_4": "25%",
      "2_4": "50%",
      "3_4": "75%",
      full: "100%",
      "-1_2": "-50%",
      "-1_3": "-33.333333%",
      "-2_3": "-66.666667%",
      "-1_4": "-25%",
      "-2_4": "-50%",
      "-3_4": "-75%",
      "-full": "-100%",
    }),
    translate: (theme, { negative }) => ({
      ...theme("spacing"),
      ...negative(theme("spacing")),
      "1_2": "50%",
      "1_3": "33.333333%",
      "2_3": "66.666667%",
      "1_4": "25%",
      "2_4": "50%",
      "3_4": "75%",
      full: "100%",
      "-1_2": "-50%",
      "-1_3": "-33.333333%",
      "-2_3": "-66.666667%",
      "-1_4": "-25%",
      "-2_4": "-50%",
      "-3_4": "-75%",
      "-full": "-100%",
    }),
    width: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      "1_2": "50%",
      "1_3": "33.333333%",
      "2_3": "66.666667%",
      "1_4": "25%",
      "2_4": "50%",
      "3_4": "75%",
      "1_5": "20%",
      "2_5": "40%",
      "3_5": "60%",
      "4_5": "80%",
      "1_6": "16.666667%",
      "2_6": "33.333333%",
      "3_6": "50%",
      "4_6": "66.666667%",
      "5_6": "83.333333%",
      "1_12": "8.333333%",
      "2_12": "16.666667%",
      "3_12": "25%",
      "4_12": "33.333333%",
      "5_12": "41.666667%",
      "6_12": "50%",
      "7_12": "58.333333%",
      "8_12": "66.666667%",
      "9_12": "75%",
      "10_12": "83.333333%",
      "11_12": "91.666667%",
      full: "100%",
      screen: "100vw",
      min: "min-content",
      max: "max-content",
    }),
    extend: {
      colors: {
        primary: "#7593B8",
        fontcolor: "#74767F",
        blanklight: "#333333",
        basecolor: "#666666",
        light: "#999999",
        placholder: "#E0E1E6",
        info: "#F1561F",
        blueinfo: "#0F61F1",
        invitation: "#FF5A0A",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
