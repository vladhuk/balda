import { Player } from 'types/player.interface';

export function getWordsFromPlayers(players: Player[]): string[] {
  return players.flatMap(({ words }) => words.map(({ letters }) => letters));
}
