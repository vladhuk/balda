import { Box, Button, InputBase } from '@mui/material';
import { Cell, Coord } from 'helpers/cell';
import { isEmpty, isNull, random, range } from 'lodash';
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

export const App: FC = () => {
  const [cells, setCells] = useState(createTable(SIZE, getRandomWord()));
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [enteredLetterCoord, setEnteredLetterCoord] = useState<Coord | null>(
    null,
  );

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

    const lastSelected = selectedCells[selectedCells.length - 1];

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

  const handleClickCell = (cell: Cell) => () => {
    if (checkIsCellSelected(cell)) {
      return;
    }
    if (!checkIsLastSelectedNeighbor(cell)) {
      return;
    }

    const isEmptyCellAndLetterAlreadyEntered =
      isEmpty(cell.value) && isNotNull(enteredLetterCoord);
    if (isEmptyCellAndLetterAlreadyEntered) {
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
    <Box display="flex" flexDirection="column" alignItems="center">
      <div>
        {cells.map((row) => (
          <Box
            key={`${row[0]?.coord.y} ${row
              .map(({ value }) => value)
              .join(' ')}`}
          >
            {row.map((cell) => (
              <InputBase
                key={`${cell.coord.x} ${cell.coord.y} ${cell.value}`}
                sx={{
                  '& input': {
                    p: 0,
                    width: 64,
                    height: 64,
                    fontSize: 24,
                    border: '2px solid black',
                    textAlign: 'center',

                    ...(selectedCells.some(({ coord }) =>
                      coord.equals(cell.coord),
                    ) && {
                      '&, &: focus': {
                        borderColor: 'green',
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
      <Button onClick={() => clearSelection()}>Скинути вибір</Button>
      <Button onClick={onCheckWord}>Перевірити слово</Button>
      <Button>Підказати слова</Button>
    </Box>
  );
};
