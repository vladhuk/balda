import isPropValid from '@emotion/is-prop-valid';
import { styled } from '@mui/material';

interface MainContainerProps {
  blur?: boolean;
}

export const MainContainer = styled('div', {
  shouldForwardProp: isPropValid,
})<MainContainerProps>(({ blur }) => ({
  minHeight: 625,
  height: '100%',
  filter: blur ? 'blur(5px)' : undefined,
}));
