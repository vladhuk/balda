import { Box, ClickAwayListener } from '@mui/material';
import { useCellHandlerOnPressArrows } from 'components/Game/components/Field/hooks/use-cell-handler-on-press-arrows';
import { FieldCell } from 'components/Game/components/Field/styled';
import { useAlphabet } from 'components/Game/hooks/use-alphabet';
import { Key } from 'enums/key.enum';
import { Coord } from 'helpers/coord';
import { useIsTouchDevice } from 'hooks/use-is-touch-device';
import { isEmpty, isNull } from 'lodash';
import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
} from 'react';
import { Cell } from 'types/cell.interface';
import { getCellKey } from 'utils/cell/get-cell-key';
import { isNotEmpty } from 'utils/null/is-not-empty';
import { isNotNull } from 'utils/null/is-not-null';
import { isNotUndefined } from 'utils/null/is-not-undefined';

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
  highlightedCoords: Coord[];
  botsTurn?: boolean;
  lettersZoomIn?: boolean;
  lettersZoomOut?: boolean;
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
  highlightedCoords,
  botsTurn,
  lettersZoomIn,
  lettersZoomOut,
}) => {
  const isTouchDevice = useIsTouchDevice();
  const alphabet = useAlphabet();

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

  const checkIsCellClickable = (cell: Cell) => {
    if (botsTurn) {
      return false;
    }
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
    if (!checkIsCellClickable(cell)) {
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

      if (!alphabet.includes(uppercasedValue)) {
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
    };

  const checkCanEnterLetter = (cell: Cell) => {
    if (isNotEmpty(cell.value)) {
      return false;
    }
    if (isTouchDevice) {
      return checkIsCellClickable(cell);
    }
    return checkIsLastSelected(cell);
  };

  const checkIsCellEntered = (cell: Cell) =>
    enteredLetterCoord?.equals(cell.coord);

  const checkIsCellHighlighted = (cell: Cell) =>
    isNotUndefined(highlightedCoords.find((coord) => coord.equals(cell.coord)));

  const checkIsCellTranslucent = (cell: Cell) => {
    if (isNotEmpty(highlightedCoords)) {
      return !checkIsCellHighlighted(cell);
    }
    if (botsTurn) {
      return false;
    }
    if (isNotEmpty(selectedCells)) {
      return !checkIsCellSelected(cell) && !checkIsCellClickable(cell);
    }

    return false;
  };

  const undoIfEmptyEnteredCell = (cell: Cell) => {
    if (checkIsCellEntered(cell) && isEmpty(cell.value)) {
      undo();
    }
  };

  const focusEnterableCellInputForNonTouchDevices = (
    cell: Cell,
    input: HTMLInputElement | null,
  ) => {
    if (!isTouchDevice && isNotNull(input) && checkCanEnterLetter(cell)) {
      input.focus();
    }
  };

  const handleOnKeyDown =
    (cell: Cell) =>
    ({ key }: KeyboardEvent) => {
      if ((key as Key) === Key.SPACE) {
        selectCell(cell);
      }
    };

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
          display="flex"
        >
          {row.map((cell) => (
            <ClickAwayListener
              key={getCellKey(cell)}
              touchEvent={false}
              onClickAway={() => undoIfEmptyEnteredCell(cell)}
            >
              <FieldCell
                inputRef={(input: HTMLInputElement | null) =>
                  focusEnterableCellInputForNonTouchDevices(cell, input)
                }
                inputProps={{
                  maxLength: 1,
                }}
                translucent={checkIsCellTranslucent(cell)}
                clickable={checkIsCellClickable(cell)}
                lastSelected={checkIsLastSelected(cell)}
                selected={
                  checkIsCellSelected(cell) && !checkIsCellHighlighted(cell)
                }
                entered={checkIsCellEntered(cell)}
                rotating={checkIsCellEntered(cell) && enteredLetterRotating}
                highlighted={checkIsCellHighlighted(cell)}
                readOnly={!checkCanEnterLetter(cell)}
                zoomIn={lettersZoomIn}
                zoomOut={lettersZoomOut}
                value={cell.value}
                onClick={() => selectCell(cell)}
                onKeyDown={handleOnKeyDown(cell)}
                onChange={handleEnterLetter(cell)}
              />
            </ClickAwayListener>
          ))}
        </Box>
      ))}
    </div>
  );
};
