import { Key } from 'enums/key.enum';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

type OnKeyDownHandler = (event: KeyboardEvent) => void;

const callbacks = new Map<string, OnKeyDownHandler>();

export function useOnKeyDown<T extends Key[], K extends Key = T[number]>({
  keys,
  callback,
  disabled,
}: {
  keys: T;
  callback: (key: K) => void;
  disabled?: boolean;
}): void {
  const callbackId = keys.join(',');

  useEffect(() => {
    if (disabled) {
      return () => {};
    }

    callbacks.set(callbackId, ({ key }) => {
      if (isEmpty(keys) || keys.includes(key as Key)) {
        callback(key as K);
      }
    });

    document.onkeydown = (event) =>
      Array.from(callbacks.values()).forEach((cb) => cb(event));

    return () => {
      callbacks.delete(callbackId);
    };
  }, [callback, keys, callbackId, disabled]);
}
