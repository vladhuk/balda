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
import React, { Dispatch, FC } from 'react';
import SkipNextIcon from '@mui/icons-material/SkipNext';

interface Props {
  open: boolean;
  setOpen: Dispatch<boolean>;
  onSkipTurn: () => void;
}

export const ActionsDialog: FC<Props> = ({ onSkipTurn, open, setOpen }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
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
        <Slide in={open} direction="up" timeout={300}>
          <div>
            <Button
              size="large"
              color="error"
              endIcon={<SkipNextIcon />}
              sx={{ width: 1, mb: 5 }}
              onClick={onSkipTurn}
            >
              Пропустити хід
            </Button>
          </div>
        </Slide>
      </DialogContent>
      <DialogActions>
        <Zoom in={open} timeout={400}>
          <Fab size="large" color="secondary" onClick={() => setOpen(false)}>
            <CloseIcon />
          </Fab>
        </Zoom>
      </DialogActions>
    </Dialog>
  );
};
