/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          500: "#D4AF37", // Main golden color
          600: "#866913", // Hover effect (darker shade)
          700: "#ad8a1f",
        },
      },
      container: {
        center: true, // Centers the container
        padding: "1rem", // Add padding to the sides
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [],
};
