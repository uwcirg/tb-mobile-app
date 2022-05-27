import React from 'react';
import OverTopBar from '../../Navigation/OverTopBar';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import InstructionStep from './InstructionStep';
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
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
  body: {
    width: '100%',
    minHeight: '95vh',
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
  step: { maxWidth: '400px' },
});

const TestSteps = observer(() => {
  const { patientUIStore, uiStore } = useStores();
  const classes = useStyles();
  const { t } = useTranslation('translation');

  return (
    <>
      <Box className={classes.body}>
        <OverTopBar
          title="Test Instructions"
          handleBack={patientUIStore.goToHome}
          className={classes.body}
        />
        <Box height="60px" />
        <InstructionStep className="step" currentStep={uiStore.step} />

        {uiStore.step === 3 && <Countdown />}

        <div className={classes.spaced}>
          <SimpleButton
            children={<ChevronLeft />}
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
            children={<ChevronRight fontSize="default" />}
            onClick={uiStore.nextStep}
            disabled={uiStore.step >= 5 ? true : false}
          />
        </div>
      </Box>
    </>
  );
});

export default TestSteps;
