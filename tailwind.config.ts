/** @type {import('tailwindcss').Config} */
import { Config } from 'tailwindcss'

export default <Partial<Config>>{
  mode: 'jit',
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      screens: ['1200px'],
      colors: {
        blue: {
          DEFAULT: '#1A77F9',
          rgba05: 'rgba(26, 119, 249, 0.05)',
          100: '#EEF5FF',
          200: '#D1E4FE',
          300: '#A8CDFF',
          400: '#4892FA',
          500: '#245CAB',
          600: '#040E19',
          700: '#E1EAF7',
          800: '#005AD7',
        },
        facebook: '#3B5998',
        twitter: '#00ACEE',
        telegram: '#0088CC',
        linkedin: '#0E76A8',
        reddit: '#FF4500',
        dark: {
          DEFAULT: '#040E1A',
          100: '#383838',
          400: '#001334',
          500: '#0C2037',
        },
        white: {
          DEFAULT: '#FFFFFF',
          100: '#F7F8FA',
          200: '#FBFDFF',
        },
        gray: {
          DEFAULT: '#CDCDD0',
          100: '#D5D8DC',
          200: '#F6F6F6',
          300: '#D0CCC0',
          400: '#82888E',
          500: '#F2F3F5',
          600: '#6F6F6F',
        },
        red: {
          DEFAULT: '#F93943',
          300: '#B44437',
        },
        yellow: {
          DEFAULT: '#FFAE03',
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #1295D2 0%, #2164A6 100%)',
      },
      fontFamily: {
        sans: ['TT Interfaces', 'sans-serif'],
      },
      fontSize: {
        '1.5xl': '1.5rem',
        '4.2xl': '2.375rem',
        '2.5xl': '1.75rem',
        '3.5xl': '2rem',
      },
      maxWidth: {
        '40': '200px',
        '60': '300px',
      },
      lineHeight: {
        '46': '46px',
        '34': '34px',
        '28': '28px',
      },
      width: {
        '25': '100px',
        '50': '200px',
      },
      height: {
        '25': '100px',
        '12.5': '50px',
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1130px',
        '2xl': '1274px',
      },
    },
  },
  plugins: [],
}
