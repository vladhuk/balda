import { useEffect, useState } from 'react';

export function useEndGame(isEnd: boolean): {
  isEndGame: boolean;
  endGame: () => void;
} {
  const [isEndGame, setIsEndGame] = useState(isEnd);

  useEffect(() => {
    setIsEndGame(isEnd);
  }, [isEnd]);

  return {
    isEndGame,
    endGame: () => setIsEndGame(true),
  };
}
