import { GameMode } from 'enums/game-mode.enum';
import { Player } from 'types/player.interface';
import { Word } from 'types/word.interface';
import { isEmpty } from 'lodash';
import { useCommonTranslation } from 'hooks/use-common-translation';
import { useState } from 'react';

export function usePlayers(props: { gameMode: GameMode; names: string[] }): {
  players: Player[];
  initPlayers: () => void;
  addWordToPlayer: (playerIndex: number, word: Word) => void;
} {
  const t = useCommonTranslation('playerAlias');

  const buildPlayers = (gameMode: GameMode, names: string[]) => {
    const adjustedNames =
      gameMode === GameMode.WITH_BOT ? [t('you'), `${t('bot')} 🤖`] : names;

    return adjustedNames.map((name, playerIndex) => ({
      name: isEmpty(name.trim()) ? `${t('player')} ${playerIndex + 1}` : name,
      words: [],
      score: 0,
    }));
  };

  const [players, setPlayers] = useState<Player[]>(
    buildPlayers(props.gameMode, props.names),
  );

  return {
    players,
    initPlayers: () => setPlayers(buildPlayers(props.gameMode, props.names)),
    addWordToPlayer: (playerIndex, word) =>
      setPlayers((prevPlayers) =>
        prevPlayers.map((player, i) => {
          if (i === playerIndex) {
            return {
              ...player,
              score: player.score + word.letters.length,
              words: [word, ...player.words],
            };
          }
          return player;
        }),
      ),
  };
}
