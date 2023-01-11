import { Cell } from 'types/cell.interface';

export function getCellKey(cell: Pick<Cell, 'coord' | 'value'>): string {
  return `${cell.coord.x} ${cell.coord.y} ${cell.value}`;
}
