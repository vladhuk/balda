import * as styles from 'components/Game/components/FinishTurnButton/styles';
import { Box, Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React, { FC } from 'react';

interface Props {
  onClick: () => void;
  endGame?: boolean;
}

export const FinishTurnButton: FC<Props> = ({ onClick, endGame }) => {
  return (
    <Box sx={styles.container}>
      <Button
        size="large"
        endIcon={<KeyboardReturnIcon />}
        onClick={onClick}
        color={endGame ? 'secondary' : 'primary'}
        fullWidth
      >
        {endGame ? 'Повернутися до меню' : 'Завершити хід'}
      </Button>
    </Box>
  );
};
