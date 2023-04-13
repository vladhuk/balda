import { useEffect, useState } from 'react';

export function useOnFirstRender<T>(getValue: () => T): T | undefined;
export function useOnFirstRender<T>(getValue: () => T, initialValue: T): T;
export function useOnFirstRender<T>(
  getValue: () => T,
  initialValue?: T,
): T | undefined {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    setState(getValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
