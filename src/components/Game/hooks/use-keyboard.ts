import { Key } from 'enums/key.enum';
import { useOnKeyDown } from 'hooks/use-on-key-down';

export function useKeyboard({
  checkWord,
  undo,
  clearSelection,
  disabled,
}: {
  checkWord: () => void;
  undo: () => void;
  clearSelection: () => void;
  disabled?: boolean;
}): void {
  useOnKeyDown({
    keys: [Key.ENTER],
    callback: checkWord,
    disabled,
  });
  useOnKeyDown({
    keys: [Key.BACKSPACE],
    callback: undo,
    disabled,
  });
  useOnKeyDown({
    keys: [Key.ESCAPE],
    callback: () => clearSelection(),
    disabled,
  });
}
