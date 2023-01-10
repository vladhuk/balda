import { ActionsDialog } from 'components/ActionsDialog';
import {
  Box,
  Button,
  InputBase,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { Cell } from 'types/cell.interface';
import { Coord } from 'helpers/coord';
import { FinishTurnButton } from 'components/FinishTurnButton/FinishTurnButton';
import { Key } from 'enums/key.enum';
import { WordPreview } from 'components/WordPreview/WordPreview';
import { getCellKey } from 'utils/get-cell-key';
import { isEmpty, isNull, random, range } from 'lodash';
import { isNotEmpty } from 'utils/is-not-empty';
import { isNotNull } from 'utils/is-not-null';
import { useCellHandlerOnPressArrows } from 'hooks/use-cell-handler-on-press-arrows';
import { useOnKeyDown } from 'hooks/use-on-key-down';
import BackspaceIcon from '@mui/icons-material/Backspace';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { ChangeEvent, FC, useState } from 'react';
import nouns from 'data/nouns.json';

const SIZE = 5;
const LETTERS = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ';

function getRandomWord(): string {
  const words = nouns.filter((word) => word.length === 5);
  return words[random(0, words.length)];
}

function createTable(size: number, word: string): Cell[][] {
  const letters = word.toUpperCase().split('');

  return range(size).map((y) =>
    range(size).map((x) => ({
      value: y === Math.floor(SIZE / 2) ? letters[x] : '',
      coord: new Coord({ x, y }),
      directions: {
        top: y === 0 ? null : new Coord({ x, y: y - 1 }),
        right: x === size - 1 ? null : new Coord({ x: x + 1, y }),
        bottom: y === size - 1 ? null : new Coord({ x, y: y + 1 }),
        left: x === 0 ? null : new Coord({ x: x - 1, y }),
      },
    })),
  );
}

function checkIsWordExist(word: string): boolean {
  return nouns.includes(word.toLowerCase());
}

export const App: FC = () => {
  const { palette } = useTheme();

  const [cells, setCells] = useState(createTable(SIZE, getRandomWord()));
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [enteredLetterCoord, setEnteredLetterCoord] = useState<Coord | null>(
    null,
  );
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [turn, setTurn] = useState<0 | 1>(0);
  const [isLettersShaking, setIsLettersShaking] = useState(false);
  const [isWordWrongError, setIsWordWrongError] = useState(false);
  const [isLetterNotEnteredError, setIsLetterNotEnteredError] = useState(false);
  const [isActionsDialogOpened, setIsActionsDialogOpened] = useState(false);

  const lastSelected = selectedCells[selectedCells.length - 1];
  const isError = isWordWrongError || isLetterNotEnteredError;

  const resetErrors = () => {
    setIsWordWrongError(false);
    setIsLetterNotEnteredError(false);
  };

  const getErrorMessage = () => {
    if (isWordWrongError) {
      return 'Слово не знайдено';
    }
    if (isLetterNotEnteredError) {
      return 'Слово має містити одну введену букву';
    }
    return '';
  };

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

  const undo = () => {
    if (
      isNotNull(enteredLetterCoord) &&
      lastSelected?.coord.equals(enteredLetterCoord)
    ) {
      setTableCell(enteredLetterCoord, '');
      setEnteredLetterCoord(null);
    }

    setSelectedCells((prev) => prev.slice(0, prev.length - 1));
    resetErrors();
    (document.activeElement as HTMLElement).blur();
  };

  const checkIsCellSelected = (cell: Cell) =>
    selectedCells.some(({ coord }) => coord.equals(cell.coord));

  const checkIsLastSelectedNeighbor = (cell: Cell) => {
    if (isEmpty(selectedCells)) {
      return true;
    }

    const isNeighborCell = Object.values(lastSelected.directions)
      .filter(isNotNull)
      .some((coord: Coord) => coord.equals(cell.coord));

    return isNeighborCell;
  };

  const handleEnterLetter =
    (cell: Cell) => (event: ChangeEvent<HTMLInputElement>) => {
      const uppercasedValue = event.target.value.toUpperCase();

      if (!LETTERS.includes(uppercasedValue)) {
        return;
      }
      if (isNull(enteredLetterCoord)) {
        setEnteredLetterCoord(cell.coord);
      }

      setTableCell(cell.coord, uppercasedValue);
      setSelectedCells((prevSelected) => [
        ...prevSelected.slice(0, prevSelected.length - 1),
        { ...cell, value: uppercasedValue },
      ]);
    };

  const checkIsLastSelected = (cell: Cell) =>
    lastSelected?.coord.equals(cell.coord);

  const checkCanClick = (cell: Cell) => {
    if (checkIsLastSelected(cell)) {
      return true;
    }
    if (checkIsCellSelected(cell)) {
      return false;
    }
    if (!checkIsLastSelectedNeighbor(cell)) {
      return false;
    }

    const isEmptyCellAndLetterAlreadyEntered =
      isEmpty(cell.value) && isNotNull(enteredLetterCoord);
    if (isEmptyCellAndLetterAlreadyEntered) {
      return false;
    }

    const isAnyCellSelectedAndLastSelectedEmpty =
      isNotEmpty(selectedCells) && isEmpty(lastSelected.value);
    if (isAnyCellSelectedAndLastSelectedEmpty) {
      return false;
    }

    return true;
  };

  const selectCell = (cell: Cell) => {
    if (!checkCanClick(cell)) {
      return;
    }
    if (checkIsLastSelected(cell)) {
      undo();
      return;
    }
    if (isEmpty(cell.value)) {
      setEnteredLetterCoord(cell.coord);
    }

    resetErrors();
    setSelectedCells((prevCells) => [...prevCells, cell]);
  };

  const clearSelection = (options?: { saveEntered?: boolean }) => {
    setSelectedCells([]);
    setEnteredLetterCoord(null);
    resetErrors();

    if (isNotNull(enteredLetterCoord) && !options?.saveEntered) {
      setTableCell(enteredLetterCoord, '');
    }
  };

  const shakeLetters = () => {
    setIsLettersShaking(true);
    setTimeout(() => {
      setIsLettersShaking(false);
    }, 300);
  };

  const switchTurn = () => setTurn((prev) => (prev === 0 ? 1 : 0));

  const onCheckWord = () => {
    if (isNull(enteredLetterCoord) || isEmpty(lastSelected?.value)) {
      setIsLetterNotEnteredError(true);
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

    setIsWordWrongError(true);
    shakeLetters();
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
  useCellHandlerOnPressArrows({
    cellHandler: selectCell,
    directions: lastSelected?.directions,
    cells,
  });

  const skipTurn = () => {
    switchTurn();
    clearSelection();
    setIsActionsDialogOpened(false);
  };

  const checkIsEmptySelectedCell = (cell: Cell) =>
    isNotNull(enteredLetterCoord) &&
    enteredLetterCoord.equals(cell.coord) &&
    isEmpty(cell.value);

  const checkIsLastSelectedEnterableNeighbor = (cell: Cell) =>
    checkIsLastSelectedNeighbor(cell) &&
    isEmpty(cell.value) &&
    isNull(enteredLetterCoord);

  const checkIsFirstEmptySelection = (cell: Cell) =>
    isEmpty(selectedCells) && isEmpty(cell.value);

  const checkIsEnabled = (cell: Cell) =>
    checkIsFirstEmptySelection(cell) ||
    checkIsEmptySelectedCell(cell) ||
    checkIsLastSelectedEnterableNeighbor(cell);

  return (
    <Box height="100vh" bgcolor="background.default">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" width={360} justifyContent="space-between" mt={1}>
          <Typography
            variant="h4"
            fontWeight={900}
            color={turn === 0 ? palette.primary.main : palette.text.disabled}
          >
            {score1}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={900}
            color={turn === 1 ? palette.primary.main : palette.text.disabled}
          >
            {score2}
          </Typography>
        </Box>
        <WordPreview
          enteredLetterCoord={enteredLetterCoord}
          selectedCells={selectedCells}
          error={isError}
          errorMessage={getErrorMessage()}
          lettersShaking={isLettersShaking}
        />
        <div>
          {cells.map((row) => (
            <Box
              key={`${row[0]?.coord.y} ${row
                .map(({ value }) => value)
                .join(' ')}`}
            >
              {row.map((cell) => (
                <InputBase
                  key={getCellKey(cell)}
                  inputRef={(input: HTMLInputElement | null) => {
                    if (isNotNull(input) && checkIsEmptySelectedCell(cell)) {
                      input.focus();
                    }
                  }}
                  sx={{
                    cursor: 'default',

                    '& input': {
                      cursor: 'default',
                      p: 0,
                      m: 0.5,
                      width: 64,
                      height: 64,
                      fontSize: 28,
                      borderRadius: '10px',
                      background: palette.action.disabledBackground,
                      textAlign: 'center',
                      transition: '.13s',
                      fontWeight: 600,

                      '&.MuiInputBase-readOnly': {
                        ...(isNotEmpty(selectedCells) &&
                          !checkIsCellSelected(cell) &&
                          !checkCanClick(cell) && {
                            opacity: 0.4,
                          }),
                      },

                      ...(checkCanClick(cell) && {
                        cursor: 'pointer',

                        '&:hover': {
                          background: checkIsLastSelected(cell)
                            ? alpha(palette.primary.main, 0.9)
                            : alpha(palette.primary.light, 0.5),
                        },

                        ...(!checkIsLastSelected(cell) && {
                          '&:focus-visible': {
                            background: alpha(palette.primary.light, 0.5),
                          },
                        }),
                      }),
                      ...(checkIsCellSelected(cell) && {
                        color: palette.common.black,
                        background: palette.primary.main,

                        ...(enteredLetterCoord?.equals(cell.coord) && {
                          background: palette.secondary.main,

                          ...(checkIsCellSelected(cell) && {
                            ':hover, &:focus-visible': {
                              background: alpha(palette.secondary.main, 0.9),
                            },
                          }),
                        }),

                        '&.MuiInputBase-readOnly': {
                          color: palette.common.white,
                        },
                      }),
                    },
                  }}
                  inputProps={{
                    maxLength: 1,
                  }}
                  value={cell.value}
                  onClick={() => selectCell(cell)}
                  onKeyDown={({ key }) => {
                    if (key === Key.SPACE) {
                      selectCell(cell);
                    }
                  }}
                  onChange={handleEnterLetter(cell)}
                  readOnly={!checkIsEnabled(cell)}
                />
              ))}
            </Box>
          ))}
        </div>
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
