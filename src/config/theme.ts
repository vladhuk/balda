import { ThemeOptions, alpha, createTheme, darken } from '@mui/material';
import { green, grey } from '@mui/material/colors';

const initialTheme = createTheme({
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: '#4F8D90',
    },
    background: {
      default: alpha('#B4D5D7', 0.2),
    },
    text: {
      primary: grey[800],
    },
  },
});

export const theme = createTheme(initialTheme, {
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableTouchRipple: true,
      },
      styleOverrides: {
        sizeLarge: {
          fontWeight: 600,
          borderRadius: '10px',
          letterSpacing: 1.8,
        },
        sizeMedium: {
          fontWeight: 600,
          borderRadius: '10px',
          letterSpacing: 1.8,
        },
        contained: {
          position: 'relative',

          '&, &:hover': {
            boxShadow: 'none',
          },
          ':after': {
            position: 'absolute',
            content: '""',
            width: '100%',
            height: '100%',
            top: 4,
            zIndex: -1,
            borderRadius: '10px',
          },
          '&.Mui-disabled:after': {
            background: 'none',
          },
          ':active': {
            transform: 'translate(0, 4px)',

            ':after': {
              background: 'none',
            },
          },
        },
        containedPrimary: {
          color: initialTheme.palette.common.white,

          ':hover': {
            background: initialTheme.palette.primary.main,

            [initialTheme.breakpoints.up('md')]: {
              background: initialTheme.palette.primary.light,
            },
          },
          ':after': {
            background: initialTheme.palette.primary.dark,
          },
        },
        containedSecondary: {
          ':hover': {
            background: initialTheme.palette.secondary.main,

            [initialTheme.breakpoints.up('md')]: {
              background: initialTheme.palette.secondary.light,
            },
          },
          ':after': {
            background: initialTheme.palette.secondary.dark,
          },
        },
        containedError: {
          ':hover': {
            background: initialTheme.palette.error.main,

            [initialTheme.breakpoints.up('md')]: {
              background: initialTheme.palette.error.light,
            },
          },
          ':after': {
            background: darken(initialTheme.palette.error.dark, 0.1),
          },
        },
      },
    },
  },
} as ThemeOptions);
