import { Coord } from 'helpers/coord';

export interface Directions {
  top: Coord | null;
  right: Coord | null;
  bottom: Coord | null;
  left: Coord | null;
}
