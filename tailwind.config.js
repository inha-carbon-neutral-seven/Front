/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      maxWidth: {
        "1/3": "30%",
        "2/3": "70%",
      },
      colors: {
        "beaver-yellow": "#F3c937",
        "beaver-brown": "#7B533E",
        "beaver-lightbrown": "#BFA588",
        "beaver-godong": "#604847",
        "beaver-redbrown": "#552723",
        "beaver-1": "#D8BBB9",
        "beaver-2": "#E09582",
        "beaver-3": "#D3E3EF",
      },
      backgroundImage: {
        "beaver-bg": "url('/src/image/bg.png')",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      DEFAULT: "4px",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".blink": {
          animation: "blink 1s 5",
        },
        "@keyframes blink": {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
        },
      });
    },
  ],
};
