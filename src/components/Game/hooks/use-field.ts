import { FIELD_SIZE } from 'components/Game/constants';
import { Coord } from 'helpers/coord';
import { useEffect, useState } from 'react';
import { Cell } from 'types/cell.interface';
import { createTable } from 'utils/cell/create-table';

export function useField(initialWord: string): {
  cells: Cell[][];
  setFieldCell: (coord: Coord, value: string) => void;
} {
  const [cells, setCells] = useState(createTable(FIELD_SIZE, initialWord));

  useEffect(() => {
    setCells(createTable(FIELD_SIZE, initialWord));
  }, [initialWord]);

  return {
    cells,
    setFieldCell: (coord: Coord, value: string) => {
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
    },
  };
}
