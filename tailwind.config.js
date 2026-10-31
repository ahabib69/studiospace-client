/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: { fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] } },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        studioDark: {
          primary: "#e9ae72",
          "primary-content": "#20170f",
          secondary: "#aeab9f",
          accent: "#e9ae72",
          neutral: "#272822",
          "base-100": "#151713",
          "base-200": "#1d1f1a",
          "base-300": "#34372f",
          "base-content": "#eeeee5",
          info: "#92b8da",
          success: "#a5c89d",
          warning: "#e9ae72",
          error: "#e99a8d",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.4rem",
        },
        studioLight: {
          primary: "#9c5728",
          "primary-content": "#ffffff",
          secondary: "#625f55",
          accent: "#9c5728",
          neutral: "#34372f",
          "base-100": "#f8f7f2",
          "base-200": "#eeeee5",
          "base-300": "#d7d8ce",
          "base-content": "#23261f",
          info: "#315e85",
          success: "#416c38",
          warning: "#9c5728",
          error: "#aa3830",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.4rem",
        },
      },
    ],
  },
};
