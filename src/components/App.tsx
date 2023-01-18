import { Box } from '@mui/material';
import { Game } from 'components/Game/Game';
import React, { FC } from 'react';

export const App: FC = () => {
  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <Game />
    </Box>
  );
};
