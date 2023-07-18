import { Actions } from 'components/Game/components/Actions/Actions';
import { Box } from '@mui/material';
import { Cell } from 'types/cell.interface';
import { Coord } from 'helpers/coord';
import { Difficulty } from 'enums/difficulty.enum';
import { EndTurnButton } from 'components/Game/components/EndTurnButton/EndTurnButton';
import { FC, useState } from 'react';
import { Field } from 'components/Game/components/Field/Field';
import { GameMode } from 'enums/game-mode.enum';
import { HideUpMd } from 'components/_common/HideUpMd';
import { InputError } from 'components/Game/enums/input-error.enum';
import {
  LETTERS_SHAKING_DURATION,
  LETTER_ROTATING_DURATION,
} from 'components/Game/constants';
import { Results } from 'components/Game/components/Results/Results';
import { ScoreOrientation } from 'components/Game/components/Statistic/enums/score-orientation.enum';
import { ShowUpMd } from 'components/_common/ShowUpMd';
import { SideSection } from 'components/Game/styled';
import { Statistic } from 'components/Game/components/Statistic/Statistic';
import { StatisticsButtonLazy } from 'components/Game/components/Statistic/StatisticsButton.lazy';
import { TopScores } from 'components/Game/components/TopScores';
import { WordPreview } from 'components/Game/components/WordPreview/WordPreview';
import { blurActiveInput } from 'utils/blur-active-input';
import { checkIsFieldFilled } from 'components/Game/utils/check-is-field-filled';
import { checkIsWordExist } from 'utils/word/check-is-word-exist';
import { getWordsFromPlayers } from 'components/Game/utils/get-words-from-players';
import { isEmpty, isNull } from 'lodash';
import { isNotNull } from 'utils/null/is-not-null';
import { mapCellsToWord } from 'components/Game/utils/map-cells-to-word';
import { useAnimatedStart } from 'components/Game/hooks/use-animated-start';
import { useBotsTurn } from 'components/Game/hooks/use-bots-turn/use-bots-turn';
import { useDictionary } from 'providers/DictionaryProvider';
import { useField } from 'components/Game/hooks/use-field';
import { useInputError } from 'components/Game/hooks/use-input-error';
import { useKeyboard } from 'components/Game/hooks/use-keyboard';
import { useStatistic } from 'components/Game/hooks/use-statistic';
import { useTimeout } from 'hooks/use-timeout';

interface Props {
  pause?: boolean;
  names: string[];
  gameMode: GameMode;
  difficulty: Difficulty;
  openMenu: () => void;
}

