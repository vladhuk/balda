import { GameMode } from 'enums/game-mode.enum';
import { Player } from 'types/player.interface';
import { Word } from 'types/word.interface';
import { useEffect, useState } from 'react';
import { usePlayers } from 'components/Game/hooks/use-players';

const MAX_DRAWS_IN_ROW = 4;

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
  const { players, initPlayers, addWordToPlayer } = usePlayers({
    gameMode,
    names,
  });
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
      initPlayers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPause]);

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
      addWordToPlayer(turn, word);
      switchTurn();
      resetSkips();
    },
  };
}
