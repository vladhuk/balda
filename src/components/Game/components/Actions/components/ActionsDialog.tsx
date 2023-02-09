import { Backdrop, Box, Button, Fab, Slide, Zoom } from '@mui/material';
import { Tutorial } from 'components/_common/Tutorial/Tutorial';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React, { FC, useRef, useState } from 'react';
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
  const slideContainerRef = useRef(null);
  const [isTutorialOpened, setIsTutorialOpened] = useState(false);

  return (
    <>
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer,
          flexDirection: 'column',
          justifyContent: 'start',
          pt: 28,
        }}
      >
        <div>
          <Slide in={open} direction="up" container={slideContainerRef.current}>
            <Box mb={3}>
              <Button
                size="large"
                color="error"
                endIcon={<SkipNextIcon />}
                onClick={onSkipTurn}
                fullWidth
              >
                Пропустити хід
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
                Здатися
              </Button>
            </Box>
          </Slide>
          <Slide in={open} direction="up" container={slideContainerRef.current}>
            <Box mb={9}>
              <Button
                size="large"
                color="secondary"
                endIcon={<HelpOutlineIcon />}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsTutorialOpened(true);
                }}
                fullWidth
              >
                Як грати
              </Button>
            </Box>
          </Slide>
        </div>
        <Zoom in={open}>
          <Fab
            ref={slideContainerRef}
            size="large"
            color="secondary"
            onClick={onClose}
          >
            <CloseIcon />
          </Fab>
        </Zoom>
      </Backdrop>
      <Tutorial
        open={isTutorialOpened}
        onClose={() => setIsTutorialOpened(false)}
      />
    </>
  );
};
