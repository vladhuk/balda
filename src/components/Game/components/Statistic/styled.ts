import { ScoreOrientation } from 'components/Game/components/Statistic/enums/score-orientation.enum';
import { Typography, styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';

interface ScoreOrientationContainerProps {
  orientation: ScoreOrientation;
}

export const ScoreOrientationContainer = styled(
  'div',
)<ScoreOrientationContainerProps>(({ orientation }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: orientation === ScoreOrientation.RIGHT ? 'row' : 'row-reverse',
  cursor: 'pointer',
}));

interface NameScoreOrientationContainerProps {
  active?: boolean;
}

export const NameAndScoreOrientationContainer = styled(
  ScoreOrientationContainer,
  {
    shouldForwardProp: isPropValid,
  },
)<NameScoreOrientationContainerProps>(({ theme: { palette }, active }) => ({
  alignItems: 'baseline',
  color: active ? palette.primary.main : palette.text.disabled,
  cursor: 'auto',
}));

interface NameProps {
  small?: boolean;
}

export const Name = styled(Typography, {
  shouldForwardProp: (prop: string) => isPropValid(prop) || prop === 'variant',
})<NameProps>(({ theme: { spacing }, small }) => ({
  fontWeight: small ? 500 : 600,
  margin: spacing(0, small ? 1 : 0),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));
