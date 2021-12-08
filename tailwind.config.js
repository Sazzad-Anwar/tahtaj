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
      'paste': '#00BFA5'
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#302D86',
      'secondary': '#00ACE1',
      'blurBg': '#00000078',
      'paste': '#00BFA5',
      'lightBlue': '#EAE9F3'
    }),
    borderColor: theme => ({
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'primary': '#302D86',
      'secondary': '#00ACE1',
      'tertiary': '#838383',
      'paste': '#00BFA5'
    }),
    extend: {
      spacing: {
        '550': '34.3rem',
        '990': '61.8rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
