import { ALPHABET } from 'components/Game/components/Field/constants';
import { Cell } from 'types/cell.interface';
import { Coord } from 'helpers/coord';
import { Word } from 'types/word.interface';
import { difference, groupBy, sample } from 'lodash';
import { isNotEmpty } from 'utils/null/is-not-empty';
import { isNotNull } from 'utils/null/is-not-null';
import nouns from 'data/nouns.json';

function checkIfExistsSimilarWords(word: string): boolean {
  const slices = word.toLowerCase().split('*');

  if (slices.length === 2 && slices.every((slice) => slice.length > 0)) {
    return nouns.some(
      (noun) => noun.startsWith(slices[0]) && noun.endsWith(slices[1]),
    );
  }
  if (slices.length === 1 || slices[1].length === 0) {
    return nouns.some((noun) => noun.startsWith(slices[0]));
  }

  return nouns.some((noun) => noun.endsWith(slices[1]));
}

/**
 * @example
 * getTemplatesForCoord(field);
 * // {
 * //   { letters: 'п*', coords: [{ x: 0, y: 0 }, { x: 0, y: 1 }]},
 * // }
 * @returns Return words with one empty letter marked as `*`
 */
export function getTemplatesForCoord(
  field: Cell[][],
  coord: Coord,
  words: Word[] = [],
  word: Word = { letters: '', coords: [] },
): Word[] {
  const cell = field[coord.y][coord.x];

  if (!cell.value && word.letters.includes('*')) {
    return words;
  }

  const newWord: Word = {
    letters: word.letters.concat(cell.value || '*'),
    coords: word.coords.concat(cell.coord),
  };
  const isCorrectWordStructure =
    newWord.letters.length > 1 && newWord.letters.includes('*');
  const wordsWithNewWord = isCorrectWordStructure
    ? words.concat(newWord)
    : words;

  if (!checkIfExistsSimilarWords(newWord.letters)) {
    return words;
  }

  const directions = Object.values(cell.directions) as (Coord | null)[];

  return directions
    .filter(isNotNull)
    .filter(
      (direction) =>
        !newWord.coords.some((letterCoord) => letterCoord.equals(direction)),
    )
    .reduce(
      (newWords, direction) =>
        getTemplatesForCoord(field, direction, newWords, newWord),
      wordsWithNewWord,
    );
}

function getTemplates(field: Cell[][]): Word[] {
  return field
    .flatMap((row) => row)
    .map(({ coord }) => getTemplatesForCoord(field, coord))
    .flatMap((word) => word);
}

function mapTemplateToRegExp(template: string): RegExp {
  const slices = template.split('*');
  return new RegExp(
    `^${slices[0] ?? ''}[${ALPHABET}]${slices[1] ?? ''}$`.toLowerCase(),
  );
}

/**
 * @returns Available words for field. If there are different possible words for
 * single position, returns random one. If there are different positions available
 * for single word, gives random position
 */
export function getAvailableWords(
  field: Cell[][],
  excludedWords: string[] = [],
): Word[] {
  const templates = getTemplates(field);
  const templatesGroups = groupBy(templates, ({ letters }) => letters);
  const vocabulary = difference(nouns, excludedWords);

  return Object.keys(templatesGroups)
    .map((template) => {
      const regExp = mapTemplateToRegExp(template);

      return {
        letters: sample(vocabulary.filter((noun) => regExp.test(noun))) ?? '',
        coords: sample(templatesGroups[template])?.coords ?? [],
      };
    })
    .filter(({ letters }) => isNotEmpty(letters));
}
