import { Coord } from 'helpers/coord';
import { difference, groupBy, sample } from 'lodash';
import { Cell } from 'types/cell.interface';
import { Word } from 'types/word.interface';
import { isNotEmpty } from 'utils/null/is-not-empty';
import { isNotNull } from 'utils/null/is-not-null';

class TemplateBuilder {
  constructor(
    private readonly cells: Cell[][],
    private readonly dictionary: string[],
  ) {}

  private checkAreExistSimilarWords(template: string): boolean {
    const slices = template.toLowerCase().split('*');

    if (slices.length === 2 && slices.every((slice) => slice.length > 0)) {
      return this.dictionary.some(
        (word) => word.startsWith(slices[0]) && word.endsWith(slices[1]),
      );
    }
    if (slices.length === 1 || slices[1].length === 0) {
      return this.dictionary.some((noun) => noun.startsWith(slices[0]));
    }

    return this.dictionary.some((noun) => noun.endsWith(slices[1]));
  }

  /**
   * @example
   * getTemplatesForCoord(cells);
   * // {
   * //   { letters: 'a*', coords: [{ x: 0, y: 0 }, { x: 0, y: 1 }]},
   * // }
   * @returns Return words with one empty letter marked as `*`
   */
  private getTemplatesForCoord(
    coord: Coord,
    templates: Word[] = [],
    template: Word = { letters: '', coords: [] },
  ): Word[] {
    const cell = this.cells[coord.y][coord.x];

    if (!cell.value && template.letters.includes('*')) {
      return templates;
    }

    const newTemplate: Word = {
      letters: template.letters.concat(cell.value || '*'),
      coords: template.coords.concat(cell.coord),
    };
    const isCorrectTemplateStructure =
      newTemplate.letters.length > 1 && newTemplate.letters.includes('*');
    const templatesWithNewTemplate = isCorrectTemplateStructure
      ? templates.concat(newTemplate)
      : templates;

    if (!this.checkAreExistSimilarWords(newTemplate.letters)) {
      return templates;
    }

    const directions = Object.values(cell.directions) as (Coord | null)[];

    return directions
      .filter(isNotNull)
      .filter(
        (direction) =>
          !newTemplate.coords.some((letterCoord) =>
            letterCoord.equals(direction),
          ),
      )
      .reduce(
        (newTemplates, direction) =>
          this.getTemplatesForCoord(direction, newTemplates, newTemplate),
        templatesWithNewTemplate,
      );
  }

  getTemplates(): Word[] {
    return this.cells
      .flatMap((row) => row)
      .map(({ coord }) => this.getTemplatesForCoord(coord))
      .flatMap((word) => word);
  }
}

/**
 * @example
 * mapTemplateToRegExp('a*', 'ABC'); // /^a[ABC]$/
 */
function mapTemplateToRegExp(template: string, alphabet: string): RegExp {
  const slices = template.split('*');
  return new RegExp(
    `^${slices[0] ?? ''}[${alphabet}]${slices[1] ?? ''}$`.toLowerCase(),
  );
}

/**
 * @returns Available words for given cells. If there are different possible words for
 * single position, returns random one. If there are different positions available
 * for single word, gives random position
 */
export function getAvailableWords({
  cells,
  excludedWords = [],
  dictionary,
  alphabet,
}: {
  cells: Cell[][];
  excludedWords?: string[];
  dictionary: string[];
  alphabet: string;
}): Word[] {
  const templates = new TemplateBuilder(cells, dictionary).getTemplates();
  const templatesGroups = groupBy(templates, ({ letters }) => letters);
  const filteredDictionary = difference(dictionary, excludedWords);

  return Object.keys(templatesGroups)
    .map((template) => {
      const regExp = mapTemplateToRegExp(template, alphabet);

      return {
        letters:
          sample(filteredDictionary.filter((noun) => regExp.test(noun))) ?? '',
        coords: sample(templatesGroups[template])?.coords ?? [],
      };
    })
    .filter(({ letters }) => isNotEmpty(letters));
}
