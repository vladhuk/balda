import { Box, Divider } from '@mui/material';
import { WordScoreList } from 'components/Game/components/Statistic/components/WordScoreList';
import { ScoreOrientation } from 'components/Game/components/Statistic/enums/score-orientation.enum';
import { NameAndScore } from 'components/Game/components/Statistic/NameAndScore';
import { Coord } from 'helpers/coord';
import { Dispatch, FC } from 'react';
import { Player } from 'types/player.interface';

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
        <WordScoreList
          key={word.letters}
          word={word}
          scoreOrientation={scoreOrientation}
          setHighlightedCoords={setHighlightedCoords}
        />
      ))}
    </Box>
  );
};
