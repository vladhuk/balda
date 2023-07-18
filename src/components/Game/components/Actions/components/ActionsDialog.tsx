import {
  Backdrop,
  Box,
  Button,
  ClickAwayListener,
  Fab,
  Slide,
  Zoom,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import { Tutorial } from 'components/_common/Tutorial/Tutorial';
import { useCommonTranslation } from 'hooks/use-common-translation';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';

interface Props {
  open: boolean;
  onClose: () => void;
  onSkipTurn: () => void;
  onCapitulate: () => void;
}

export const ActionsDialog: FC<Props> = ({
  onSkipTurn,
  open,
  onClose,
  onCapitulate,
}) => {
  const t = useCommonTranslation('actions');
  const slideContainerRef = useRef(null);
  const [isTutorialOpened, setIsTutorialOpened] = useState(false);

  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer,
        flexDirection: 'column',
        justifyContent: 'start',
        pt: 28,
      }}
    >
      <ClickAwayListener mouseEvent="onMouseUp" onClickAway={onClose}>
        <Box mb={9}>
          <Slide in={open} direction="up" container={slideContainerRef.current}>
            <Box mb={3}>
              <Button
                size="large"
                color="error"
                endIcon={<SkipNextIcon />}
                onClick={onSkipTurn}
                fullWidth
              >
                {t('skipTurn')}
              </Button>
            </Box>
          </Slide>
          <Slide in={open} direction="up" container={slideContainerRef.current}>
            <Box mb={3}>
              <Button
                size="large"
                color="error"
                endIcon={<FlagIcon />}
                onClick={onCapitulate}
                fullWidth
              >
                {t('surrender')}
              </Button>
            </Box>
          </Slide>
          <Slide in={open} direction="up" container={slideContainerRef.current}>
            <div>
              <Button
                size="large"
                color="secondary"
                endIcon={<HelpOutlineIcon />}
                onClick={() => setIsTutorialOpened(true)}
                fullWidth
              >
                {t('tutorial')}
              </Button>
            </div>
          </Slide>
          <Tutorial
            open={isTutorialOpened}
            onClose={() => setIsTutorialOpened(false)}
          />
        </Box>
      </ClickAwayListener>
      <Zoom in={open}>
        <Fab ref={slideContainerRef} size="large" color="secondary">
          <CloseIcon />
        </Fab>
      </Zoom>
    </Backdrop>
  );
};
