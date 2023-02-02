import * as styles from 'components/MainMenu/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { Difficulty } from 'enums/difficulty.enum';
import { GameMode } from 'enums/game-mode.enum';
import { useTransitionDuration } from 'components/MainMenu/hooks/use-transition-duration';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC, useState } from 'react';

interface Props {
  open: boolean;
  onStart: ({
    difficulty,
    gameMode,
    names,
  }: {
    difficulty: Difficulty;
    gameMode: GameMode;
    names: string[];
  }) => void;
}

export const MainMenu: FC<Props> = ({ open, onStart }) => {
  const [difficulty, setDifficulty] = useState(Difficulty.MEDIUM);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.WITH_BOT);
  const [names, setNames] = useState(['', '']);
  const transitionDuration = useTransitionDuration();

  const onClickStart = () => {
    onStart({ gameMode, names, difficulty });
  };

  return (
    <Dialog
      open={open}
      transitionDuration={transitionDuration}
      PaperProps={{
        sx: styles.dialogPaper,
      }}
    >
      <DialogTitle variant="h4" textAlign="center">
        Ласкаво просимо до гри{' '}
        <Typography
          component="span"
          variant="h4"
          color="primary"
          fontWeight={600}
        >
          БАЛДА
        </Typography>
        !
      </DialogTitle>
      <DialogContent sx={{ height: [312, 312, 237] }}>
        <Accordion
          expanded={gameMode === GameMode.TOGETHER}
          onChange={(_, expanded) => expanded && setGameMode(GameMode.TOGETHER)}
        >
          <AccordionSummary
            component={Typography}
            variant="h6"
            expandIcon={<ExpandMoreIcon />}
          >
            Гра вдвох
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            {names.map((name, nameIndex) => (
              <TextField
                // eslint-disable-next-line react/no-array-index-key
                key={nameIndex}
                size="small"
                color="secondary"
                variant="standard"
                label={`Гравець ${nameIndex + 1}`}
                value={name}
                onChange={(event) =>
                  setNames((prevNames) =>
                    prevNames.map((prevName, prevNameIndex) =>
                      nameIndex === prevNameIndex
                        ? event.target.value
                        : prevName,
                    ),
                  )
                }
              />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={gameMode === GameMode.WITH_BOT}
          onChange={(_, expanded) => expanded && setGameMode(GameMode.WITH_BOT)}
        >
          <AccordionSummary
            component={Typography}
            variant="h6"
            expandIcon={<ExpandMoreIcon />}
          >
            Гра з ботом
          </AccordionSummary>
          <AccordionDetails sx={styles.difficultyAccordionDetails}>
            {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map(
              (value) => (
                <Chip
                  key={value}
                  color="secondary"
                  variant={difficulty === value ? 'filled' : 'outlined'}
                  onClick={() => setDifficulty(value)}
                  label={value}
                  clickable
                />
              ),
            )}
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button size="large" onClick={onClickStart}>
          Почати!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
