import { SxProps } from '@mui/material';

export const dialogPaper: SxProps = {
  borderRadius: '10px',
  py: 1,
  px: [0, 0, 1],
  zIndex: 1,
};

export const accordionDetails: SxProps = {
  display: 'flex',
  justifyContent: 'space-around',
  gap: 1,
  pt: 0,
  flexDirection: ['column', 'column', 'row'],
};

export const difficultyAccordionDetails: SxProps = {
  display: 'flex',
  flexDirection: ['column', 'column', 'row'],
  justifyContent: 'space-around',
  gap: 1,
};
