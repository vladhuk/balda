import { Cell } from 'types/cell.interface';
import { isNotEmpty } from 'utils/null/is-not-empty';

export function checkIsFieldFilled(cells: Cell[][]): boolean {
  return cells.every((row) => row.every(({ value }) => isNotEmpty(value)));
}
