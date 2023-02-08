import { Typography, styled } from '@mui/material';

export const ControlsDescription = styled(Typography)(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',

    ':not(:last-of-type)': {
      marginBottom: spacing(1),
    },
    '& img:last-of-type': {
      marginRight: spacing(0.5),
    },
    '& img:not(:first-of-type)': {
      marginLeft: spacing(0.5),
    },
  }),
);
