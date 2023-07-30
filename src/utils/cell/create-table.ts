import { Coord } from 'helpers/coord';
import { range } from 'lodash';
import { Cell } from 'types/cell.interface';

export function createTable(size: number, word: string): Cell[][] {
  const letters = word.toUpperCase().split('');

  return range(size).map((y) =>
    range(size).map((x) => ({
      value: y === Math.floor(size / 2) ? letters[x] : '',
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
