import { Box, SwipeableDrawer } from '@mui/material';
import { Puller } from 'components/Game/components/Statistic/components/Drawer/styled';
import * as styles from 'components/Game/components/Statistic/components/Drawer/styles';
import { ScoreOrientation } from 'components/Game/components/Statistic/enums/score-orientation.enum';
import { Statistic } from 'components/Game/components/Statistic/Statistic';
import { Dispatch, FC } from 'react';
import { Player } from 'types/player.interface';

interface Props {
  open: boolean;
  setOpen: Dispatch<boolean>;
  players: Player[];
  turn: number;
}

export const Drawer: FC<Props> = ({ open, setOpen, players, turn }) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      disableSwipeToOpen
      PaperProps={{
        square: false,
        sx: styles.paper,
      }}
    >
      <Puller />
      <Box display="flex" justifyContent="space-around" mt={2}>
        <Statistic
          player={players[0]}
          scoreOrientation={ScoreOrientation.LEFT}
          active={turn === 0}
        />
        <Statistic
          player={players[1]}
          scoreOrientation={ScoreOrientation.RIGHT}
          active={turn === 1}
        />
      </Box>
    </SwipeableDrawer>
  );
};
