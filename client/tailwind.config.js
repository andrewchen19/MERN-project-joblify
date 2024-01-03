/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["35px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        myLight: {
          primary: "#70acc7", // 藍
          secondary: "#da8ee7", // 紫
          accent: "#4d8576", // 湖綠
          neutral: "#F2AAAE", // 粉紅
          "base-100": "#ffffff", // 基底色
        },
      },
      {
        myDark: {
          primary: "#00b4d8", // 螢光藍
          secondary: "#9d72ff", // 螢光紫
          accent: "#73952E", // 亮綠
          neutral: "#ec5182", // 螢光紅
          "base-100": "#272935", // 基底色
        },
      },
    ],
  },
};
