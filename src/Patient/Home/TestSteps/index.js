import React from 'react';
import OverTopBar from '../../Navigation/OverTopBar';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import Step from './Step';
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  MobileStepper,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SimpleButton from '../../../Basics/SimpleButton';
import Countdown from './Countdown';

const useStyles = makeStyles({
  body: {
    width: '100%',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  spaced: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    padding: '1rem',
  },
  big: {
    fontSize: '5rem',
  },
});

const TestSteps = observer(() => {
  const { patientUIStore, uiStore } = useStores();
  const classes = useStyles();
  const { t } = useTranslation('translation');

  return (
    <>
      <div className={classes.body}>
        <OverTopBar
          title="Test Instructions"
          handleBack={patientUIStore.goToHome}
          className={classes.body}
        />
        <Box height="60px" />
        <Step currentStep={uiStore.step} />

        {uiStore.step === 3 && <Countdown />}

        <div className={classes.spaced}>
          <SimpleButton
            children="<<"
            onClick={uiStore.prevStep}
            disabled={uiStore.step === 0 ? true : false}
          />
          <MobileStepper
            steps={6}
            variant="dots"
            position="static"
            activeStep={uiStore.step}
          />
          <SimpleButton
            children=">>"
            onClick={uiStore.nextStep}
            disabled={uiStore.step >= 5 ? true : false}
          />
        </div>
      </div>
    </>
  );
});

export default TestSteps;
