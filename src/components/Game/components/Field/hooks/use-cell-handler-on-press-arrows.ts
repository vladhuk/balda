import { Key } from 'enums/key.enum';
import { useOnKeyDown } from 'hooks/use-on-key-down';
import { isUndefined } from 'lodash';
import { Cell } from 'types/cell.interface';
import { Directions } from 'types/directions.interface';
import { isNotNull } from 'utils/null/is-not-null';

export function useCellHandlerOnPressArrows({
  cellHandler,
  cells,
  directions,
}: {
  cellHandler: (cell: Cell) => void;
  cells: Cell[][];
  directions?: Directions;
}): void {
  useOnKeyDown({
    keys: [Key.ARROW_DOWN, Key.ARROW_LEFT, Key.ARROW_RIGHT, Key.ARROW_UP],
    callback: (key) => {
      if (isUndefined(directions)) {
        return;
      }

      const coord = {
        [Key.ARROW_DOWN]: directions.bottom,
        [Key.ARROW_UP]: directions.top,
        [Key.ARROW_LEFT]: directions.left,
        [Key.ARROW_RIGHT]: directions.right,
      }[key];

      if (isNotNull(coord)) {
        cellHandler(cells[coord.y][coord.x]);
      }
    },
  });
}
