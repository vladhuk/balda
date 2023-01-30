import { useEffect, useState } from 'react';

export function useEndGame(isFieldFilled: boolean): {
  isEndGame: boolean;
  endGame: () => void;
} {
  const [isEndGame, setIsEndGame] = useState(isFieldFilled);

  useEffect(() => {
    setIsEndGame(isFieldFilled);
  }, [isFieldFilled]);

  return {
    isEndGame,
    endGame: () => setIsEndGame(true),
  };
}
