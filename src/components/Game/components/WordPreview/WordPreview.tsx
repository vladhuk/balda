import { Box, Divider, FormHelperText, Zoom } from '@mui/material';
import {
  Letter,
  LetterContainer,
} from 'components/Game/components/WordPreview/styled';
import { InputError } from 'components/Game/enums/input-error.enum';
import { Coord } from 'helpers/coord';
import { useCommonTranslation } from 'hooks/use-common-translation';
import { isEmpty, isNull } from 'lodash';
import { FC } from 'react';
import { Cell } from 'types/cell.interface';
import { getCellKey } from 'utils/cell/get-cell-key';

interface Props {
  error: InputError;
  enteredLetterCoord: Coord | null;
  selectedCells: Cell[];
  lettersShaking?: boolean;
}

export const WordPreview: FC<Props> = ({
  error,
  enteredLetterCoord,
  selectedCells,
  lettersShaking,
}) => {
  const t = useCommonTranslation('inputError');

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex">
        {(isNull(enteredLetterCoord) || isEmpty(selectedCells)
          ? [
              ...selectedCells,
              { value: '\u2000', coord: new Coord({ x: 0, y: 0 }) },
            ]
          : selectedCells
        ).map((cell, i, arr) => (
          <LetterContainer
            key={getCellKey(cell)}
            lettersShaking={lettersShaking}
            small={arr.length > 6}
          >
            <Zoom in>
              <Letter
                entered={enteredLetterCoord?.equals(cell.coord)}
                small={arr.length > 6}
              >
                {cell.value || '\u2000'}
              </Letter>
            </Zoom>
            <Divider
              sx={{
                width: 1,
                boxSizing: 'border-box',
                height: 4,
              }}
            />
          </LetterContainer>
        ))}
      </Box>
      <FormHelperText
        component="div"
        sx={{
          lineHeight: 1,
          height: 12,
        }}
        error
      >
        <Zoom in={error !== InputError.NONE}>
          <div>{t(error)}</div>
        </Zoom>
      </FormHelperText>
    </Box>
  );
};
