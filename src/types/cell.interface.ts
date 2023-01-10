import { Coord } from 'helpers/coord';
import { Directions } from 'types/directions.interface';

export interface Cell {
  directions: Directions;
  value: string;
  coord: Coord;
}
