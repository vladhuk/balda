import * as styles from 'components/MainMenu/components/LanguageSelect/styles';
import { FC } from 'react';
import { Item } from 'components/MainMenu/components/LanguageSelect/types/item.interface';
import { ItemContent } from 'components/MainMenu/components/LanguageSelect/components/ItemContent';
import { Locale } from 'enums/locale.enum';
import { MenuItem, Select } from '@mui/material';
import { StaticImageData } from 'next/image';
import { isUndefined } from 'lodash';
import { useChangeLocale } from 'hooks/use-change-locale';
import { useIsOnline } from 'hooks/use-is-online';
import { useLocale } from 'lib/i18next/hooks/use-locale';
import uk from 'components/MainMenu/components/LanguageSelect/assets/uk.svg';
import us from 'components/MainMenu/components/LanguageSelect/assets/us.svg';

const items: Item[] = [
  {
    value: Locale.UK,
    icon: uk as StaticImageData,
    label: 'Українська',
  },
  {
    value: Locale.EN,
    icon: us as StaticImageData,
    label: 'English',
  },
];

export const LanguageSelect: FC = () => {
  const changeLocale = useChangeLocale();
  const locale = useLocale();
  const isOnline = useIsOnline();

  return (
    <Select
      value={locale}
      size="small"
      sx={styles.select}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onChange={(event) => changeLocale(event.target.value as Locale)}
      renderValue={(value) => {
        const itemToRender = items.find((item) => item.value === value);

        if (isUndefined(itemToRender)) {
          return null;
        }

        return (
          <ItemContent value={itemToRender.value} icon={itemToRender.icon} />
        );
      }}
    >
      {items.map(({ value, icon, label }) => {
        const isOfflineAndNotSelected = !isOnline && value !== locale;

        return (
          <MenuItem
            key={value}
            value={value}
            disabled={isOfflineAndNotSelected}
          >
            <ItemContent
              value={value}
              icon={icon}
              label={label}
              offline={isOfflineAndNotSelected}
            />
          </MenuItem>
        );
      })}
    </Select>
  );
};
