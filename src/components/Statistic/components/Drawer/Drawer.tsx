import { Box, SwipeableDrawer } from '@mui/material';
import { Player } from 'types/player.interface';
import { Puller } from 'components/Statistic/components/Drawer/styled';
import { ScoreOrientation } from 'components/Statistic/enums/score-orientation.enum';
import { Statistic } from 'components/Statistic/Statistic';
import React, { Dispatch, FC } from 'react';

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
      disableBackdropTransition
      disableSwipeToOpen
      PaperProps={{
        sx: {
          height: '60%',
          borderTopRightRadius: '10px',
          borderTopLeftRadius: '10px',
        },
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
