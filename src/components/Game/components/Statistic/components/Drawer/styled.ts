import { grey } from '@mui/material/colors';
import { styled } from '@mui/material';

export const Puller = styled('div')({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
});
