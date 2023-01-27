export function checkIsTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
