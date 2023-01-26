import { Coord } from 'helpers/coord';
import { Directions } from 'types/directions.interface';
import { isNull } from 'lodash';

export interface Cell {
  directions: Directions;
  value: string;
  coord: Coord;
}

export function deserialize({ value, coord, directions }: Cell): Cell {
  return {
    value,
    coord: new Coord(coord),
    directions: {
      top: isNull(directions.top) ? null : new Coord(directions.top),
      right: isNull(directions.right) ? null : new Coord(directions.right),
      bottom: isNull(directions.bottom) ? null : new Coord(directions.bottom),
      left: isNull(directions.left) ? null : new Coord(directions.left),
    },
  };
}
