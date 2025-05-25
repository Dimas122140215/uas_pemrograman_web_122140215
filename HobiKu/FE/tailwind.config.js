/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        // Define your custom blue palette here
        primary: '#007BFF',     // Light Blue
        secondary: '#003f8a',   // Darker Blue
        background: '#ffffff',
        lightBlue: '#e6f0ff',
      },
    },
  },
  plugins: [],
}