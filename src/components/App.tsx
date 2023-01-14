import { Actions } from 'components/Actions/Actions';
import { Box } from '@mui/material';
import { Cell } from 'types/cell.interface';
import { Coord } from 'helpers/coord';
import { Field } from 'components/Field/Field';
import { FinishTurnButton } from 'components/FinishTurnButton/FinishTurnButton';
import { InputError } from 'enums/error.enum';
import { Key } from 'enums/key.enum';
import { LETTERS_SHAKING_DURATION, LETTER_ROTATING_DURATION } from 'contants';
import { PlayerInformation } from 'components/PlayerInformation/PlayerInformation';
import { ScoreOrientation } from 'components/PlayerInformation/enums/score-orientation.enum';
import { WordPreview } from 'components/WordPreview/WordPreview';
import { checkIsWordExist } from 'utils/word/check-is-word-exist';
import { getRandomWord } from 'utils/word/get-random-word';
import { isEmpty, isNull } from 'lodash';
import { isNotNull } from 'utils/null/is-not-null';
import { useField } from 'hooks/use-field';
import { useInputError } from 'hooks/use-input-error';
import { useOnKeyDown } from 'hooks/use-on-key-down';
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

    const word = selectedCells
      .map(({ value }) => value)
      .join('')
      .toLowerCase();
    const usedWords = players
      .flatMap(({ words }) => words.map(({ letters }) => letters))
      .concat(initialWord);

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

  useOnKeyDown({
    keys: [Key.ENTER],
    callback: onCheckWord,
  });
  useOnKeyDown({
    keys: [Key.BACKSPACE],
    callback: undo,
  });
  useOnKeyDown({
    keys: [Key.ESCAPE],
    callback: () => clearSelection(),
  });

  return (
    <Box
      minHeight="100vh"
      bgcolor="background.default"
      display="flex"
      justifyContent="center"
    >
      <Box
        flex={1}
        display={{ xs: 'none', md: 'flex' }}
        pr={12}
        justifyContent="end"
        pt={1.5}
      >
        <PlayerInformation
          player={players[0]}
          scoreOrientation={ScoreOrientation.RIGHT}
          active={turn === 0}
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" pt={1.5}>
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
        <Box
          display={{ xs: 'flex', md: 'none' }}
          justifyContent="space-between"
          width={352}
          mt={2}
          mb={8}
        >
          <PlayerInformation
            player={players[0]}
            scoreOrientation={ScoreOrientation.LEFT}
            active={turn === 0}
          />
          <PlayerInformation
            player={players[1]}
            scoreOrientation={ScoreOrientation.RIGHT}
            active={turn === 1}
          />
        </Box>
        <FinishTurnButton onClick={onCheckWord} />
      </Box>
      <Box
        flex={1}
        display={{ xs: 'none', md: 'flex' }}
        pl={12}
        justifyContent="start"
        pt={1.5}
      >
        <PlayerInformation
          player={players[1]}
          scoreOrientation={ScoreOrientation.LEFT}
          active={turn === 1}
        />
      </Box>
    </Box>
  );
};
