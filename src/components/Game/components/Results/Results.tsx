import * as styles from 'components/Game/components/Results/styles';
import { Backdrop, Box, Button, Typography } from '@mui/material';
import { Confetti } from 'components/Game/components/Results/utils/confetti';
import { FC, useEffect, useState } from 'react';
import { useOnFirstRender } from 'hooks/use-on-first-render';

interface Props {
  winnerName: string;
  endGame?: boolean;
  draw?: boolean;
}

export const Results: FC<Props> = ({ winnerName, endGame, draw }) => {
  const confetti = useOnFirstRender(
    () => new Confetti(500 / window.innerHeight),
  );
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(Boolean(endGame));
  }, [endGame]);

  useEffect(() => {
    if (draw) {
      return;
    }
    if (isOpened) {
      confetti?.fire();
      return;
    }
    confetti?.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  const emoji = <Typography variant="h2">🎊</Typography>;

  return (
    <Backdrop
      open={isOpened}
      onClick={() => setIsOpened(false)}
      sx={styles.backdrop}
      transitionDuration={500}
    >
      <Typography variant="h3" fontWeight={600} mb={2}>
        {draw ? 'Нічия 🗿' : 'Переможець'}
      </Typography>
      {!draw && (
        <Box display="flex" justifyContent="center">
          {emoji}
          <Typography variant="h2" color="primary" sx={styles.name}>
            {winnerName}
          </Typography>
          {emoji}
        </Box>
      )}
      <Button size="large" sx={{ mt: 15 }}>
        Зрозуміло
      </Button>
    </Backdrop>
  );
};
