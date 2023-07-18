import { Locale } from 'enums/locale.enum';
import { StaticImageData } from 'next/image';

export interface Item {
  value: Locale;
  icon: StaticImageData;
  label: string;
}
