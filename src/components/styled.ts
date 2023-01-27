import { styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';

interface MainContainerProps {
  blur?: boolean;
}

export const MainContainer = styled('div', {
  shouldForwardProp: isPropValid,
})<MainContainerProps>(({ theme: { palette }, blur }) => ({
  minHeight: 625,
  height: '100%',
  background: palette.background.default,
  filter: blur ? 'blur(5px)' : undefined,
}));
