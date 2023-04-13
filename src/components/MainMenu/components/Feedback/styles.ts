import { SxProps, alpha } from '@mui/material';
import { grey } from '@mui/material/colors';

export const container: SxProps = {
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  width: 1,
  justifyContent: 'center',
};

export const feedback: SxProps = {
  background: alpha(grey[400], 0.3),
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  px: 0.5,
  display: 'flex',
  alignItems: 'center',
};
