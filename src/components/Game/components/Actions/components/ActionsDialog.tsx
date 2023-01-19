import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  Slide,
  Zoom,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import React, { FC } from 'react';
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
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={Box}
      PaperProps={{
        sx: {
          py: 1,
          alignItems: 'center',
          overflow: 'hidden',
        },
      }}
    >
      <DialogContent sx={{ overflow: 'hidden' }}>
        <Slide in={open} direction="up" timeout={350}>
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
        <Slide in={open} direction="up" timeout={300}>
          <Box mb={5}>
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
      </DialogContent>
      <DialogActions>
        <Zoom in={open} timeout={400}>
          <Fab size="large" color="secondary" onClick={onClose}>
            <CloseIcon />
          </Fab>
        </Zoom>
      </DialogActions>
    </Dialog>
  );
};
