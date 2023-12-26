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
        bluemain: '#336799',
        bluebtn: '#3873C1',
        blueheader: '#729AC8',
      },
      fontFamily: {
        'sarabun': ['Sarabun', 'sans-serif']
      },
      backgroundImage: {
        kmutt: "url('src/assets/kmutt.png')",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
  
}
//bluemain