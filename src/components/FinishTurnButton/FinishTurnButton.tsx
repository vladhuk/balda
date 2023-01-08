import * as styles from 'components/FinishTurnButton/styles';
import { Box, Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React, { FC } from 'react';

interface Props {
  onClick: () => void;
}

export const FinishTurnButton: FC<Props> = ({ onClick }) => {
  return (
    <Box sx={styles.container}>
      <Button
        size="large"
        endIcon={<KeyboardReturnIcon />}
        onClick={onClick}
        fullWidth
      >
        Завершити хід
      </Button>
    </Box>
  );
};
