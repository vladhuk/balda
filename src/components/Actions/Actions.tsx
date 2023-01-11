import { ActionsDialog } from 'components/Actions/components/ActionsDialog';
import { Box, Button } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { FC, useState } from 'react';

interface Props {
  skipTurn: () => void;
  clearSelection: () => void;
  undo: () => void;
}

export const Actions: FC<Props> = ({ skipTurn, clearSelection, undo }) => {
  const [isActionsDialogOpened, setIsActionsDialogOpened] = useState(false);

  return (
    <Box width={352} display="flex" mt={1} justifyContent="space-between">
      <Button color="secondary" onClick={() => setIsActionsDialogOpened(true)}>
        <MoreHorizIcon />
      </Button>
      <ActionsDialog
        open={isActionsDialogOpened}
        setOpen={setIsActionsDialogOpened}
        onSkipTurn={() => {
          skipTurn();
          setIsActionsDialogOpened(false);
        }}
      />
      <Button color="secondary" onClick={() => clearSelection()}>
        <DeleteIcon />
      </Button>
      <Button color="secondary" onClick={() => undo()}>
        <BackspaceIcon />
      </Button>
    </Box>
  );
};
