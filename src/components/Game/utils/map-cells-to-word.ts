import { Cell } from 'types/cell.interface';

export function mapCellsToWord(cells: Cell[]): string {
  return cells
    .map(({ value }) => value)
    .join('')
    .toLowerCase();
}
