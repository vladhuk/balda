import * as styles from 'components/Statistic/styles';
import {
  Name,
  NameAndScoreOrientationContainer,
} from 'components/Statistic/styled';
import { Player } from 'types/player.interface';
import { ScoreOrientation } from 'components/Statistic/enums/score-orientation.enum';
import { Typography } from '@mui/material';
import React, { FC } from 'react';

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
