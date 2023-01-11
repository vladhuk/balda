import { ActionsDialog } from 'components/ActionsDialog';
import { Box, Button, Typography } from '@mui/material';
import { Cell } from 'types/cell.interface';
import { Coord } from 'helpers/coord';
import { FIELD_SIZE } from 'contants';
import { Field } from 'components/Field/Field';
import { FinishTurnButton } from 'components/FinishTurnButton/FinishTurnButton';
import { InputError } from 'enums/error.enum';
import { Key } from 'enums/key.enum';
import { WordPreview } from 'components/WordPreview/WordPreview';
import { checkIsWordExist } from 'utils/word/check-is-word-exist';
import { createTable } from 'utils/cell/create-table';
import { getRandomWord } from 'utils/word/get-random-word';
import { isEmpty, isNull } from 'lodash';
import { isNotNull } from 'utils/null/is-not-null';
import { useLettersShaking } from 'hooks/use-letters-shaking';
import { useOnKeyDown } from 'hooks/use-on-key-down';
import BackspaceIcon from '@mui/icons-material/Backspace';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { FC, useState } from 'react';

export const App: FC = () => {
  const [cells, setCells] = useState(createTable(FIELD_SIZE, getRandomWord()));
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [enteredLetterCoord, setEnteredLetterCoord] = useState<Coord | null>(
    null,
  );
  const [inputError, setInputError] = useState(InputError.NONE);
  const [isActionsDialogOpened, setIsActionsDialogOpened] = useState(false);

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [turn, setTurn] = useState<0 | 1>(0);

  const { isLettersShaking, shakeLetters } = useLettersShaking();

  const lastSelected = selectedCells[selectedCells.length - 1];

  const setTableCell = (coord: Coord, value: string) => {
    setCells((prevCells) =>
      prevCells.map((row, y) =>
        row.map((cell, x) => {
          if (y === coord.y && x === coord.x) {
            return { ...cell, value };
          }
          return cell;
        }),
      ),
    );
  };

  const resetError = () => setInputError(InputError.NONE);

  const undo = () => {
    if (
      isNotNull(enteredLetterCoord) &&
      lastSelected?.coord.equals(enteredLetterCoord)
    ) {
      setTableCell(enteredLetterCoord, '');
      setEnteredLetterCoord(null);
    }

    setSelectedCells((prev) => prev.slice(0, prev.length - 1));
    resetError();
    (document.activeElement as HTMLElement).blur();
  };

  const clearSelection = (options?: { saveEntered?: boolean }) => {
    setSelectedCells([]);
    setEnteredLetterCoord(null);
    resetError();

    if (isNotNull(enteredLetterCoord) && !options?.saveEntered) {
      setTableCell(enteredLetterCoord, '');
    }
  };

  const switchTurn = () => setTurn((prev) => (prev === 0 ? 1 : 0));

  const onCheckWord = () => {
    if (isNull(enteredLetterCoord) || isEmpty(lastSelected?.value)) {
      setInputError(InputError.LETTER_NOT_ENTERED);
      shakeLetters();
      return;
    }

    const word = selectedCells.map(({ value }) => value).join('');
    const isWordExist = checkIsWordExist(word);

    if (isWordExist) {
      const setScore = turn === 0 ? setScore1 : setScore2;

      setScore((prev) => prev + word.length);
      switchTurn();
      clearSelection({ saveEntered: true });
      return;
    }

    setInputError(InputError.WORD_DOES_NOT_EXIST);
    shakeLetters();
  };

  const skipTurn = () => {
    switchTurn();
    clearSelection();
    setIsActionsDialogOpened(false);
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
          error={inputError}
          lettersShaking={isLettersShaking}
        />
        <Field
          cells={cells}
          setTableCell={setTableCell}
          enteredLetterCoord={enteredLetterCoord}
          setEnteredLetterCoord={setEnteredLetterCoord}
          selectedCells={selectedCells}
          setSelectedCells={setSelectedCells}
          resetError={resetError}
          undo={undo}
        />
        <Box width={352} display="flex" mt={1} justifyContent="space-between">
          <Button
            color="secondary"
            onClick={() => setIsActionsDialogOpened(true)}
          >
            <MoreHorizIcon />
          </Button>
          <ActionsDialog
            open={isActionsDialogOpened}
            setOpen={setIsActionsDialogOpened}
            onSkipTurn={skipTurn}
          />
          <Button color="secondary" onClick={() => clearSelection()}>
            <DeleteIcon />
          </Button>
          <Button color="secondary" onClick={() => undo()}>
            <BackspaceIcon />
          </Button>
        </Box>
        <FinishTurnButton onClick={onCheckWord} />
      </Box>
    </Box>
  );
};
