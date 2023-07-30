import { styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const Puller = styled('div')({
  width: 40,
  height: 5,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 20px)',
});
