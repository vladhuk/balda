import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import { Tutorial } from 'components/_common/Tutorial/Tutorial';
import { Feedback } from 'components/MainMenu/components/Feedback/Feedback';
import { LanguageSelect } from 'components/MainMenu/components/LanguageSelect/LanguageSelect';
import { useTransitionDuration } from 'components/MainMenu/hooks/use-transition-duration';
import { AccordionDetails } from 'components/MainMenu/styled';
import * as styles from 'components/MainMenu/styles';
import { Difficulty } from 'enums/difficulty.enum';
import { GameMode } from 'enums/game-mode.enum';
import { useCommonTranslation } from 'hooks/use-common-translation';
import { useIsUpMd } from 'hooks/use-is-up-md';
import { FC, useState } from 'react';

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
  const t = useCommonTranslation('mainMenu');
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
      <DialogTitle component="div" textAlign="center">
        <Typography
          component="h1"
          variant="h4"
          color="primary"
          fontWeight={600}
        >
          {t('title')}
        </Typography>
        <Typography component="h2" variant="h5">
          {t('subtitle')}
        </Typography>
        <LanguageSelect />
      </DialogTitle>
      <DialogContent sx={{ height: [286, 292, 217], pb: 0, mb: 1 }}>
        <Accordion
          expanded={gameMode === GameMode.TOGETHER}
          onChange={(_, expanded) => expanded && setGameMode(GameMode.TOGETHER)}
        >
          <AccordionSummary
            component={Typography}
            variant="h6"
            sx={{ fontWeight: 400 }}
            expandIcon={<ExpandMoreIcon />}
          >
            {t('options.together.title')}
          </AccordionSummary>
          <AccordionDetails disablePaddingTop>
            {names.map((name, nameIndex) => (
              <TextField
                // eslint-disable-next-line react/no-array-index-key
                key={nameIndex}
                size="small"
                color="secondary"
                variant="standard"
                label={`${t('options.together.playerLabel')} ${nameIndex + 1}`}
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
            sx={{ fontWeight: 400 }}
            expandIcon={<ExpandMoreIcon />}
          >
            {t('options.bot.title')}
          </AccordionSummary>
          <AccordionDetails>
            {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map(
              (value) => (
                <Chip
                  key={value}
                  color="secondary"
                  variant={difficulty === value ? 'filled' : 'outlined'}
                  onClick={() => setDifficulty(value)}
                  label={t(`options.bot.difficulty.${value}`)}
                  clickable
                />
              ),
            )}
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions sx={styles.dialogActions} disableSpacing>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          component="button"
          color="secondary"
          fontSize="small"
          sx={{ mb: 2 }}
          onClick={() => setIsTutorialOpened(true)}
        >
          {t('tutorial')}
        </Link>
        <Button size="large" onClick={onClickStart} fullWidth={!isUpMd}>
          {t('start')}
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
