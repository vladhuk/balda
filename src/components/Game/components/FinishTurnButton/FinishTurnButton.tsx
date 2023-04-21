import * as styles from 'components/Game/components/FinishTurnButton/styles';
import { Box, Button } from '@mui/material';
import { FC } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

interface Props {
  onClick: () => void;
  endGame?: boolean;
  botsTurn?: boolean;
}

export const FinishTurnButton: FC<Props> = ({ onClick, endGame, botsTurn }) => {
  const getMessage = () => {
    if (endGame) {
      return 'Повернутися до меню';
    }
    if (botsTurn) {
      return 'Хід опонента...';
    }
    return 'Завершити хід';
  };

  const isBotsTurn = !endGame && botsTurn;

  return (
    <Box sx={styles.container}>
      <Button
        size="large"
        endIcon={isBotsTurn ? null : <KeyboardReturnIcon />}
        onClick={onClick}
        color={endGame ? 'secondary' : 'primary'}
        disabled={isBotsTurn}
        fullWidth
      >
        {getMessage()}
      </Button>
    </Box>
  );
};
