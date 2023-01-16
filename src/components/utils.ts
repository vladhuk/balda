import { Cell } from 'types/cell.interface';
import { Player } from 'types/player.interface';

export function mapCellsToWord(cells: Cell[]): string {
  return cells
    .map(({ value }) => value)
    .join('')
    .toLowerCase();
}

export function getWordsFromPlayers(players: Player[]): string[] {
  return players.flatMap(({ words }) => words.map(({ letters }) => letters));
}
