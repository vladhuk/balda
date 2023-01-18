import { Key } from 'enums/key.enum';
import { useOnKeyDown } from 'hooks/use-on-key-down';

export function useKeyboard({
  checkWord,
  undo,
  clearSelection,
}: {
  checkWord: () => void;
  undo: () => void;
  clearSelection: () => void;
}): void {
  useOnKeyDown({
    keys: [Key.ENTER],
    callback: checkWord,
  });
  useOnKeyDown({
    keys: [Key.BACKSPACE],
    callback: undo,
  });
  useOnKeyDown({
    keys: [Key.ESCAPE],
    callback: () => clearSelection(),
  });
}
