import { Actions } from 'components/Actions/Actions';
import { Box } from '@mui/material';
import { Cell } from 'types/cell.interface';
import { Coord } from 'helpers/coord';
import { Field } from 'components/Field/Field';
import { FinishTurnButton } from 'components/FinishTurnButton/FinishTurnButton';
import { InputError } from 'enums/error.enum';
import { LETTERS_SHAKING_DURATION, LETTER_ROTATING_DURATION } from 'contants';
import { ScoreOrientation } from 'components/Statistic/enums/score-orientation.enum';
import { SideSection } from 'components/styled';
import { Statistic } from 'components/Statistic/Statistic';
import { StatisticsButton } from 'components/StatisticsButton/StatisticsButton';
import { TopScores } from 'components/TopScores';
import { WordPreview } from 'components/WordPreview/WordPreview';
import { checkIsWordExist } from 'utils/word/check-is-word-exist';
import { getRandomWord } from 'utils/word/get-random-word';
import { getWordsFromPlayers, mapCellsToWord } from 'components/utils';
import { isEmpty, isNull } from 'lodash';
import { isNotNull } from 'utils/null/is-not-null';
import { useField } from 'hooks/use-field';
import { useInputError } from 'hooks/use-input-error';
import { useKeyboard } from 'hooks/use-keyboard';
import { usePlayers } from 'hooks/use-players';
import { useTimeout } from 'hooks/use-timeout';
import React, { FC, useMemo, useState } from 'react';

export const App: FC = () => {
  const initialWord = useMemo(() => getRandomWord(), []);

  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [enteredLetterCoord, setEnteredLetterCoord] = useState<Coord | null>(
    null,
  );
  const { players, turn, switchTurn, finishTurn } = usePlayers();
  const { error, setError, resetError } = useInputError();
  const { cells, setFieldCell } = useField(initialWord);
  const { isRunning: isLettersShaking, run: shakeLetters } = useTimeout(
    LETTERS_SHAKING_DURATION,
  );
  const { isRunning: isEnteredLetterRotating, run: rotateLetter } = useTimeout(
    LETTER_ROTATING_DURATION,
  );

  const lastSelected = selectedCells[selectedCells.length - 1];

  const blurActiveCell = () => {
    (document.activeElement as HTMLElement).blur();
  };

  const undo = () => {
    if (
      isNotNull(enteredLetterCoord) &&
      lastSelected?.coord.equals(enteredLetterCoord)
    ) {
      setFieldCell(enteredLetterCoord, '');
      setEnteredLetterCoord(null);
    }

    setSelectedCells((prev) => prev.slice(0, prev.length - 1));
    resetError();
    blurActiveCell();
  };

  const clearSelection = (options?: { keepEntered?: boolean }) => {
    setSelectedCells([]);
    resetError();

    if (isNull(enteredLetterCoord)) {
      return;
    }
    if (options?.keepEntered) {
      rotateLetter(() => setEnteredLetterCoord(null));
      return;
    }

    setFieldCell(enteredLetterCoord, '');
    setEnteredLetterCoord(null);
  };

  const handleError = (inputError: InputError) => {
    shakeLetters();
    setError(inputError);
  };

  const onCheckWord = () => {
    if (isNull(enteredLetterCoord) || isEmpty(lastSelected?.value)) {
      handleError(InputError.LETTER_NOT_ENTERED);
      return;
    }

    const word = mapCellsToWord(selectedCells);
    const usedWords = getWordsFromPlayers(players).concat(initialWord);

    if (usedWords.includes(word)) {
      handleError(InputError.WORD_HAS_BEEN_ALREADY_ENTERED);
      return;
    }
    if (!checkIsWordExist(word)) {
      handleError(InputError.WORD_DOES_NOT_EXIST);
      return;
    }

    finishTurn({
      letters: word,
      coords: selectedCells.map(({ coord }) => coord),
    });
    clearSelection({ keepEntered: true });
  };

  const skipTurn = () => {
    switchTurn();
    clearSelection();
  };

  useKeyboard({
    checkWord: onCheckWord,
    clearSelection,
    undo,
  });

  return (
    <Box
      minHeight="100vh"
      bgcolor="background.default"
      display="flex"
      justifyContent="center"
    >
      <SideSection stick="right">
        <Statistic
          player={players[0]}
          scoreOrientation={ScoreOrientation.RIGHT}
          active={turn === 0}
        />
      </SideSection>
      <Box display="flex" flexDirection="column" alignItems="center" pt={1.5}>
        <TopScores players={players} turn={turn} />
        <WordPreview
          enteredLetterCoord={enteredLetterCoord}
          selectedCells={selectedCells}
          error={error}
          lettersShaking={isLettersShaking}
        />
        <Field
          cells={cells}
          setFieldCell={setFieldCell}
          enteredLetterCoord={enteredLetterCoord}
          setEnteredLetterCoord={setEnteredLetterCoord}
          selectedCells={selectedCells}
          setSelectedCells={setSelectedCells}
          resetError={resetError}
          undo={undo}
          enteredLetterRotating={isEnteredLetterRotating}
        />
        <Actions
          clearSelection={clearSelection}
          skipTurn={skipTurn}
          undo={undo}
        />
        <StatisticsButton players={players} turn={turn} />
        <FinishTurnButton onClick={onCheckWord} />
      </Box>
      <SideSection stick="left">
        <Statistic
          player={players[1]}
          scoreOrientation={ScoreOrientation.LEFT}
          active={turn === 1}
        />
      </SideSection>
    </Box>
  );
};
