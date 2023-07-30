import { SxProps } from '@mui/material';
import { PAPER_BORDER_RADIUS } from 'config/theme';

/**
 * It is a workaround to avoid adding a border radius to specific corners,
 * that affects drawer performance.
 */
export const paper: SxProps = {
  height: `calc(60% + ${PAPER_BORDER_RADIUS}px)`,
  bottom: -PAPER_BORDER_RADIUS,
  paddingBottom: `${PAPER_BORDER_RADIUS}px`,
};
