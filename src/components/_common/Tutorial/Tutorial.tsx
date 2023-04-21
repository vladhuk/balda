import * as styles from 'components/_common/Tutorial/styles';
import { Backdrop, Box, IconButton, Typography } from '@mui/material';
import { ControlsDescription } from 'components/_common/Tutorial/styled';
import { FC } from 'react';
import { HideForTouchDevice } from 'components/_common/HideForTouchDevice';
import ArrowDown from 'assets/down-arrow-button.png';
import ArrowLeft from 'assets/left-arrow-button.png';
import ArrowRight from 'assets/right-arrow-button.png';
import ArrowUp from 'assets/up-arrow-button.png';
import CloseIcon from '@mui/icons-material/Close';
import Delete from 'assets/del-button.png';
import Enter from 'assets/enter-button.png';
import Escape from 'assets/esc-button.png';
import Image from 'next/image';
import Screenshot1 from 'assets/tutorial-1.png';
import Screenshot2 from 'assets/tutorial-2.png';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const Tutorial: FC<Props> = ({ open, onClose }) => {
  return (
    <Backdrop open={open} onClick={onClose} sx={styles.backdrop}>
      <IconButton size="large" sx={styles.closeButton}>
        <CloseIcon fontSize="large" />
      </IconButton>
      <Box width={[0.9, 0.9, 0.5]}>
        <Typography variant="h3" sx={styles.heading}>
          Правила
        </Typography>
        <Typography>
          «Балда» - лінгвістична настільна гра для 2-ох гравців, в якій
          необхідно складати слова за допомогою букв, що додаються на квадратне
          ігрове поле за допомогою переходів від букви до букви під прямим
          кутом.
        </Typography>
        <br />
        <Typography>
          Під час свого ходу гравець <b>має додати букву</b> в клітинку, що
          дотикається по <b>вертикалі/горизонталі</b> до заповненої клітинки
          таким чином, щоб виходила нерозривна прямокутна ламана (
          <b>«змійка»</b>) з клітинок, що не самоперетинаються, або{' '}
          <b>пропустити хід</b> (якщо обидва гравці двічі поспіль пропускають
          хід, то фіксується <b>нічия</b>).
        </Typography>
        <Box display="flex" justifyContent="space-around" my={2}>
          <Box
            component={Image}
            src={Screenshot1}
            alt="Приклад 1"
            sx={styles.screenshot}
          />
          <Box
            component={Image}
            src={Screenshot2}
            alt="Приклад 2"
            sx={styles.screenshot}
          />
        </Box>
        <Typography>
          Протягом гри повинні дотримуватися також такі правила:
        </Typography>
        <ol>
          <Typography component="li">Гравці ходять по черзі.</Typography>
          <Typography component="li">
            Кожна клітка містить лише одну букву, кожна буква у складеному слові
            приносить гравцю одне очко. <b>Апострофи та дефіси</b> опускаються
            (наприклад слово &quot;підʼїзд&quot; буде записуватися як
            &quot;підїзд&quot;).
          </Typography>
          <Typography component="li">
            Слово має бути <b>іменником.</b>
          </Typography>
          <Typography component="li">Слова не можуть повторюватися</Typography>
        </ol>
        <Typography>
          Гра <b>закінчується</b> тоді, коли заповнені всі клітинки або
          неможливо скласти чергове слово відповідно до вищезазначених правил.
          Виграє той гравець, який набере більше очок, крім випадку нічиєї після
          дворазового пропуску ходу обома гравцями.
        </Typography>
        <HideForTouchDevice>
          <Typography variant="h3" sx={styles.heading}>
            Керування
          </Typography>
          <ControlsDescription>
            <Box
              component={Image}
              src={ArrowUp}
              alt="Вгору"
              sx={styles.keyImage}
            />
            ,
            <Box
              component={Image}
              src={ArrowRight}
              alt="Вправо"
              sx={styles.keyImage}
            />
            ,
            <Box
              component={Image}
              src={ArrowDown}
              alt="Вниз"
              sx={styles.keyImage}
            />
            ,
            <Box
              component={Image}
              src={ArrowLeft}
              alt="Вліво"
              sx={styles.keyImage}
            />
            - вибрати наступну клітинку.
          </ControlsDescription>
          <ControlsDescription>
            <Box
              component={Image}
              src={Enter}
              alt="Enter"
              sx={styles.keyImage}
            />
            - завершити хід.
          </ControlsDescription>
          <ControlsDescription>
            <Box
              component={Image}
              src={Delete}
              alt="Delete"
              sx={styles.keyImage}
            />
            - стерти останню літеру.
          </ControlsDescription>
          <ControlsDescription>
            <Box
              component={Image}
              src={Escape}
              alt="Escape"
              sx={styles.keyImage}
            />
            - стерти всі літери.
          </ControlsDescription>
        </HideForTouchDevice>
      </Box>
    </Backdrop>
  );
};
