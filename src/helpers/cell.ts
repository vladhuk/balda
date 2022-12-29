interface ICoord {
  x: number;
  y: number;
}

export class Coord {
  readonly x: number;

  readonly y: number;

  constructor({ x, y }: ICoord) {
    this.x = x;
    this.y = y;
  }

  equals({ x, y }: ICoord): boolean {
    return this.x === x && this.y === y;
  }
}

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
