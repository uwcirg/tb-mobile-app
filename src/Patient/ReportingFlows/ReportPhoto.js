import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Camera from '../../ImageCapture/Camera';
import useStores from '../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import PermissionsError from '../../ImageCapture/PermissionsError';
import ValidateTimePrompt from './ValidateTimePrompt';
import AdditionalPhotoFlowOptions from '../../Components/Patient/AdditionalPhotoFlowOptions';
import CantTakePhoto from './CantTakePhoto';
import PhotoReview from './PhotoReview';
import NextReportStep from './NextReportStep';
import { Box } from '@material-ui/core';

const ReportPhoto = observer((props) => {
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
    <Box padding="0 1em">
      {!patientStore.report.photoWasSkipped ? (
        <>
          {patientStore.report.photoWasTaken ? (
            <PhotoReview
              photoString={patientStore.report.photoString}
              handleRetake={handleRetake}
              translatedString={t('patient.report.photo.retakePhoto')}
            />
          ) : (
            <>
              <ValidateTimePrompt />
              {permissionsError && <PermissionsError />}
              <AdditionalPhotoFlowOptions />
            </>
          )}
        </>
      ) : (
        <CantTakePhoto />
      )}
      <NextReportStep
        handleNext={handleNext}
        nextDisabled={nextDisabled()}
        translatedString={t('patient.onboarding.next')}
      />
      {patientStore.uiState.cameraIsOpen && (
        <Camera
          handlePermissionsError={handlePermissionsError}
          handleExit={handleExit}
          returnPhoto={handlePhoto}
        />
      )}
    </Box>
  );
});

export default ReportPhoto;
