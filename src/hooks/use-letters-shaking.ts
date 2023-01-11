import { useState } from 'react';

const SHAKING_DURATION = 300;

export function useLettersShaking(): {
  isLettersShaking: boolean;
  shakeLetters: () => void;
} {
  const [isLettersShaking, setIsLettersShaking] = useState(false);

  return {
    isLettersShaking,
    shakeLetters: () => {
      setIsLettersShaking(true);
      setTimeout(() => {
        setIsLettersShaking(false);
      }, SHAKING_DURATION);
    },
  };
}
