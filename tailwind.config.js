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
        // bluemain: '#336799',
        bluemain: '#0339A6',
        bluebtn: '#3873C1',
        blueheader: '#729AC8',
        correct: '#0A7373',
        error: '#C43302',
        choice: '#D97904',
        login: '#BABCBF',
      },
      fontFamily: {
        sarabun: ['Sarabun', 'sans-serif'],
        mitr: ['Mitr', 'sans-serif'],
      },
      backgroundImage: {
        kmutt: "url('src/assets/kmutt.png')",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
//bluemain
