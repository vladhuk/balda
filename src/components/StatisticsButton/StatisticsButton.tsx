import { Button } from '@mui/material';
import { Drawer } from 'components/StatisticsButton/components/Drawer/Drawer';
import { Player } from 'types/player.interface';
import React, { FC, useState } from 'react';

interface Props {
  players: Player[];
  turn: number;
}

export const StatisticsButton: FC<Props> = ({ players, turn }) => {
  const [isStatisticOpened, setIsStatisticOpened] = useState(false);

  return (
    <>
      <Button
        variant="text"
        size="small"
        color="secondary"
        sx={{ mt: 2, display: { md: 'none' } }}
        onClick={() => setIsStatisticOpened(true)}
      >
        Переглянути статистику
      </Button>
      <Drawer
        open={isStatisticOpened}
        setOpen={setIsStatisticOpened}
        players={players}
        turn={turn}
      />
    </>
  );
};
