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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  difficulty: Difficulty;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
  gameMode: GameMode;
  setGameMode: Dispatch<SetStateAction<GameMode>>;
  names: string[];
  setNames: Dispatch<SetStateAction<string[]>>;
  open: boolean;
  onStart: () => void;
}

export const MainMenu: FC<Props> = ({
  difficulty,
  setDifficulty,
  gameMode,
  setGameMode,
  names,
  setNames,
  open,
  onStart,
}) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: styles.dialogPaper,
      }}
      slotProps={{
        backdrop: { style: { backdropFilter: 'blur(5px)' } },
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
        <Button size="large" onClick={onStart}>
          Почати!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
