import isPropValid from '@emotion/is-prop-valid';
import { alpha, InputBase, styled } from '@mui/material';
import {
  LETTER_ROTATING_DURATION,
  LETTERS_ZOOM_DURATION,
} from 'components/Game/constants';

const LETTER_ROTATING_DURATION_ERROR_MS = 10;
const rotatingDuration =
  LETTER_ROTATING_DURATION + LETTER_ROTATING_DURATION_ERROR_MS;

interface FieldCellProps {
  translucent?: boolean;
  clickable?: boolean;
  lastSelected?: boolean;
  selected?: boolean;
  entered?: boolean;
  rotating?: boolean;
  highlighted?: boolean;
  zoomIn?: boolean;
  zoomOut?: boolean;
}

function getAnimation({
  rotating,
  zoomIn,
  zoomOut,
}: FieldCellProps): string | undefined {
  if (rotating) {
    return `rotateColor ${rotatingDuration}ms`;
  }
  if (zoomIn) {
    return `zoomIn ${LETTERS_ZOOM_DURATION}ms`;
  }
  if (zoomOut) {
    return `zoomOut ${LETTERS_ZOOM_DURATION}ms`;
  }

  return undefined;
}

export const FieldCell = styled(InputBase, {
  shouldForwardProp: (prop: string) => isPropValid(prop) || prop === 'inputRef',
})<FieldCellProps>(({ theme: { palette, ...theme }, ...props }) => ({
  cursor: 'default',
  display: 'block',
  margin: theme.spacing(0.5),

  '& input': {
    cursor: 'default',
    padding: 0,
    width: 64,
    height: 64,
    fontSize: 28,
    borderRadius: '10px',
    background: palette.action.disabledBackground,
    textAlign: 'center',
    transition: '.2s',
    fontWeight: 600,
    boxSizing: 'border-box',
    animation: getAnimation(props),

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

    '@keyframes rotateColor': {
      '0%': {
        background: palette.secondary.main,
        color: palette.common.white,
      },
      '50%': {
        background: palette.secondary.main,
        color: palette.common.white,
      },
      '51%': {
        background: palette.action.disabledBackground,
        color: palette.text.primary,
      },
      '100%': {
        background: palette.action.disabledBackground,
        color: palette.text.primary,
      },
    },
    '@keyframes zoomOut': {
      from: {
        fontSize: 28,
      },
      to: {
        fontSize: 0,
      },
    },
    '@keyframes zoomIn': {
      from: {
        fontSize: 0,
      },
      to: {
        fontSize: 28,
      },
    },
  },

  ...(props.rotating && {
    animation: `rotateCell ${rotatingDuration}ms`,
  }),
  '@keyframes rotateCell': {
    '51%': {
      transform: 'rotateY(90deg)',
    },
    to: {
      transform: 'rotateY(0deg)',
    },
  },
}));
