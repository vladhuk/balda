import * as styles from 'components/Game/components/FinishTurnButton/styles';
import { Box, Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React, { FC } from 'react';

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

  return (
    <Box sx={styles.container}>
      <Button
        size="large"
        endIcon={botsTurn ? null : <KeyboardReturnIcon />}
        onClick={onClick}
        color={endGame ? 'secondary' : 'primary'}
        disabled={!endGame && botsTurn}
        fullWidth
      >
        {getMessage()}
      </Button>
    </Box>
  );
};
