import isPropValid from '@emotion/is-prop-valid';
import { styled, Typography } from '@mui/material';

interface LetterContainerProps {
  lettersShaking?: boolean;
  small?: boolean;
}

export const LetterContainer = styled('div')<LetterContainerProps>(
  ({ theme, lettersShaking, small }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    minWidth: small ? 35 : 45,

    ...(lettersShaking && {
      animation: 'shake 0.4s',
      animationIterationCount: 'infinite',
    }),

    '@keyframes shake': {
      '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
      '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
      '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
      '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
      '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
      '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
      '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
      '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
      '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
      '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
    },
  }),
);

interface LetterProps {
  small?: boolean;
  entered?: boolean;
}

export const Letter = styled(Typography, {
  shouldForwardProp: isPropValid,
})<LetterProps>(({ theme, small, entered }) => ({
  fontSize: small ? 28 : 36,
  lineHeight: 1.1,
  fontWeight: 600,
  color: entered ? theme.palette.secondary.main : theme.palette.text.primary,
}));
