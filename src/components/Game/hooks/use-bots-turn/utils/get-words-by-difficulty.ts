import { Difficulty } from 'enums/difficulty.enum';
import { Word } from 'types/word.interface';
import { groupBy, random, sample } from 'lodash';

const lengthsPercentageRangeByDifficulty: Record<Difficulty, [number, number]> =
  {
    [Difficulty.EASY]: [0, 0.5],
    [Difficulty.MEDIUM]: [0.25, 0.75],
    [Difficulty.HARD]: [0.5, 1],
  };

export function getWordByDifficulty(
  words: Word[],
  difficulty: Difficulty,
): Word | undefined {
  const lengthsGroup = groupBy(words, ({ letters }) => letters.length);
  const lengthsPercentageRange = lengthsPercentageRangeByDifficulty[difficulty];
  const lengths = Object.keys(lengthsGroup);
  const lengthsIndexRange = lengthsPercentageRange.map((percentage) =>
    Math.round((lengths.length - 1) * percentage),
  );
  const randomLengthIndex = random(lengthsIndexRange[0], lengthsIndexRange[1]);

  return sample(lengthsGroup[lengths[randomLengthIndex]]);
}
