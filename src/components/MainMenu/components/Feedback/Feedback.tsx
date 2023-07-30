import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import * as styles from 'components/MainMenu/components/Feedback/styles';
import { useCommonTranslation } from 'hooks/use-common-translation';
import { FC } from 'react';

export const Feedback: FC = () => {
  const t = useCommonTranslation();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.feedback}>
        <Typography mx={1} variant="body2">
          {t('feedback')}
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
          href="https://github.com/vladhuk/balda"
          target="_blank"
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
