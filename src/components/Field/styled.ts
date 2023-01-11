import { InputBase, alpha, styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';

interface FieldCellProps {
  translucent?: boolean;
  clickable?: boolean;
  lastSelected?: boolean;
  selected?: boolean;
  entered?: boolean;
}

export const FieldCell = styled(InputBase, {
  shouldForwardProp: (prop: string) => isPropValid(prop) || prop === 'inputRef',
})<FieldCellProps>(({ theme: { spacing, palette }, ...props }) => ({
  cursor: 'default',

  '& input': {
    cursor: 'default',
    padding: 0,
    margin: spacing(0.5),
    width: 64,
    height: 64,
    fontSize: 28,
    borderRadius: '10px',
    background: palette.action.disabledBackground,
    textAlign: 'center',
    transition: '.13s',
    fontWeight: 600,

    ...(props.translucent && {
      opacity: 0.4,
    }),
    ...(props.clickable && {
      cursor: 'pointer',

      '&:hover': {
        background: props.lastSelected
          ? alpha(palette.primary.main, 0.9)
          : alpha(palette.primary.light, 0.5),
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

      ...(props.entered && {
        background: palette.secondary.main,

        ...(props.lastSelected && {
          ':hover': {
            background: alpha(palette.secondary.main, 0.9),
          },
        }),
      }),
    }),
  },
}));
