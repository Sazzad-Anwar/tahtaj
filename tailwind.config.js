module.exports = {
  mode: 'jit',
  content: ['./*.html', './src/**/*.js'],
  important: true,
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
      'paste': '#00BFA5',
      'mediumBlue': '#4285F4',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#302D86',
      'secondary': '#00ACE1',
      'blurBg': '#00000078',
      'paste': '#00BFA5',
      'lightBlue': '#EAE9F3',
      'mediumBlue': '#4285F4',
      'mediumBlack': '#2F2F2F'
    }),
    borderColor: theme => ({
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'primary': '#302D86',
      'secondary': '#00ACE1',
      'tertiary': '#838383',
      'paste': '#00BFA5',
      'borderBlue': "#4285F4",
      'mediumBlack': '#2F2F2F'
    }),
    extend: {
      spacing: {
        '18': '4.75rem',
        '21': '5.375rem',
        '550': '34.3rem',
        '990': '61.8rem',
        '769': '48.06rem'
      }
    },
  },
  plugins: [],
}
