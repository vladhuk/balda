import { Player } from 'types/player.interface';
import { Word } from 'types/word.interface';
import { range } from 'lodash';
import { useState } from 'react';

export function usePlayers(): {
  players: Player[];
  turn: number;
  switchTurn: () => void;
  finishTurn: (word: Word) => void;
} {
  const [players, setPlayers] = useState<Player[]>(
    range(2).map((i) => ({
      name: `Гравець ${i + 1}`,
      words: [],
      score: 0,
    })),
  );
  const [turn, setTurn] = useState(0);

  const switchTurn = () =>
    setTurn((prevTurn) => (prevTurn === players.length - 1 ? 0 : prevTurn + 1));

  return {
    players,
    turn,
    switchTurn,
    finishTurn: (word) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player, i) => {
          if (i === turn) {
            return {
              ...player,
              score: player.score + word.letters.length,
              words: [word, ...player.words],
            };
          }
          return player;
        }),
      );
      switchTurn();
    },
  };
}
