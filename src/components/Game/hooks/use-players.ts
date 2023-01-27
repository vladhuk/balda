import { Player } from 'types/player.interface';
import { Word } from 'types/word.interface';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

function createPlayer(name: string, playerIndex: number): Player {
  return {
    name: isEmpty(name.trim()) ? `Гравець ${playerIndex + 1}` : name,
    words: [],
    score: 0,
  };
}

export function usePlayers(names: string[]): {
  players: Player[];
  turn: number;
  switchTurn: () => void;
  finishTurn: (word: Word) => void;
} {
  const [players, setPlayers] = useState<Player[]>(names.map(createPlayer));
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    setPlayers(names.map(createPlayer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names]);

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
