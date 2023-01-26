import { Box } from '@mui/material';
import { Difficulty } from 'enums/difficulty.enum';
import { Game } from 'components/Game/Game';
import { GameMode } from 'enums/game-mode.enum';
import { MainMenu } from 'components/MainMenu/MainMenu';
import React, { FC, useState } from 'react';

export const App: FC = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.MEDIUM);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.WITH_BOT);
  const [names, setNames] = useState(['', '']);
  const [isMenuOpened, setIsMenuOpened] = useState(true);

  const onStart = () => {
    if (gameMode === GameMode.WITH_BOT) {
      setNames(['Ти', 'Бот 🤖']);
    }
    setIsMenuOpened(false);
  };

  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <MainMenu
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        gameMode={gameMode}
        setGameMode={setGameMode}
        names={names}
        setNames={setNames}
        onStart={onStart}
        open={isMenuOpened}
      />
      <Game
        pause={isMenuOpened}
        names={names}
        gameMode={gameMode}
        difficulty={difficulty}
        openMenu={() => setIsMenuOpened(true)}
      />
    </Box>
  );
};
