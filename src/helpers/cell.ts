import { Coord } from 'helpers/coord';

interface Directions {
  top: Coord | null;
  right: Coord | null;
  bottom: Coord | null;
  left: Coord | null;
}

export interface Cell {
  directions: Directions;
  value: string;
  coord: Coord;
}
