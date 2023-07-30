import { Typography } from '@mui/material';
import { ScoreOrientation } from 'components/Game/components/Statistic/enums/score-orientation.enum';
import {
  Name,
  NameAndScoreOrientationContainer,
} from 'components/Game/components/Statistic/styled';
import * as styles from 'components/Game/components/Statistic/styles';
import { FC } from 'react';
import { Player } from 'types/player.interface';

interface Props {
  player: Player;
  scoreOrientation: ScoreOrientation;
  active?: boolean;
  short?: boolean;
}

export const NameAndScore: FC<Props> = ({
  player,
  scoreOrientation,
  active,
  short,
}) => {
  return (
    <NameAndScoreOrientationContainer
      orientation={scoreOrientation}
      active={active}
    >
      <Name variant={short ? 'caption' : 'h6'} small={short}>
        {player.name}
      </Name>
      <Typography sx={styles.score}>{player.score}</Typography>
    </NameAndScoreOrientationContainer>
  );
};
