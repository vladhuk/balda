import * as styles from 'components/Feedback/styles';
import { Box, IconButton, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import React, { FC } from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';

export const Feedback: FC = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.feedback}>
        <Typography mx={1} variant="body2">
          Зворотній звʼязок:
        </Typography>
        <IconButton size="small" href="mailto:vladhookovskiy@gmail.com">
          <EmailIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" href="https://t.me/vladhuk" target="_blank">
          <TelegramIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
