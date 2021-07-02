const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      'lg2': '1100px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Inter', 'serif'],
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    listStyleType: {
      none: 'none',

      disc: 'disc',

      decimal: 'decimal',

      roman: 'upper-roman'
    },
    extend: {
      ringWidth: {
        'DEFAULT': '2px',
        '6': '6px',
        '10': '10px',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: theme => ({
        'the-willy': "url('/head.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      }),
      colors: {
        gray: colors.coolGray,
        lightblue: colors.lightBlue,
        blue: colors.blue,
        red: colors.rose,
        pink: colors.pink,
        green: colors.lime,
        purple: colors.purple,
        darkblue: colors.indigo,
        amber: colors.amber,
        fuchsia: colors.fuchsia,
        moralis: '#c5fa00',
        'th-background': 'var(--background)',
        'th-background-secondary': 'var(--background-secondary)',
        'th-foreground': 'var(--foreground)',
        'th-primary-dark': 'var(--primary-dark)',
        'th-primary-medium': 'var(--primary-medium)',
        'th-primary-light': 'var(--primary-light)',

        'th-accent-dark': 'var(--accent-dark)',
        'th-accent-medium': 'var(--accent-medium)',
        'th-accent-light': 'var(--accent-light)',

        'th-accent-success': 'var(--accent-success)',
        'th-accent-success-light': 'var(--accent-success-light)',
        'th-accent-success-medium': 'var(--accent-success-medium)',
        'th-accent-success-dark': 'var(--accent-success-dark)',

        'th-accent-failure': 'var(--accent-failure)',
        'th-accent-failure-light': 'var(--accent-failure-light)',
        'th-accent-failure-medium': 'var(--accent-failure-medium)',
        'th-accent-failure-dark': 'var(--accent-failure-dark)',

        'th-accent-info': 'var(--accent-info)',
        'th-accent-info-light': 'var(--accent-info-light)',
        'th-accent-info-medium': 'var(--accent-info-medium)',
        'th-accent-info-dark': 'var(--accent-info-dark)',

        'th-accent-warning': 'var(--accent-warning)',
        'th-accent-warning-light': 'var(--accent-warning-light)',
        'th-accent-warning-medium': 'var(--accent-warning-medium)',
        'th-accent-warning-dark': 'var(--accent-warning-dark)',

        'th-accent-moralis': 'var(--accent-moralis)',

      },

    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
