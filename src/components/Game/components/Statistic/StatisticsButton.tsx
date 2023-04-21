import { Button } from '@mui/material';
import { Drawer } from 'components/Game/components/Statistic/components/Drawer/Drawer';
import { FC, useState } from 'react';
import { Player } from 'types/player.interface';

interface Props {
  players: Player[];
  turn: number;
}

const StatisticsButton: FC<Props> = ({ players, turn }) => {
  const [isStatisticOpened, setIsStatisticOpened] = useState(false);

  return (
    <>
      <Button
        variant="text"
        size="small"
        color="secondary"
        sx={{ mt: 2 }}
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

// eslint-disable-next-line import/no-default-export
export default StatisticsButton;
