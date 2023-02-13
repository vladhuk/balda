import { GameMode } from 'enums/game-mode.enum';
import { Player } from 'types/player.interface';
import { Word } from 'types/word.interface';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

const MAX_DRAWS_IN_ROW = 4;

function createPlayer(name: string, playerIndex: number): Player {
  return {
    name: isEmpty(name.trim()) ? `Гравець ${playerIndex + 1}` : name,
    words: [],
    score: 0,
  };
}

function adjustNames(names: string[], gameMode: GameMode): string[] {
  return gameMode === GameMode.WITH_BOT ? ['Ти', 'Бот 🤖'] : names;
}

export function useStatistic({
  names,
  isPause,
  gameMode,
  isFieldFilled,
}: {
  names: string[];
  isPause: boolean;
  gameMode: GameMode;
  isFieldFilled: boolean;
}): {
  players: Player[];
  turn: number;
  isDraw: boolean;
  isBotsTurn: boolean;
  isEndGame: boolean;
  endGame: () => void;
  skipTurn: () => void;
  finishTurn: (word: Word) => void;
} {
  const [players, setPlayers] = useState<Player[]>(
    adjustNames(names, gameMode).map(createPlayer),
  );
  const [turn, setTurn] = useState(0);
  const [skipsCount, setSkipsCount] = useState(0);
  const [cantEnterAnyWord, setCantEnterAnyWord] = useState(isFieldFilled);

  const isSkipsLimit = skipsCount === MAX_DRAWS_IN_ROW;
  const isScoresDraw = players[0].score === players[1].score;

  useEffect(() => {
    setCantEnterAnyWord(isFieldFilled);
  }, [isFieldFilled]);

  const resetSkips = () => setSkipsCount(0);

  useEffect(() => {
    if (!isPause) {
      setCantEnterAnyWord(false);
      resetSkips();
      setTurn(0);
      setPlayers(adjustNames(names, gameMode).map(createPlayer));
    }
  }, [isPause, names, gameMode]);

  const switchTurn = () =>
    setTurn((prevTurn) => (prevTurn === players.length - 1 ? 0 : prevTurn + 1));

  return {
    players,
    turn,
    isDraw: isScoresDraw || isSkipsLimit,
    isBotsTurn: gameMode === GameMode.WITH_BOT && turn === 1,
    isEndGame: cantEnterAnyWord || isSkipsLimit,
    endGame: () => setCantEnterAnyWord(true),
    skipTurn: () => {
      switchTurn();
      setSkipsCount((prev) => prev + 1);
    },
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
      resetSkips();
    },
  };
}
