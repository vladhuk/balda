import { useTranslation } from 'next-i18next';

export function useCommonTranslation(keyPrefix?: string) {
  return useTranslation('common', { keyPrefix }).t;
}
