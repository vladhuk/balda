import {
  Box,
  Button,
  Divider,
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
    setSelectedCells((prevCells) => [...prevCells, cell]);
  };

  const clearSelection = (options?: { saveEntered?: boolean }) => {
    setSelectedCells([]);
    setEnteredLetterCoord(null);

    if (isNotNull(enteredLetterCoord) && !options?.saveEntered) {
      setTableCell(enteredLetterCoord, '');
    }
  };

  const onCheckWord = () => {
    if (isNull(enteredLetterCoord)) {
      return;
    }

    const word = selectedCells.map(({ value }) => value).join('');
    const isWordExist = checkIsWordExist(word);

    // eslint-disable-next-line no-alert
    alert(isWordExist ? 'correct' : 'wrong');
    clearSelection({ saveEntered: isWordExist });

    if (isWordExist) {
      const setScore = turn ? setScore1 : setScore2;

      setScore((prev) => prev + word.length);
      setTurn((prev) => !prev);
    }
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
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Box display="flex" mt={1}>
          {(isEmpty(selectedCells)
            ? [{ value: '\u2000', coord: new Coord({ x: 0, y: 0 }) }]
            : selectedCells
          ).map((cell, i, arr) => (
            <Box
              key={getCellKey(cell)}
              display="flex"
              flexDirection="column"
              alignItems="center"
              mr={1}
              minWidth={arr.length < 7 ? 45 : 35}
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
              <Divider sx={{ width: 1 }} />
            </Box>
          ))}
        </Box>
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
        <Button variant="contained" onClick={onCheckWord}>
          Завершити хід
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => clearSelection()}
        >
          Скинути вибір
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => setTurn((prev) => !prev)}
        >
          Пропустити хід
        </Button>
        <Box display="flex">
          <Typography
            variant="h4"
            fontWeight={900}
            color={turn ? palette.primary.main : palette.text.disabled}
            mr={4}
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
      </Box>
    </Box>
  );
};
