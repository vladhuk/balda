import { Difficulty } from 'enums/difficulty.enum';
import { Game } from 'components/Game/Game';
import { GameMode } from 'enums/game-mode.enum';
import { MainContainer } from 'components/App/styled';
import { MainMenu } from 'components/MainMenu/MainMenu';
import React, { FC, useState } from 'react';

export const App: FC = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.MEDIUM);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.WITH_BOT);
  const [names, setNames] = useState(['', '']);
  const [isMenuOpened, setIsMenuOpened] = useState(true);

  const onStart = (options: {
    difficulty: Difficulty;
    gameMode: GameMode;
    names: string[];
  }) => {
    setGameMode(options.gameMode);
    setDifficulty(options.difficulty);

    if (options.gameMode === GameMode.TOGETHER) {
      setNames(options.names);
    }
    if (options.gameMode === GameMode.WITH_BOT) {
      setNames(['Ти', 'Бот 🤖']);
    }

    setIsMenuOpened(false);
  };

  return (
    <MainContainer blur={isMenuOpened}>
      <MainMenu onStart={onStart} open={isMenuOpened} />
      <Game
        pause={isMenuOpened}
        names={names}
        gameMode={gameMode}
        difficulty={difficulty}
        openMenu={() => setIsMenuOpened(true)}
      />
    </MainContainer>
  );
};
