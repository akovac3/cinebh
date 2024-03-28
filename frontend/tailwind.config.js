/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Urbanist'],
        // Add more custom font families as needed
      },
    },
    colors: {
      'gray':'#1D2939',
      'white':'#FFFFFF',
      'darkRed':'#B22222',
      'border':'#667085',
      'shadow1':'#E4E7EC',
      'line':'#98A2B3',
      'lightGray':'#FCFCFD',
      'start':'rgba(26, 26, 26, 0.8)',
      'stop': 'rgba(178, 34, 34, 0.8)',
      'paleRed':'#FEF2F2',
      'dis':'#D0D5DD',
      'slider':'#F9FAFB',
      'sliderD':'#98A2B3',
      'yellow':'#FEF0C7',
      'green':'#D1FADF',
      'red':'#FEE4E2',
      'textGrey': '#344054',
      'textGreen': '#027A48',
      'textRed': '#B42318',
      'textYellow': '#B54708'
    }
  },
  plugins: [],
}

