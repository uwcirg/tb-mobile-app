import React from 'react';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import InstructionStep from './InstructionStep';
import { Grid, Box, makeStyles, MobileStepper, IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Colors from '../../../Basics/Colors';
import { PageLabel } from '../../../Components/Shared/PageLabel';
import { withStyles } from '@material-ui/styles';

const useStyles = makeStyles({
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
  container: {
    boxSizing: "border-box",
    minHeight: "calc(90vh - 60px)",
    padding: "1em"
  }
});

const TestSteps = observer(() => {
  const { uiStore } = useStores();
  const classes = useStyles();
  const { t } = useTranslation('translation');

  return (
    <>
      <PageLabel
        to="/settings"
        title={t('patient.information.testInstructions')}
      />
      <Grid className={classes.container} direction='column' container>
        <InstructionStep className="step" currentStep={uiStore.step} />
        <Box flexGrow={1} />
        <Grid justify='space-between' container>
          <StepperButton
            children={<ChevronLeft />}
            onClick={uiStore.prevStep}
            disabled={uiStore.step === 0} />
          <MobileStepper
            style={{ backgroundColor: "white" }}
            steps={6}
            variant="dots"
            position="static"
            activeStep={uiStore.step} />
          <StepperButton

            children={<ChevronRight />}
            onClick={uiStore.nextStep}
            disabled={uiStore.step >= 5}
          />
        </Grid>
      </Grid >
    </>
  );
});

const StepperButton = withStyles({
  root: {
    "&:focus":{
      backgroundColor: Colors.buttonBlue
    },
    borderRadius: "4px",
    backgroundColor: Colors.buttonBlue,
    color: "white"
  },
})(IconButton)

export default TestSteps;
