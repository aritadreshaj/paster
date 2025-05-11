/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css", // Ensure styles are included
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', "sans-serif"],
      },
      fontSize: {
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
      },
      colors: {
        // Use your custom CSS variables defined in globals.css
        border: "var(--border)",                // Custom border color
        background: "var(--background)",        // Custom background color
        foreground: "var(--foreground)",        // Custom text color
        primary: "var(--primary)",              // Custom primary color
        "primary-foreground": "var(--primary-foreground)",  // Custom text on primary color
        secondary: "var(--secondary)",          // Custom secondary color
        "secondary-foreground": "var(--secondary-foreground)",  // Custom text on secondary color
        muted: "var(--muted)",                  // Muted color
        "muted-foreground": "var(--muted-foreground)",  // Muted text color
        accent: "var(--accent)",                // Accent color
        "accent-foreground": "var(--accent-foreground)",  // Accent text color
        destructive: "var(--destructive)",      // Destructive action color
        "destructive-foreground": "var(--destructive-foreground)",  // Destructive text color
        input: "var(--input)",                  // Input field color
        ring: "var(--ring)",                    // Ring color (focus ring)
      },
    },
  },
  safelist: [
    "bg-background",  // Safelist the custom background class
    "text-foreground", // Safelist the custom text class
  ],
  plugins: [],
};
