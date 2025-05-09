// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px", // ✅ Custom breakpoint works now
      },
    },
  },
  plugins: [],
};
