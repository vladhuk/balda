export function blurActiveInput() {
  const activeElement = document.activeElement as HTMLElement;

  if (activeElement.tagName === 'INPUT') {
    activeElement.blur();
  }
}
