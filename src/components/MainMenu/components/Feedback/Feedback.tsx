import * as styles from 'components/MainMenu/components/Feedback/styles';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
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
        <Divider orientation="vertical" sx={{ height: '60%', mx: 0.75 }} />
        <IconButton
          size="small"
          href="https://github.com/hraimo/balda"
          target="_blank"
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};