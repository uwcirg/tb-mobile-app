import React from 'react';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import useStyles from '../Home/OneStepActions/styles';
import { useTranslation } from 'react-i18next';
import { Box, ButtonBase, Grid, TextField } from '@material-ui/core';
import ClickableText from '../../Basics/ClickableText';
import {
  ArrowForward,
  ChevronRightRounded,
  KeyboardArrowLeft,
  Send,
} from '@material-ui/icons';
import TopPageLabel from '../../Components/Shared/TopPageLabel';
import FlatButton from '../../Components/FlatButton';

const CantTakePhoto = observer(() => {
  const { patientStore } = useStores();
  const classes = useStyles();
  const { t } = useTranslation('translation');

  return (
    <>
      <TopPageLabel title={t('coordinator.patientProfile.addNote.button')} />
      <Box display="flex" flexDirection={'column'} padding="1em">
        <TextField
          fullWidth
          rows={4}
          label={t('patient.report.photo.whyUnable')}
          multiline
          value={patientStore.report.whyPhotoWasSkipped}
          onChange={(e) =>
            (patientStore.report.whyPhotoWasSkipped = e.target.value)
          }
          variant="outlined"
        />
        <Box display="flex" justifyContent="flex-end" padding="1em">
          <ClickableText
            icon={<KeyboardArrowLeft />}
            onClick={() => {
              patientStore.report.photoWasSkipped = false;
            }}
            text={t('patient.report.photo.back')}
          />
          <FlatButton>
            {t('coordinator.patientProfile.editDetails.submit')}
            <ChevronRightRounded />
          </FlatButton>
        </Box>
      </Box>
    </>
    // <div className={classes.cantSubmit}>
    //   <TextField
    //     rows={3}
    //     label={t('patient.report.photo.whyUnable')}
    //     multiline
    //     value={patientStore.report.whyPhotoWasSkipped}
    //     onChange={(e) => {
    //       patientStore.report.whyPhotoWasSkipped = e.target.value;
    //     }}
    //     className={classes.textArea}
    //     variant="outlined"
    //   />
    //   <ClickableText
    //     icon={<KeyboardArrowLeft />}
    //     onClick={() => {
    //       patientStore.report.photoWasSkipped = false;
    //     }}
    //     text={t('patient.report.photo.back')}
    //   />
    // </div>
  );
});

export default CantTakePhoto;
