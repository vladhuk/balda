import { Actions } from 'components/Actions/Actions';
import { Box, Typography } from '@mui/material';
import { Cell } from 'types/cell.interface';
import { Coord } from 'helpers/coord';
import { Field } from 'components/Field/Field';
import { FinishTurnButton } from 'components/FinishTurnButton/FinishTurnButton';
import { InputError } from 'enums/error.enum';
import { Key } from 'enums/key.enum';
import { LETTERS_SHAKING_DURATION, LETTER_ROTATING_DURATION } from 'contants';
import { WordPreview } from 'components/WordPreview/WordPreview';
import { checkIsWordExist } from 'utils/word/check-is-word-exist';
import { isEmpty, isNull } from 'lodash';
import { isNotNull } from 'utils/null/is-not-null';
import { useField } from 'hooks/use-field';
import { useInputError } from 'hooks/use-input-error';
import { useOnKeyDown } from 'hooks/use-on-key-down';
import { useTimeout } from 'hooks/use-timeout';
import React, { FC, useState } from 'react';

export const App: FC = () => {
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [enteredLetterCoord, setEnteredLetterCoord] = useState<Coord | null>(
    null,
  );

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [turn, setTurn] = useState<0 | 1>(0);

  const { error, setError, resetError } = useInputError();
  const { cells, setFieldCell } = useField();
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

  const switchTurn = () => setTurn((prev) => (prev === 0 ? 1 : 0));

  const onCheckWord = () => {
    if (isNull(enteredLetterCoord) || isEmpty(lastSelected?.value)) {
      setError(InputError.LETTER_NOT_ENTERED);
      shakeLetters();
      return;
    }

    const word = selectedCells.map(({ value }) => value).join('');
    const isWordExist = checkIsWordExist(word);

    if (isWordExist) {
      const setScore = turn === 0 ? setScore1 : setScore2;

      setScore((prev) => prev + word.length);
      switchTurn();
      clearSelection({ keepEntered: true });
      return;
    }

    setError(InputError.WORD_DOES_NOT_EXIST);
    shakeLetters();
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
    <Box height="100vh" bgcolor="background.default">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" width={360} justifyContent="space-between" mt={1}>
          <Typography
            variant="h4"
            fontWeight={900}
            color={({ palette }) =>
              turn === 0 ? palette.primary.main : palette.text.disabled
            }
          >
            {score1}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={900}
            color={({ palette }) =>
              turn === 1 ? palette.primary.main : palette.text.disabled
            }
          >
            {score2}
          </Typography>
        </Box>
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
        <FinishTurnButton onClick={onCheckWord} />
      </Box>
    </Box>
  );
};
