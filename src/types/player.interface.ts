import { Word } from 'types/word.interface';

export interface Player {
  name: string;
  score: number;
  words: Word[];
}
