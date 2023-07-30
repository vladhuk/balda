import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Box, Button } from '@mui/material';
import * as styles from 'components/Game/components/EndTurnButton/styles';
import { useCommonTranslation } from 'hooks/use-common-translation';
import { FC } from 'react';

interface Props {
  onClick: () => void;
  endGame?: boolean;
  botsTurn?: boolean;
}

export const EndTurnButton: FC<Props> = ({ onClick, endGame, botsTurn }) => {
  const t = useCommonTranslation('endTurnButton');

  const getMessage = () => {
    if (endGame) {
      return t('returnToMenu');
    }
    if (botsTurn) {
      return t('opponentsTurn');
    }
    return t('endTurn');
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
