import { Coord } from 'helpers/coord';
import { Link, Typography } from '@mui/material';
import { ScoreOrientation } from 'components/Game/components/Statistic/enums/score-orientation.enum';
import { ScoreOrientationContainer } from 'components/Game/components/Statistic/styled';
import { Word } from 'types/word.interface';
import React, { Dispatch, FC, useState } from 'react';

interface Props {
  word: Word;
  scoreOrientation: ScoreOrientation;
  setHighlightedCoords: Dispatch<Coord[]>;
}

export const WordScoreList: FC<Props> = ({
  word,
  setHighlightedCoords,
  scoreOrientation,
}) => {
  const [highlightDelayTimeout, setHighlighDelayTimeout] =
    useState<NodeJS.Timeout | null>(null);

  return (
    <ScoreOrientationContainer
      key={word.letters}
      orientation={scoreOrientation}
    >
      <Link
        color="secondary.dark"
        target="_blank"
        href={`http://sum.in.ua/?swrd=${word.letters}`}
        onMouseEnter={() =>
          setHighlighDelayTimeout(
            setTimeout(() => setHighlightedCoords?.(word.coords), 100),
          )
        }
        onMouseLeave={() => {
          if (highlightDelayTimeout) {
            setHighlightedCoords?.([]);
            clearTimeout(highlightDelayTimeout);
          }
        }}
      >
        {word.letters}
      </Link>
      <Typography px={0.75}>{word.letters.length}</Typography>
    </ScoreOrientationContainer>
  );
};
