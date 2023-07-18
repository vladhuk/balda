import { createTheme, darken, responsiveFontSizes } from '@mui/material';
import { green, grey } from '@mui/material/colors';

export const PAPER_BORDER_RADIUS = 14;

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: green[400],
      },
      secondary: {
        main: '#4f8d90',
      },
      background: {
        default: '#e4eff1',
      },
      text: {
        primary: grey[800],
      },
    },
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
          contained: ({ theme: { palette } }) => ({
            position: 'relative',

            '&, &:hover': {
              boxShadow: 'none',
            },
            ':after': {
              position: 'absolute',
              content: '""',
              width: '100%',
              height: '100%',
              left: 0,
              top: 4,
              zIndex: -1,
              borderRadius: '10px',
            },
            '&.Mui-disabled, &.Mui-disabled:hover': {
              background: '#c8d2d4',
            },
            '&.Mui-disabled:after': {
              background: palette.text.disabled,
            },
            ':active': {
              transform: 'translate(0, 4px)',

              ':after': {
                background: 'none',
              },
            },
          }),
          containedPrimary: ({ theme: { palette, breakpoints } }) => ({
            color: palette.common.white,

            ':hover': {
              background: palette.primary.main,

              [breakpoints.up('md')]: {
                background: palette.primary.light,
              },
            },
            ':after': {
              background: palette.primary.dark,
            },
          }),
          containedSecondary: ({ theme: { palette, breakpoints } }) => ({
            ':hover': {
              background: palette.secondary.main,

              [breakpoints.up('md')]: {
                background: palette.secondary.light,
              },
            },
            ':after': {
              background: palette.secondary.dark,
            },
          }),
          containedError: ({ theme: { palette, breakpoints } }) => ({
            ':hover': {
              background: palette.error.main,

              [breakpoints.up('md')]: {
                background: palette.error.light,
              },
            },
            ':after': {
              background: darken(palette.error.dark, 0.1),
            },
          }),
        },
      },
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: ({ theme: { palette } }) => ({
            border: `3px solid ${palette.divider}`,

            ':before': {
              height: 0,
            },
          }),
          rounded: {
            '&, &:first-of-type, &:last-of-type': {
              borderRadius: '12px',
            },
          },
        },
      },
      MuiSelect: {
        variants: [
          {
            props: { variant: 'outlined' },
            style: ({ theme: { palette } }) => ({
              '& .MuiOutlinedInput-notchedOutline': {
                border: `2px solid ${palette.divider}`,
                borderRadius: '10px',
                transition: `.1s`,
              },
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: palette.primary.main,
                },
              },
            }),
          },
        ],
      },
      MuiList: {
        styleOverrides: {
          root: ({ theme: { spacing } }) => ({
            padding: spacing(1),

            '& li:not(:last-child)': {
              marginBottom: spacing(0.5),
            },
          }),
        },
      },
      MuiMenuItem: {
        defaultProps: {},
        styleOverrides: {
          root: ({ theme: { palette, spacing } }) => ({
            padding: spacing(1.5, 2),

            '&.Mui-selected, &:hover': {
              borderRadius: '10px',
            },
            '&.Mui-selected *': {
              color: palette.primary.main,
            },
          }),
        },
      },
      MuiPaper: {
        variants: [
          {
            props: { square: false },
            style: {
              borderRadius: PAPER_BORDER_RADIUS,
            },
          },
        ],
      },
    },
  }),
);
