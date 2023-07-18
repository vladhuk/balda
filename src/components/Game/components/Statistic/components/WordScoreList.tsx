import { Coord } from 'helpers/coord';
import { Dispatch, FC, useState } from 'react';
import { Link, Typography } from '@mui/material';
import { Locale } from 'enums/locale.enum';
import { ScoreOrientation } from 'components/Game/components/Statistic/enums/score-orientation.enum';
import { ScoreOrientationContainer } from 'components/Game/components/Statistic/styled';
import { Word } from 'types/word.interface';
import { useLocale } from 'lib/i18next/hooks/use-locale';

const dictionaryLinks: Record<Locale, string> = {
  [Locale.UK]:
    'https://goroh.pp.ua/%D0%A2%D0%BB%D1%83%D0%BC%D0%B0%D1%87%D0%B5%D0%BD%D0%BD%D1%8F',
  [Locale.EN]: 'https://dictionary.cambridge.org/dictionary/english',
};

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
  const locale = useLocale();
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
        href={`${dictionaryLinks[locale]}/${word.letters}`}
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
