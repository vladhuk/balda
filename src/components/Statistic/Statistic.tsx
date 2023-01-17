import { Box, Divider } from '@mui/material';
import { Coord } from 'helpers/coord';
import { NameAndScore } from 'components/Statistic/NameAndScore';
import { Player } from 'types/player.interface';
import { ScoreOrientation } from 'components/Statistic/enums/score-orientation.enum';
import { WordScore } from 'components/Statistic/components/WordScore';
import React, { Dispatch, FC } from 'react';

interface Props {
  player: Player;
  scoreOrientation: ScoreOrientation;
  active?: boolean;
  short?: boolean;
  setHighlightedCoords?: Dispatch<Coord[]>;
}

export const Statistic: FC<Props> = ({
  player,
  scoreOrientation,
  active,
  short,
  setHighlightedCoords = () => {},
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
      {player.words.map((word) => (
        <WordScore
          key={word.letters}
          word={word}
          scoreOrientation={scoreOrientation}
          setHighlightedCoords={setHighlightedCoords}
        />
      ))}
    </Box>
  );
};
