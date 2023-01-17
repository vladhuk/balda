import { Coord } from 'helpers/coord';
import { ScoreOrientation } from 'components/Statistic/enums/score-orientation.enum';
import { ScoreOrientationContainer } from 'components/Statistic/styled';
import { Typography } from '@mui/material';
import { Word } from 'types/word.interface';
import React, { Dispatch, FC, useState } from 'react';

interface Props {
  word: Word;
  scoreOrientation: ScoreOrientation;
  setHighlightedCoords: Dispatch<Coord[]>;
}

export const WordScore: FC<Props> = ({
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
      <Typography>{word.letters.toLocaleLowerCase()}</Typography>
      <Typography px={0.75}>{word.letters.length}</Typography>
    </ScoreOrientationContainer>
  );
};
