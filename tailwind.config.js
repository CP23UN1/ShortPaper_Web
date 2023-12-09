/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        S01: '#336799',
      },
      backgroundImage: {
        kmutt: "url('src/assets/kmutt.png')",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
