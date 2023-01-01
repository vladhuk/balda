import { alpha, createTheme } from '@mui/material';
import { green, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: '#4F8D90',
    },
    background: {
      default: alpha('#B4D5D7', 0.2),
    },
    text: {
      primary: grey[800],
    },
  },
});
