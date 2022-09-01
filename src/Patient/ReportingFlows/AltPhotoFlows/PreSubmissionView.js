import React, { useState } from 'react';
import TestStripPhotoInfo from '../../../Components/Patient/AdditionalPhotoFlowOptions';
import PhotoPrompt from '../../../Components/Patient/PhotoPrompt';
import { makeStyles } from '@material-ui/core/styles';
import Camera from '../../../ImageCapture/Camera';
import ClickableText from '../../../Basics/ClickableText';
import ReplayIcon from '@material-ui/icons/Replay';
import { useTranslation } from 'react-i18next';
import BottomButton from './BottomButton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PermissionsError from '../../../ImageCapture/PermissionsError';
import BackSubmissionText from './BackSubmissionText';
import { CircularProgress, Typography } from '@material-ui/core';
import PhotoRedoDetails from '../../../Components/Shared/PhotoRedoDetails';
import NotEligible from './NotEligible';

const useStyles = makeStyles({
  strip: {
    display: 'block',
    height: '50vh',
    width: '90%',
    '& > img': {
      objectFit: 'contain',
      height: '100%',
      width: '100%',
    },
    margin: 'auto',
  },
  fullWidth: {
    padding: '0 1em',
    boxSizing: 'border-box',
  },
  loading: {
    height: '80vh',
  },
});

const PreSubmissionView = ({
  photo,
  eligible,
  setPhoto,
  handleSubmit,
  requestDateFormatted,
  loading,
  isRedo,
  redoReason,
  redoURL,
}) => {
  const { t } = useTranslation('translation');
  const classes = useStyles();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [permissionsError, setPermissionsError] = useState(false);

  const handleExit = () => {
    setCameraOpen(false);
  };

  const handlePhoto = (newPhoto) => {
    setPhoto(newPhoto);
    setCameraOpen(false);
  };

  const handlePermissionsError = () => {
    handleExit();
    setPermissionsError(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {photo ? (
        <>
          <div className={classes.strip}>
            <img src={photo} />
          </div>
          <div className={classes.fullWidth}>
            <ClickableText
              onClick={() => {
                setCameraOpen(true);
              }}
              icon={<ReplayIcon />}
              text={t('patient.report.photo.retakePhoto')}
            />
          </div>
          <BottomButton disabled={eligible && !photo} onClick={handleSubmit}>
            {t('coordinator.patientProfile.editDetails.submit')}
          </BottomButton>
        </>
      ) : (
        <>
          {eligible ? (
            <>
              {isRedo ? (
                <RedoSubmissionText url={redoURL} reason={redoReason} />
              ) : (
                <BackSubmissionText
                  photo={photo !== false}
                  requestDateFormatted={requestDateFormatted}
                />
              )}
              <PhotoPrompt
                onClick={() => {
                  setCameraOpen(true);
                }}
              />
              {permissionsError && <PermissionsError />}
              <Box height="1em" />
              <TestStripPhotoInfo showSkipOptions={false} />
            </>
          ) : (
            <NotEligible />
          )}
        </>
      )}
      {cameraOpen && (
        <Camera
          handlePermissionsError={handlePermissionsError}
          handleExit={handleExit}
          returnPhoto={handlePhoto}
        />
      )}
    </>
  );
};

const RedoSubmissionText = (props) => {
  const { t } = useTranslation('translation');

  return (
    <>
      <Typography>{t('redoPhoto.explanation')}</Typography>
      <PhotoRedoDetails {...props} />
    </>
  );
};

const Loading = () => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.loading}
      alignItems="center"
      justify="center"
      container
    >
      <CircularProgress variant="indeterminate" />
    </Grid>
  );
};

export default PreSubmissionView;
