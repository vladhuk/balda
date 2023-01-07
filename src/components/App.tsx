import { ActionsDialog } from 'components/ActionsDialog';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  InputBase,
  Typography,
  Zoom,
  alpha,
  useTheme,
} from '@mui/material';
import { Cell } from 'helpers/cell';
import { Coord } from 'helpers/coord';
import { isEmpty, isNull, random, range } from 'lodash';
import { isNotEmpty } from 'utils/is-not-empty';
import { isNotNull } from 'utils/is-not-null';
import BackspaceIcon from '@mui/icons-material/Backspace';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
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

function getCellKey(cell: Pick<Cell, 'coord' | 'value'>): string {
  return `${cell.coord.x} ${cell.coord.y} ${cell.value}`;
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
  const [turn, setTurn] = useState(true);
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

      if (LETTERS.includes(uppercasedValue)) {
        setTableCell(cell.coord, uppercasedValue);
        setSelectedCells((prevSelected) => [
          ...prevSelected.slice(0, prevSelected.length - 1),
          { ...cell, value: uppercasedValue },
        ]);
      }
    };

  const checkCanClick = (cell: Cell) => {
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

    const isAnyCellSelectedLastSelectedEmpty =
      isNotEmpty(selectedCells) && isEmpty(lastSelected.value);
    if (isAnyCellSelectedLastSelectedEmpty) {
      return false;
    }

    return true;
  };

  const handleClickCell = (cell: Cell) => () => {
    if (!checkCanClick(cell)) {
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

  const onCheckWord = () => {
    if (isNull(enteredLetterCoord) || isEmpty(lastSelected?.value)) {
      setIsLetterNotEnteredError(true);
      shakeLetters();
      return;
    }

    const word = selectedCells.map(({ value }) => value).join('');
    const isWordExist = checkIsWordExist(word);

    if (isWordExist) {
      const setScore = turn ? setScore1 : setScore2;

      setScore((prev) => prev + word.length);
      setTurn((prev) => !prev);
      clearSelection({ saveEntered: true });
      return;
    }

    setIsWordWrongError(true);
    shakeLetters();
  };

  const skipTurn = () => {
    setTurn((prev) => !prev);
    clearSelection();
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
      <Box display="flex" flexDirection="column" alignItems="center" mx={0.5}>
        <Box display="flex" width={360} justifyContent="space-between" mt={1}>
          <Typography
            variant="h4"
            fontWeight={900}
            color={turn ? palette.primary.main : palette.text.disabled}
          >
            {score1}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={900}
            color={turn ? palette.text.disabled : palette.primary.main}
          >
            {score2}
          </Typography>
        </Box>
        <Box display="flex">
          {(isNull(enteredLetterCoord)
            ? [
                ...selectedCells,
                { value: '\u2000', coord: new Coord({ x: 0, y: 0 }) },
              ]
            : selectedCells
          ).map((cell, i, arr) => (
            <Box
              key={getCellKey(cell)}
              display="flex"
              flexDirection="column"
              alignItems="center"
              mr={1}
              minWidth={arr.length < 7 ? 45 : 35}
              sx={{
                ...(isLettersShaking && {
                  animation: 'shake 0.4s',
                  animationIterationCount: 'infinite',
                }),

                '@keyframes shake': {
                  '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
                  '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
                  '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
                  '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
                  '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
                  '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
                  '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
                  '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
                  '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
                  '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
                },
              }}
            >
              <Zoom in>
                <Typography
                  fontSize={arr.length < 7 ? 36 : 28}
                  lineHeight={1.1}
                  fontWeight={600}
                  color={
                    enteredLetterCoord?.equals(cell.coord)
                      ? 'secondary'
                      : 'text.primary'
                  }
                >
                  {cell.value || '\u2000'}
                </Typography>
              </Zoom>
              <Divider
                sx={{
                  width: 1,
                  boxSizing: 'border-box',
                  height: 4,
                }}
              />
            </Box>
          ))}
        </Box>
        <FormHelperText
          component="div"
          sx={{ lineHeight: 1, height: 12 }}
          error
        >
          <Zoom in={isError}>
            <div>{getErrorMessage()}</div>
          </Zoom>
        </FormHelperText>
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
                  sx={{
                    '& input': {
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

                      '&.Mui-disabled': {
                        WebkitTextFillColor: palette.text.primary,

                        ...(isNotEmpty(selectedCells) &&
                          !checkIsCellSelected(cell) &&
                          !checkCanClick(cell) && {
                            opacity: 0.4,
                          }),
                      },

                      ...(checkCanClick(cell) && {
                        cursor: 'pointer',

                        '&:hover': {
                          background: alpha(palette.primary.light, 0.5),
                        },
                      }),
                      ...(checkIsCellSelected(cell) && {
                        background: enteredLetterCoord?.equals(cell.coord)
                          ? palette.secondary.main
                          : palette.primary.main,
                        color: palette.common.black,

                        '&.Mui-disabled': {
                          WebkitTextFillColor: palette.common.white,
                        },
                      }),
                    },
                  }}
                  inputProps={{
                    maxLength: 1,
                  }}
                  value={cell.value}
                  onClick={handleClickCell(cell)}
                  onChange={handleEnterLetter(cell)}
                  disabled={!checkIsEnabled(cell)}
                />
              ))}
            </Box>
          ))}
        </div>
        <Box
          width={360}
          display="flex"
          mt={1}
          px={0.5}
          justifyContent="space-between"
        >
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
          <Button color="secondary" onClick={undo}>
            <BackspaceIcon />
          </Button>
        </Box>
        <Box
          sx={(theme) => ({
            position: 'fixed',
            bottom: 16,
            width: 360,

            [theme.breakpoints.up('sm')]: {
              position: 'static',
              mt: 5,
              px: 0.5,
            },
          })}
        >
          <Button
            size="large"
            endIcon={<KeyboardReturnIcon />}
            onClick={onCheckWord}
            fullWidth
          >
            Завершити хід
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
