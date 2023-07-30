import { Button } from '@mui/material';
import { Drawer } from 'components/Game/components/Statistic/components/Drawer/Drawer';
import { useCommonTranslation } from 'hooks/use-common-translation';
import { FC, useState } from 'react';
import { Player } from 'types/player.interface';

interface Props {
  players: Player[];
  turn: number;
}

const StatisticsButton: FC<Props> = ({ players, turn }) => {
  const t = useCommonTranslation();

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
        {t('viewStatistics')}
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
