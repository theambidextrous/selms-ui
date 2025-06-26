/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '0.5': '0.5px',
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
    colors: {
      transparent: 'transparent',
      'danger': {
        700: '#ff3333',
      },
      'white': '#ffffff',
      'black': '#000000',
      'selm-bg': '#121212',
      'selm-border': '#2A2A2A',
      'yellow': '#eab308'
    },
  },
  plugins: [],
}

