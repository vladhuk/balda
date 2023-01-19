import { Key } from 'enums/key.enum';
import { useOnKeyDown } from 'hooks/use-on-key-down';

export function useKeyboard({
  checkWord,
  undo,
  clearSelection,
  isPause,
}: {
  checkWord: () => void;
  undo: () => void;
  clearSelection: () => void;
  isPause?: boolean;
}): void {
  useOnKeyDown({
    keys: [Key.ENTER],
    callback: checkWord,
    isPause,
  });
  useOnKeyDown({
    keys: [Key.BACKSPACE],
    callback: undo,
    isPause,
  });
  useOnKeyDown({
    keys: [Key.ESCAPE],
    callback: () => clearSelection(),
    isPause,
  });
}
