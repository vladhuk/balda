import { FIELD_SIZE, LETTERS_ZOOM_DURATION } from 'components/Game/constants';
import { getRandomWord } from 'utils/word/get-random-word';
import { isEmpty } from 'lodash';
import { useDictionary } from 'providers/DictionaryProvider';
import { useEffect, useState } from 'react';

export function useAnimatedStart({
  isPause,
  onRestart,
}: {
  isPause?: boolean;
  onRestart?: () => void;
}): {
  isZoomIn: boolean;
  isZoomOut: boolean;
  initialWord: string;
} {
  const { dictionary } = useDictionary();

  const [initialWord, setInitialWord] = useState('');
  const [isZoomOut, setIsZoomOut] = useState(false);
  const [isZoomIn, setIsZoomIn] = useState(false);

  useEffect(() => {
    if (isPause) {
      return;
    }

    const newInitialWord = getRandomWord(dictionary, FIELD_SIZE) ?? '';

    if (isEmpty(initialWord)) {
      setIsZoomIn(true);
      setInitialWord(newInitialWord);
      return;
    }

    onRestart?.();
    setIsZoomOut(true);
    setTimeout(() => {
      setIsZoomOut(false);
      setIsZoomIn(true);
      setInitialWord(newInitialWord);
    }, LETTERS_ZOOM_DURATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPause]);

  useEffect(() => {
    if (isZoomIn) {
      setTimeout(() => {
        setIsZoomIn(false);
      }, LETTERS_ZOOM_DURATION);
    }
  }, [isZoomIn]);

  return {
    isZoomIn,
    isZoomOut,
    initialWord,
  };
}