export const Game: FC<Props> = ({
  pause,
  names,
  gameMode,
  difficulty,
  openMenu,
}) => {
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [enteredLetterCoord, setEnteredLetterCoord] = useState<Coord | null>(
    null,
  );
  const [highlightedCoords, setHighlightedCoords] = useState<Coord[]>([]);

  const { dictionary } = useDictionary();
  const { error, setError, resetError } = useInputError();
  const { isRunning: isLettersShaking, run: shakeLetters } = useTimeout(
    LETTERS_SHAKING_DURATION,
  );
  const { isRunning: isEnteredLetterRotating, run: rotateLetter } = useTimeout(
    LETTER_ROTATING_DURATION,
  );
  const { initialWord, isZoomIn, isZoomOut } = useAnimatedStart({
    isPause: pause,
    onRestart: () => {
      setSelectedCells([]);
      setEnteredLetterCoord(null);
      resetError();
    },
  });
  const { cells, setFieldCell } = useField(initialWord);
  const {
    players,
    isDraw,
    isBotsTurn,
    turn,
    isEndGame,
    endGame,
    skipTurn,
    finishTurn,
  } = useStatistic({
    names,
    gameMode,
    isPause: Boolean(pause),
    isFieldFilled: checkIsFieldFilled(cells) && isNull(enteredLetterCoord),
  });

  const lastSelected = selectedCells[selectedCells.length - 1];
  const winner = players[0].score > players[1].score ? players[0] : players[1];

  const getUsedWords = () => getWordsFromPlayers(players).concat(initialWord);

  const undo = () => {
    if (
      isNotNull(enteredLetterCoord) &&
      lastSelected?.coord.equals(enteredLetterCoord)
    ) {
      setFieldCell(enteredLetterCoord, '');
      setEnteredLetterCoord(null);
    }

    setSelectedCells((prev) => prev.slice(0, prev.length - 1));
    resetError();
    blurActiveInput();
  };

  const clearSelection = (options?: { keepEntered?: boolean }) => {
    setSelectedCells([]);
    resetError();
    blurActiveInput();

    if (isNull(enteredLetterCoord)) {
      return;
    }
    if (options?.keepEntered) {
      rotateLetter(() => setEnteredLetterCoord(null));
      return;
    }

    setFieldCell(enteredLetterCoord, '');
    setEnteredLetterCoord(null);
  };

  const handleError = (inputError: InputError) => {
    shakeLetters();
    setError(inputError);
  };

  const onCheckWord = () => {
    if (isNull(enteredLetterCoord) || isEmpty(lastSelected?.value)) {
      handleError(InputError.LETTER_NOT_ENTERED);
      return;
    }

    const word = mapCellsToWord(selectedCells);

    if (getUsedWords().includes(word)) {
      handleError(InputError.WORD_HAS_BEEN_ALREADY_ENTERED);
      return;
    }
    if (!checkIsWordExist(dictionary, word)) {
      handleError(InputError.WORD_DOES_NOT_EXIST);
      return;
    }

    finishTurn({
      letters: word,
      coords: selectedCells.map(({ coord }) => coord),
    });
    clearSelection({ keepEntered: true });
  };

  const onSkipTurn = () => {
    skipTurn();
    clearSelection();
  };

  useBotsTurn({
    cells,
    isBotsTurn,
    onFinishTurn: onCheckWord,
    setEnteredLetterCoord,
    setFieldCell,
    setSelectedCells,
    difficulty,
    usedWords: getUsedWords(),
    endGame,
  });

  useKeyboard({
    checkWord: onCheckWord,
    clearSelection,
    undo,
    disabled: pause || isBotsTurn,
  });

  return (
    <>
      <Box display="flex" justifyContent="center">
        <ShowUpMd>
          <SideSection stick="right">
            <Statistic
              player={players[0]}
              scoreOrientation={ScoreOrientation.RIGHT}
              active={turn === 0}
              setHighlightedCoords={setHighlightedCoords}
            />
          </SideSection>
        </ShowUpMd>
        <Box display="flex" flexDirection="column" alignItems="center" pt={1.5}>
          <TopScores players={players} turn={turn} />
          <WordPreview
            enteredLetterCoord={enteredLetterCoord}
            selectedCells={selectedCells}
            error={error}
            lettersShaking={isLettersShaking}
          />
          <Field
            cells={cells}
            setFieldCell={setFieldCell}
            enteredLetterCoord={enteredLetterCoord}
            setEnteredLetterCoord={setEnteredLetterCoord}
            selectedCells={selectedCells}
            setSelectedCells={setSelectedCells}
            resetError={resetError}
            undo={undo}
            enteredLetterRotating={isEnteredLetterRotating}
            highlightedCoords={highlightedCoords}
            botsTurn={isBotsTurn}
            lettersZoomIn={isZoomIn}
            lettersZoomOut={isZoomOut}
          />
          <Actions
            onClearSelection={clearSelection}
            onSkipTurn={onSkipTurn}
            onUndo={undo}
            onCapitulate={openMenu}
            disabled={isBotsTurn || isEndGame}
          />
          <HideUpMd>
            <StatisticsButtonLazy players={players} turn={turn} />
          </HideUpMd>
          <EndTurnButton
            onClick={isEndGame ? openMenu : onCheckWord}
            botsTurn={isBotsTurn}
            endGame={isEndGame}
          />
        </Box>
        <ShowUpMd>
          <SideSection stick="left">
            <Statistic
              player={players[1]}
              scoreOrientation={ScoreOrientation.LEFT}
              active={turn === 1}
              setHighlightedCoords={setHighlightedCoords}
            />
          </SideSection>
        </ShowUpMd>
      </Box>
      <Results winnerName={winner.name} draw={isDraw} endGame={isEndGame} />
    </>
  );
};
