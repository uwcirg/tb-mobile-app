import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Camera from '../../ImageCapture/Camera';
import Colors from '../../Basics/Colors';
import useStores from '../../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import PermissionsError from '../../ImageCapture/PermissionsError';
import FlatButton from '../../Components/FlatButton';
import ValidateTimePrompt from './ValidateTimePrompt';
import AdditionalPhotoFlowOptions from '../../Components/Patient/AdditionalPhotoFlowOptions';
import ClickableText from '../../Basics/ClickableText';
import { KeyboardArrowLeft } from '@material-ui/icons';

const ReportPhoto = observer((props) => {
  const classes = useStyles();
  const { t } = useTranslation('translation');
  const [permissionsError, setPermissionsError] = useState(false);

  const { patientStore, patientUIStore } = useStores();
  patientStore.report.headerText = t('patient.report.photoTitle');

  const handlePhoto = (photo) => {
    patientStore.report.photoString = photo;
    patientStore.report.photoWasTaken = true;
  };

  const handleExit = () => {
    patientStore.uiState.cameraIsOpen = false;
  };

  const handleRetake = () => {
    patientStore.report.photoWasTaken = false;
    patientStore.uiState.cameraIsOpen = true;
  };

  const handleNext = () => {
    patientStore.photoSubmission();
    patientStore.reportStore.submitPhoto();

    if (!patientUIStore.skippedToPhotoFlow) {
      props.advance();
    } else {
      patientStore.saveReportingState();
      patientUIStore.goToHome();
    }
  };

  const nextDisabled = () => {
    if (patientStore.report.photoWasSkipped) {
      return !patientStore.report.whyPhotoWasSkipped;
    }
    return !patientStore.report.photoWasTaken;
  };

  const handlePermissionsError = () => {
    handleExit();
    setPermissionsError(true);
  };

  useEffect(() => {
    return function cleanup() {
      patientUIStore.setSkippedToPhoto(false);
    };
  }, []);

  return (
    <div className={classes.container}>
      {!patientStore.report.photoWasSkipped ? (
        <>
          {/* photo submission review page */}
          {patientStore.report.photoWasTaken ? (
            <>
              <div className={classes.strip}>
                <img src={patientStore.report.photoString} alt="test strip" />{' '}
              </div>
              <Button
                onClick={handleRetake}
                className={classes.refresh}
                style={{ color: `${Colors.warningRed}` }}
              >
                <RefreshIcon />
                <Box width=".5em" />
                {t('patient.report.photo.retakePhoto')}
              </Button>
            </>
          ) : (
            <>
              <ValidateTimePrompt />
              {permissionsError && <PermissionsError />}
              <AdditionalPhotoFlowOptions />
            </>
          )}
        </>
      ) : (
        // move cant take photo back here
        <>
          <CantTakePhoto />
        </>
      )}

      {/* either disable this or move it elsewhere useful */}

      <Box height="1em" />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FlatButton
          className={classes.padding}
          backgroundColor={Colors.green}
          onClick={handleNext}
          disabled={nextDisabled()}
          color={Colors.white}
          label={t('patient.report.photo.next')}
        >
          {t('patient.report.next')}
        </FlatButton>
      </div>
      {patientStore.uiState.cameraIsOpen && (
        <Camera
          handlePermissionsError={handlePermissionsError}
          handleExit={handleExit}
          returnPhoto={handlePhoto}
        />
      )}
    </div>
  );
});

const CantTakePhoto = observer(() => {
  const { patientStore } = useStores();
  const classes = useStyles();
  const { t } = useTranslation('translation');

  return (
    <>
      <div className={classes.cantSubmit}>
        <TextField
          rows={3}
          label={t('patient.report.photo.whyUnable')}
          multiline
          value={patientStore.report.whyPhotoWasSkipped}
          onChange={(e) => {
            patientStore.report.whyPhotoWasSkipped = e.target.value;
          }}
          className={classes.textArea}
          variant="outlined"
        />
        <ClickableText
          icon={<KeyboardArrowLeft />}
          onClick={() => {
            patientStore.report.photoWasSkipped = false;
          }}
          text={t('patient.report.photo.back')}
        />
      </div>
    </>
  );
});

const useStyles = makeStyles({
  buttonFix: {
    width: '100%',
    '& > button': {
      marginRight: '0',
    },
  },
  container: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '0 1em',
  },
  padding: {
    padding: '.8em 1em',
  },
  info: {
    fontSize: '1em',
    width: '100%',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    '& > span': {
      alignItems: 'center',
      display: 'flex',
      textAlign: 'left',
      width: '100%',
      textTransform: 'none',
    },
  },
  popUp: {
    height: '90vh',
    width: '85%',
    overflowY: 'scroll',
  },
  title: {
    fontSize: '1.25em',
    textAlign: 'left',
    marginLeft: '1em',
  },
  leftMargin: {
    marginLeft: '1.5em',
  },
  cantSubmit: {
    width: '90%',
    margin: 'auto',
    marginTop: '2em',
    '& > div': {
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: '1em',
    },
  },
  later: {
    color: 'green',
  },
  unable: {
    color: 'red',
    margin: '.5em 0',
  },
  strip: {
    height: '50vh',
    width: '100%',
    '& >img': {
      objectFit: 'contain',
      height: '100%',
      width: '100%',
    },
    margin: 'auto',
    textAlign: 'center',
  },
  cantSubmitContainer: {
    width: '70%',
    boxSizing: 'border-box',
  },
  optionButton: {
    padding: '.5em',
  },
  refresh: {
    color: Colors.buttonBlue,
    textTransform: 'capitalize',
    fontSize: '1em',
    fontWeight: 'normal',
  },
});

export default ReportPhoto;
