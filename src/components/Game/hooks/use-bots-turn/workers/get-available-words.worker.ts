import { Cell, deserialize } from 'types/cell.interface';
import { getAvailableWords } from 'components/Game/utils/get-available-words';

onmessage = ({
  data: { cells, excludedWords },
}: {
  data: { cells: Cell[][]; excludedWords: string[] };
}) => {
  const deserializedCells = cells.map((row) => row.map(deserialize));
  postMessage(getAvailableWords(deserializedCells, excludedWords));
};
