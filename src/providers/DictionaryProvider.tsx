import { Locale } from 'enums/locale.enum';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { isNotUndefined } from 'utils/null/is-not-undefined';

interface Context {
  dictionary: string[];
  loadLocale: (locale: Locale) => Promise<void>;
}

interface Props extends PropsWithChildren<unknown> {
  defaultLocale?: Locale;
}

function importDictionary(locale: Locale) {
  switch (locale) {
    case Locale.EN:
      return import('data/nouns-en.json');
    case Locale.UK:
    default:
      return import('data/nouns-uk.json');
  }
}

const DictionaryContext = createContext<Context>({
  dictionary: [],
  loadLocale: () => Promise.resolve(),
});

export const DictionaryProvider: FC<Props> = ({ defaultLocale, children }) => {
  const [dictionary, setDictionary] = useState<string[]>([]);

  const loadLocale = async (locale: Locale) => {
    const { default: importedData } = await importDictionary(locale);
    setDictionary(importedData);
  };

  useEffect(() => {
    if (isNotUndefined(defaultLocale)) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      loadLocale(defaultLocale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo<Context>(
    () => ({ dictionary, loadLocale }),
    [dictionary],
  );

  return (
    <DictionaryContext.Provider value={contextValue}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => useContext(DictionaryContext);
