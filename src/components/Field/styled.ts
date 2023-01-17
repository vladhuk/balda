import { InputBase, alpha, styled } from '@mui/material';
import { LETTER_ROTATING_DURATION } from 'contants';
import isPropValid from '@emotion/is-prop-valid';

interface FieldCellProps {
  translucent?: boolean;
  clickable?: boolean;
  lastSelected?: boolean;
  selected?: boolean;
  entered?: boolean;
  rotating?: boolean;
  highlighted?: boolean;
}

export const FieldCell = styled(InputBase, {
  shouldForwardProp: (prop: string) => isPropValid(prop) || prop === 'inputRef',
})<FieldCellProps>(({ theme: { palette, ...theme }, ...props }) => ({
  cursor: 'default',

  '& input': {
    cursor: 'default',
    padding: 0,
    margin: theme.spacing(0.5),
    width: 64,
    height: 64,
    fontSize: 28,
    borderRadius: '10px',
    background: palette.action.disabledBackground,
    textAlign: 'center',
    transition: '.2s',
    fontWeight: 600,
    boxSizing: 'border-box',

    ...(props.translucent && {
      opacity: 0.4,
    }),
    ...(props.clickable && {
      cursor: 'pointer',

      [theme.breakpoints.up('md')]: {
        '&:hover': {
          background: props.lastSelected
            ? alpha(palette.primary.main, 0.9)
            : alpha(palette.primary.light, 0.5),
        },
      },

      ...(!props.lastSelected && {
        '&:focus-visible': {
          background: alpha(palette.primary.light, 0.5),
        },
      }),
    }),
    ...(props.selected && {
      color: palette.common.white,
      background: palette.primary.main,
    }),
    ...(props.entered && {
      background: palette.secondary.main,

      ...(props.lastSelected && {
        [theme.breakpoints.up('md')]: {
          '&:hover': {
            background: alpha(palette.secondary.main, 0.9),
          },
        },
      }),
    }),
    ...(props.highlighted && {
      boxShadow: `0px 0px 5px 2px ${palette.primary.main}`,
      border: `2px solid ${palette.primary.main}`,
    }),
    ...(props.rotating && {
      animation: `rotate ${LETTER_ROTATING_DURATION}ms`,
      background: palette.secondary.main,
      color: palette.common.white,
    }),

    '@keyframes rotate': {
      '10%': { transform: 'rotateY(10deg)' },
      '15%': { transform: 'rotateY(20deg)' },
      '20%': { transform: 'rotateY(30deg)' },
      '25%': { transform: 'rotateY(40deg)' },
      '30%': { transform: 'rotateY(50deg)' },
      '35%': { transform: 'rotateY(60deg)' },
      '40%': { transform: 'rotateY(70deg)' },
      '45%': { transform: 'rotateY(80deg)' },
      '50%': {
        transform: 'rotateY(90deg)',
        background: palette.secondary.main,
        color: palette.common.white,
      },
      '55%': {
        transform: 'rotateY(80deg)',
        background: palette.action.disabledBackground,
        color: palette.text.primary,
      },
      '60%': { transform: 'rotateY(70deg)' },
      '65%': { transform: 'rotateY(60deg)' },
      '70%': { transform: 'rotateY(50deg)' },
      '75%': { transform: 'rotateY(40deg)' },
      '80%': { transform: 'rotateY(30deg)' },
      '85%': { transform: 'rotateY(20deg)' },
      '90%': { transform: 'rotateY(10deg)' },
      '100%': {
        transform: 'rotateY(0deg)',
        background: palette.action.disabledBackground,
        color: palette.text.primary,
      },
    },
  },
}));
