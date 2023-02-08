import { AccordionDetails as MuiAccordionDetails, styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';

interface Props {
  disablePaddingTop?: boolean;
}

export const AccordionDetails = styled(MuiAccordionDetails, {
  shouldForwardProp: isPropValid,
})<Props>(({ theme: { spacing, breakpoints }, ...props }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  gap: spacing(1),
  flexDirection: 'column',

  [breakpoints.up('md')]: {
    flexDirection: 'row',
  },
  ...(props.disablePaddingTop && {
    paddingTop: 0,
  }),
}));
