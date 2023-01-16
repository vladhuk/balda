import { Box, Divider, Typography } from '@mui/material';
import { NameAndScore } from 'components/Statistic/NameAndScore';
import { Player } from 'types/player.interface';
import { ScoreOrientation } from 'components/Statistic/enums/score-orientation.enum';
import { ScoreOrientationContainer } from 'components/Statistic/styled';
import React, { FC, Fragment } from 'react';

interface Props {
  player: Player;
  scoreOrientation: ScoreOrientation;
  active?: boolean;
  short?: boolean;
}

export const Statistic: FC<Props> = ({
  player,
  scoreOrientation,
  active,
  short,
}) => {
  return (
    <Box flexDirection="column" width={170}>
      <NameAndScore
        player={player}
        scoreOrientation={scoreOrientation}
        active={active}
        short={short}
      />
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
