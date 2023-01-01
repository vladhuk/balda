interface ICoord {
  readonly x: number;
  readonly y: number;
}

export class Coord implements ICoord {
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
