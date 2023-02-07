import { Backdrop, Box, Button, Fab, Slide, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import React, { FC, useRef } from 'react';
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

  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: 'column',
        justifyContent: 'start',
        pt: 36,
      }}
    >
      <div>
        <Slide
          in={open}
          direction="up"
          timeout={300}
          container={slideContainerRef.current}
        >
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
        <Slide
          in={open}
          direction="up"
          timeout={300}
          container={slideContainerRef.current}
        >
          <Box mb={9}>
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
      </div>
      <Zoom in={open} timeout={400}>
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
  );
};
