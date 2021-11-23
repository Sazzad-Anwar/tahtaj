module.exports = {
  // mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '2rem',
        '2xl': '0rem',
      },
    },
    textColor: theme => ({
      ...theme('colors'),
      'primary': '#302D86',
      'secondary': '#00ACE1',
      'tertiary': '#838383',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#302D86',
      'secondary': '#00ACE1'
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}