import { isEmpty } from 'lodash';

export function isNotEmpty<T>(value: T): boolean {
  return !isEmpty(value);
}
