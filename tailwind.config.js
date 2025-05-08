export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px", // ✅ Custom breakpoint
      },
    },
  },
  plugins: [],
};
