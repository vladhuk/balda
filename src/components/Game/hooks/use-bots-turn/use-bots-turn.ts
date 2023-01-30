import { Cell } from 'types/cell.interface';
import { Coord } from 'helpers/coord';
import { Difficulty } from 'enums/difficulty.enum';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { LETTER_SELECTION_DELAY_FOR_BOT } from 'components/Game/constants';
import { Word, deserialize as deserializeWord } from 'types/word.interface';
import { getWordByDifficulty } from 'components/Game/hooks/use-bots-turn/utils/get-words-by-difficulty';
import { isNotEmpty } from 'utils/null/is-not-empty';
import { isUndefined } from 'lodash';

export function useBotsTurn({
  onFinishTurn,
  cells,
  usedWords,
  setSelectedCells,
  setEnteredLetterCoord,
  setFieldCell,
  isBotsTurn,
  difficulty,
  endGame,
}: {
  onFinishTurn: () => void;
  cells: Cell[][];
  usedWords: string[];
  setSelectedCells: Dispatch<SetStateAction<Cell[]>>;
  setEnteredLetterCoord: Dispatch<SetStateAction<Coord | null>>;
  setFieldCell: (coord: Coord, value: string) => void;
  isBotsTurn: boolean;
  difficulty: Difficulty;
  endGame: () => void;
}): void {
  const getAvailableWordsWorker = useMemo(
    () =>
      new Worker(
        new URL('./workers/get-available-words.worker', import.meta.url),
      ),
    [],
  );
  const [shouldBotFinishTurn, setShouldBotFinishTurn] = useState(false);

  const selectWord = (word: Word, onFinish?: () => void) => {
    word.coords.forEach((coord, i, arr) => {
      const cell = cells[coord.y][coord.x];
      const letter = word.letters.charAt(i).toUpperCase();

      setTimeout(() => {
        if (i === arr.length - 1) {
          onFinish?.();
        }
        if (isNotEmpty(cell.value)) {
          setSelectedCells((prevCells) => [...prevCells, cell]);
          return;
        }
        setEnteredLetterCoord(coord);
        setFieldCell(coord, letter);
        setSelectedCells((prevCells) => [
          ...prevCells,
          { ...cell, value: letter },
        ]);
      }, (i + 1) * LETTER_SELECTION_DELAY_FOR_BOT);
    });
  };

  useEffect(() => {
    if (!isBotsTurn) {
      return;
    }

    getAvailableWordsWorker.postMessage({
      cells,
      excludedWords: usedWords,
    });
    getAvailableWordsWorker.onmessage = ({ data }: { data: Word[] }) => {
      const words = data.map(deserializeWord);
      const word = getWordByDifficulty(words, difficulty);

      if (isUndefined(word)) {
        endGame();
        return;
      }

      selectWord(word, () =>
        setTimeout(() => {
          setShouldBotFinishTurn(true);
        }, LETTER_SELECTION_DELAY_FOR_BOT),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBotsTurn]);

  useEffect(() => {
    if (shouldBotFinishTurn) {
      onFinishTurn();
      setShouldBotFinishTurn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldBotFinishTurn]);
}
