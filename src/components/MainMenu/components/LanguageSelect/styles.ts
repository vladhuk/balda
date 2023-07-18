import { PAPER_BORDER_RADIUS } from 'config/theme';
import { SxProps, Theme } from '@mui/material';

export const select: SxProps<Theme> = ({ breakpoints }) => ({
  position: 'absolute',
  right: [0, 32],
  top: [0, 24],

  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
  },

  [breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: `5px ${PAPER_BORDER_RADIUS}px 5px 10px`,
    },
  },
});
