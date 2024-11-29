/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/host/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/host/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        Mulish: ["Mulish", "sans-serif"],
      },
      colors: {
        primary: {
          baseRed: "#9E7B74",
          baseGray: "#828282",
          textRed: "#9E7B74",
          textGray: "#828282",
          lightGrey: "#F3F3F3",
          mediumGrey: "#71717A",
          lightRed: "#FF67643B",
          mediumRed: "#B45309",
          baseGreen: "#24BE8B",
          lightBlack: "#333333",
          grayPlaceholder: "#CECECE",
          borderGray: "#E7E7E7"
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.bg-custom-gradient-1': {
          background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.37) 0%, rgba(255, 255, 255, 0.37) 100%), radial-gradient(50% 50% at 50% 50%, #FFF 0%, rgba(255, 255, 255, 0.00) 100%), #D1D6DA',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  // prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
}

