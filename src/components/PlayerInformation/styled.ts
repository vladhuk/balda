import { ScoreOrientation } from 'components/PlayerInformation/enums/score-orientation.enum';
import { styled } from '@mui/material';
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
}));

interface NameScoreOrientationContainerProps {
  active?: boolean;
}

export const NameScoreOrientationContainer = styled(ScoreOrientationContainer, {
  shouldForwardProp: isPropValid,
})<NameScoreOrientationContainerProps>(({ theme: { palette }, active }) => ({
  alignItems: 'flex-end',
  color: active ? palette.primary.main : palette.text.disabled,
}));
