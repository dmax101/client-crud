/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        "safra-primary": {
          900: "#002C37",
          700: "#0A4A5B",
          500: "#00586F",
          300: "#11728B",
          100: "#7FABB7",
        },
        "safra-secondary": {
          900: "#7A6019",
          500: "#F5C132",
          100: "#FBE6AD",
        },
        "safra-success": {
          900: "#225230",
          500: "#44A45F",
          100: "#DAEDDF",
        },
        "safra-warning": {
          900: "#736A11",
          500: "#E6D422",
          100: "#FAF6D3",
        },
        "safra-danger": {
          900: "#730C1F",
          500: "#E6173E",
          100: "#FAD1D8",
        },
        "safra-info": {
          900: "#1E536B",
          500: "#3CA6D6",
          100: "#D8EDF7",
        },
        "safra-neutral": {
          900: "#1A1A1A",
          700: "#4F4F4F",
          500: "#9E9E9E",
          300: "#D8D8D8",
          100: "#EDEDED",
          50: "#F9F9F9",
        },
      },
    },
  },
  plugins: [],
};
