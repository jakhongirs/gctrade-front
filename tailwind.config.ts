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
      screens: {
        xs: '400px',
      },
      colors: {
        primary: '#1576B5',
        dark_blue: '#0A639C',
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
