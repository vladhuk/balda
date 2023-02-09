import * as styles from 'components/MainMenu/styles';
import {
  Accordion,
  AccordionSummary,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { AccordionDetails } from 'components/MainMenu/styled';
import { Difficulty } from 'enums/difficulty.enum';
import { Feedback } from 'components/Feedback/Feedback';
import { GameMode } from 'enums/game-mode.enum';
import { Tutorial } from 'components/_common/Tutorial/Tutorial';
import { useIsUpMd } from 'hooks/use-is-up-md';
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
  const isUpMd = useIsUpMd();
  const transitionDuration = useTransitionDuration();

  const [difficulty, setDifficulty] = useState(Difficulty.MEDIUM);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.WITH_BOT);
  const [names, setNames] = useState(['', '']);
  const [isTutorialOpened, setIsTutorialOpened] = useState(false);

  const onClickStart = () => {
    onStart({ gameMode, names, difficulty });
  };

  return (
    <Dialog
      open={open}
      transitionDuration={transitionDuration}
      sx={{ height: [1, 1, '80%'] }}
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
      <DialogContent sx={{ height: [292, 292, 217], pb: 0, mb: 1 }}>
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
          <AccordionDetails disablePaddingTop>
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
          <AccordionDetails>
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
      <DialogActions sx={styles.dialogActions}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          component="button"
          color="secondary"
          sx={{ mb: 2, width: 1 }}
          onClick={() => setIsTutorialOpened(true)}
        >
          Як грати?
        </Link>
        <Button size="large" onClick={onClickStart} fullWidth={!isUpMd}>
          Почати!
        </Button>
      </DialogActions>
      <Tutorial
        open={isTutorialOpened}
        onClose={() => setIsTutorialOpened(false)}
      />
      <Feedback />
    </Dialog>
  );
};
