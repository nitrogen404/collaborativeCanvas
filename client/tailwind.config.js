/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx, ts, tsx}", 
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Inter', 'san-serif']
      }
    },
  },
  plugins: [],
};


