import { ActionsDialog } from 'components/Game/components/Actions/components/ActionsDialog';
import { Box, Button } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { FC, useState } from 'react';

interface Props {
  onSkipTurn: () => void;
  onClearSelection: () => void;
  onUndo: () => void;
  onCapitulate: () => void;
}

export const Actions: FC<Props> = ({
  onSkipTurn,
  onClearSelection,
  onUndo,
  onCapitulate,
}) => {
  const [isActionsDialogOpened, setIsActionsDialogOpened] = useState(false);

  const onClose = () => setIsActionsDialogOpened(false);

  return (
    <Box width={352} display="flex" mt={1} justifyContent="space-between">
      <Button
        color="secondary"
        onClick={() => setTimeout(() => setIsActionsDialogOpened(true))}
      >
        <MoreHorizIcon />
      </Button>
      <Button color="secondary" onClick={() => onClearSelection()}>
        <DeleteIcon />
      </Button>
      <Button color="secondary" onClick={() => setTimeout(() => onUndo())}>
        <BackspaceIcon />
      </Button>
      <ActionsDialog
        open={isActionsDialogOpened}
        onClose={onClose}
        onSkipTurn={() => {
          onSkipTurn();
          onClose();
        }}
        onCapitulate={() => {
          onCapitulate();
          onClose();
        }}
      />
    </Box>
  );
};
