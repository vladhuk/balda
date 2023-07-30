import WifiOffIcon from '@mui/icons-material/WifiOff';
import { Box, Typography } from '@mui/material';
import { Item } from 'components/MainMenu/components/LanguageSelect/types/item.interface';
import Image from 'next/image';
import { FC } from 'react';
import { isNotUndefined } from 'utils/null/is-not-undefined';

type Props = Omit<Item, 'label'> &
  Partial<Pick<Item, 'label'>> & {
    offline?: boolean;
  };

export const ItemContent: FC<Props> = ({ value, icon, label, offline }) => {
  return (
    <>
      {offline ? (
        <WifiOffIcon />
      ) : (
        <Box
          component={Image}
          src={icon}
          alt={value}
          sx={{
            width: 24,
            height: 1,
          }}
        />
      )}
      {isNotUndefined(label) && (
        <Typography
          fontWeight={500}
          fontSize="small"
          color="text.secondary"
          ml={1}
        >
          {label}
        </Typography>
      )}
    </>
  );
};
