import { ALPHABET } from 'components/Field/constants';
import { Box } from '@mui/material';
import { Cell } from 'types/cell.interface';
import { Coord } from 'helpers/coord';
import { FieldCell } from 'components/Field/styled';
import { Key } from 'enums/key.enum';
import { getCellKey } from 'utils/cell/get-cell-key';
import { isEmpty, isNull } from 'lodash';
import { isNotEmpty } from 'utils/null/is-not-empty';
import { isNotNull } from 'utils/null/is-not-null';
import { isNotUndefined } from 'utils/null/is-not-undefined';
import { useCellHandlerOnPressArrows } from 'components/Field/hooks/use-cell-handler-on-press-arrows';
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

interface Props {
  cells: Cell[][];
  setFieldCell: (coord: Coord, value: string) => void;
  selectedCells: Cell[];
  setSelectedCells: Dispatch<SetStateAction<Cell[]>>;
  enteredLetterCoord: Coord | null;
  setEnteredLetterCoord: Dispatch<SetStateAction<Coord | null>>;
  undo: () => void;
  resetError: () => void;
  enteredLetterRotating?: boolean;
}

export const Field: FC<Props> = ({
  cells,
  setFieldCell,
  selectedCells,
  setSelectedCells,
  enteredLetterCoord,
  setEnteredLetterCoord,
  undo,
  resetError,
  enteredLetterRotating,
}) => {
  const lastSelected: Cell | undefined =
    selectedCells[selectedCells.length - 1];

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

  const checkIsLastSelected = (cell: Cell) =>
    lastSelected?.coord.equals(cell.coord);

  const checkCanSelect = (cell: Cell) => {
    if (checkIsLastSelected(cell)) {
      return true;
    }
    if (checkIsCellSelected(cell)) {
      return false;
    }
    const isEmptyCellAndWordAlreadyHasEnteredLetter =
      isEmpty(cell.value) && isNotNull(enteredLetterCoord);
    if (isEmptyCellAndWordAlreadyHasEnteredLetter) {
      return false;
    }
    if (isNotUndefined(lastSelected) && isEmpty(lastSelected.value)) {
      return false;
    }

    return checkIsLastSelectedNeighbor(cell);
  };

  const selectCell = (cell: Cell) => {
    if (!checkCanSelect(cell)) {
      return;
    }
    if (checkIsLastSelected(cell)) {
      undo();
      return;
    }

    if (isEmpty(cell.value)) {
      setEnteredLetterCoord(cell.coord);
    }

    resetError();
    setSelectedCells((prevCells) => [...prevCells, cell]);
  };

  const handleEnterLetter =
    (cell: Cell) => (event: ChangeEvent<HTMLInputElement>) => {
      const uppercasedValue = event.target.value.toUpperCase();

      if (!ALPHABET.includes(uppercasedValue)) {
        return;
      }
      if (isNull(enteredLetterCoord)) {
        setEnteredLetterCoord(cell.coord);
      }

      setFieldCell(cell.coord, uppercasedValue);
      setSelectedCells((prevSelected) => [
        ...prevSelected.slice(0, prevSelected.length - 1),
        { ...cell, value: uppercasedValue },
      ]);
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    };

  const checkCanEnterLetter = (cell: Cell) =>
    isEmpty(cell.value) && checkIsLastSelected(cell);

  const checkIsCellEntered = (cell: Cell) =>
    enteredLetterCoord?.equals(cell.coord);

  useCellHandlerOnPressArrows({
    cellHandler: selectCell,
    directions: lastSelected?.directions,
    cells,
  });

  return (
    <div>
      {cells.map((row) => (
        <Box
          key={`${row[0]?.coord.y} ${row.map(({ value }) => value).join(' ')}`}
        >
          {row.map((cell) => (
            <FieldCell
              key={getCellKey(cell)}
              inputRef={(input: HTMLInputElement | null) => {
                if (isNotNull(input) && checkCanEnterLetter(cell)) {
                  input.focus();
                }
              }}
              translucent={
                isNotEmpty(selectedCells) &&
                !checkIsCellSelected(cell) &&
                !checkCanSelect(cell)
              }
              clickable={checkCanSelect(cell)}
              lastSelected={checkIsLastSelected(cell)}
              selected={checkIsCellSelected(cell)}
              entered={checkIsCellEntered(cell)}
              rotating={checkIsCellEntered(cell) && enteredLetterRotating}
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
              readOnly={!checkCanEnterLetter(cell)}
            />
          ))}
        </Box>
      ))}
    </div>
  );
};
