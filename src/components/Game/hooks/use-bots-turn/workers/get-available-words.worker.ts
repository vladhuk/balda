import { getAvailableWords } from 'components/Game/utils/get-available-words';
import { Cell, deserialize } from 'types/cell.interface';

onmessage = ({
  data: { cells, excludedWords, dictionary, alphabet },
}: {
  data: {
    cells: Cell[][];
    excludedWords: string[];
    dictionary: string[];
    alphabet: string;
  };
}) => {
  const deserializedCells = cells.map((row) => row.map(deserialize));
  postMessage(
    getAvailableWords({
      cells: deserializedCells,
      excludedWords,
      dictionary,
      alphabet,
    }),
  );
};
