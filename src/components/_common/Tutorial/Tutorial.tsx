import * as styles from 'components/_common/Tutorial/styles';
import { Backdrop, Box, IconButton, Typography } from '@mui/material';
import { ControlsDescription } from 'components/_common/Tutorial/styled';
import { FC } from 'react';
import { HideForTouchDevice } from 'components/_common/HideForTouchDevice';
import { Locale } from 'enums/locale.enum';
import { LocalizedImage } from 'components/_common/LocalizedImage';
import { Trans } from 'next-i18next';
import { useCommonTranslation } from 'hooks/use-common-translation';
import ArrowDown from 'components/_common/Tutorial/assets/down-arrow-button.png';
import ArrowLeft from 'components/_common/Tutorial/assets/left-arrow-button.png';
import ArrowRight from 'components/_common/Tutorial/assets/right-arrow-button.png';
import ArrowUp from 'components/_common/Tutorial/assets/up-arrow-button.png';
import CloseIcon from '@mui/icons-material/Close';
import Delete from 'components/_common/Tutorial/assets/del-button.png';
import Enter from 'components/_common/Tutorial/assets/enter-button.png';
import Escape from 'components/_common/Tutorial/assets/esc-button.png';
import Image from 'next/image';
import Screenshot1En from 'components/_common/Tutorial/assets/tutorial-1_en.png';
import Screenshot1Uk from 'components/_common/Tutorial/assets/tutorial-1_uk.png';
import Screenshot2En from 'components/_common/Tutorial/assets/tutorial-2_en.png';
import Screenshot2Uk from 'components/_common/Tutorial/assets/tutorial-2_uk.png';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const Tutorial: FC<Props> = ({ open, onClose }) => {
  const t = useCommonTranslation('tutorial');

  return (
    <Backdrop open={open} onClick={onClose} sx={styles.backdrop}>
      <IconButton size="large" sx={styles.closeButton}>
        <CloseIcon fontSize="large" />
      </IconButton>
      <Box width={[0.9, 0.9, 0.5]}>
        <Typography variant="h3" sx={styles.heading}>
          {t('rules.title')}
        </Typography>
        <Typography>{t('rules.content1')}</Typography>
        <br />
        <Typography>
          <Trans i18nKey="tutorial.rules.content2" components={{ b: <b /> }} />
        </Typography>
        <Box display="flex" justifyContent="space-around" my={2}>
          <LocalizedImage
            src={{
              // TODO: Add english image
              [Locale.EN]: Screenshot1En,
              [Locale.UK]: Screenshot1Uk,
            }}
            alt={t('rules.alt.example1')}
            sx={styles.screenshot}
          />
          <LocalizedImage
            src={{
              // TODO: Add english image
              [Locale.EN]: Screenshot2En,
              [Locale.UK]: Screenshot2Uk,
            }}
            alt={t('rules.alt.example2')}
            sx={styles.screenshot}
          />
        </Box>
        <Typography>{t('rules.listTitle')}</Typography>
        <ol>
          <Trans
            i18nKey="tutorial.rules.list"
            components={{ b: <b />, li: <Typography component="li" /> }}
          />
        </ol>
        <Typography>
          <Trans i18nKey="tutorial.rules.content3" components={{ b: <b /> }} />
        </Typography>
        <HideForTouchDevice>
          <Typography variant="h3" sx={styles.heading}>
            {t('control.title')}
          </Typography>
          <ControlsDescription>
            <Box
              component={Image}
              src={ArrowUp}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              alt={t('control.alt.up')}
              sx={styles.keyImage}
            />
            ,
            <Box
              component={Image}
              src={ArrowRight}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              alt={t('control.alt.rigt')}
              sx={styles.keyImage}
            />
            ,
            <Box
              component={Image}
              src={ArrowDown}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              alt={t('control.alt.down')}
              sx={styles.keyImage}
            />
            ,
            <Box
              component={Image}
              src={ArrowLeft}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              alt={t('control.alt.left')}
              sx={styles.keyImage}
            />
            - {t('control.arrows')}
          </ControlsDescription>
          <ControlsDescription>
            <Box
              component={Image}
              src={Enter}
              alt="Enter"
              sx={styles.keyImage}
            />
            - {t('control.enter')}
          </ControlsDescription>
          <ControlsDescription>
            <Box
              component={Image}
              src={Delete}
              alt="Delete"
              sx={styles.keyImage}
            />
            - {t('control.delete')}
          </ControlsDescription>
          <ControlsDescription>
            <Box
              component={Image}
              src={Escape}
              alt="Escape"
              sx={styles.keyImage}
            />
            - {t('control.escape')}
          </ControlsDescription>
        </HideForTouchDevice>
      </Box>
    </Backdrop>
  );
};
