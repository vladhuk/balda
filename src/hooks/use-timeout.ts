import { useState } from 'react';

export function useTimeout(duration: number): {
  isRunning: boolean;
  run: (callback?: () => void) => void;
} {
  const [isRunning, setIsRunning] = useState(false);

  return {
    isRunning,
    run: (callback) => {
      setIsRunning(true);
      setTimeout(() => {
        setIsRunning(false);
        callback?.();
      }, duration);
    },
  };
}
