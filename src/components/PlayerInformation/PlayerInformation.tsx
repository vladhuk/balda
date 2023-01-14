import * as styles from 'components/PlayerInformation/styles';
import { Box, Divider, Typography } from '@mui/material';
import {
  NameScoreOrientationContainer,
  ScoreOrientationContainer,
} from 'components/PlayerInformation/styled';
import { Player } from 'types/player.interface';
import { ScoreOrientation } from 'components/PlayerInformation/enums/score-orientation.enum';
import React, { FC, Fragment } from 'react';

interface Props {
  player: Player;
  scoreOrientation: ScoreOrientation;
  active?: boolean;
}

export const PlayerInformation: FC<Props> = ({
  player,
  scoreOrientation,
  active,
}) => {
  return (
    <Box flexDirection="column" width={170}>
      <NameScoreOrientationContainer
        orientation={scoreOrientation}
        active={active}
      >
        <Typography variant="h6" sx={styles.name}>
          {player.name}
        </Typography>
        <Typography sx={styles.score}>{player.score}</Typography>
      </NameScoreOrientationContainer>
      <Divider sx={{ mt: 0.5, mb: 1.5 }} />
      {player.words.map(({ letters }) => (
        <Fragment key={letters}>
          <ScoreOrientationContainer orientation={scoreOrientation}>
            <Typography>{letters.toLocaleLowerCase()}</Typography>
            <Typography px={0.75}>{letters.length}</Typography>
          </ScoreOrientationContainer>
        </Fragment>
      ))}
    </Box>
  );
};
