import { useOnFirstRender } from 'hooks/use-on-first-render';

export function useIsTouchDevice(): boolean {
  return useOnFirstRender(
    () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    false,
  );
}
