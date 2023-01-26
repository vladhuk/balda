import { Coord } from 'helpers/coord';

export interface Word {
  letters: string;
  coords: Coord[];
}

export function deserialize(word: Word): Word {
  return {
    ...word,
    coords: word.coords.map((coord) => new Coord(coord)),
  };
}
