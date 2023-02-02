import { useEffect, useState } from 'react';

export function useTransitionDuration(): number | undefined {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return isFirstRender ? 0 : undefined;
}
