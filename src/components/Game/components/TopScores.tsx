import { Box } from '@mui/material';
import { ScoreOrientation } from 'components/Game/components/Statistic/enums/score-orientation.enum';
import { NameAndScore } from 'components/Game/components/Statistic/NameAndScore';
import { FC } from 'react';
import { Player } from 'types/player.interface';

interface Props {
  players: Player[];
  turn: number;
}

export const TopScores: FC<Props> = ({ players, turn }) => {
  return (
    <Box
      display={{ xs: 'flex', md: 'none' }}
      width={352}
      justifyContent="space-between"
    >
      <NameAndScore
        player={players[0]}
        active={turn === 0}
        scoreOrientation={ScoreOrientation.LEFT}
        short
      />
      <NameAndScore
        player={players[1]}
        active={turn === 1}
        scoreOrientation={ScoreOrientation.RIGHT}
        short
      />
    </Box>
  );
};
