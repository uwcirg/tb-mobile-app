import React, { useReducer } from 'react';
import InstructionStep from './InstructionStep';
import { Grid, Box, makeStyles, MobileStepper, IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Colors from '../../../Basics/Colors';
import { PageLabel } from '../../../Components/Shared/PageLabel';
import { withStyles } from '@material-ui/styles';

function reducer(state, action) {
  switch (action.type) {
    case 'next':
      return state + 1;
    case 'previous':
      return state - 1;
    default:
      throw new Error();
  }
}

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

const TestInstructions = () => {
  const classes = useStyles();
  const { t } = useTranslation('translation');

  const [step, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <PageLabel
        title={t('patient.information.testInstructions')}
      />
      <Grid className={classes.container} direction='column' container>
        <Box style={{ boxSizing: "border-box" }} flexGrow="1" padding="0 1em" width="100%" maxWidth="500px">
          <InstructionStep className="step" currentStep={step} />

        </Box>
        <Grid justify='space-between' container>
          <StepperButton
            children={<ChevronLeft />}
            onClick={() => { dispatch({ type: 'previous' }) }}
            disabled={step === 0} />
          <MobileStepper
            style={{ backgroundColor: "white" }}
            steps={6}
            variant="dots"
            position="static"
            activeStep={step} />
          <StepperButton
            children={<ChevronRight />}
            onClick={() => { dispatch({ type: 'next' }) }}
            disabled={step >= 5}
          />
        </Grid>
      </Grid >
    </>
  );
};

const StepperButton = withStyles({
  root: {
    "&:focus, &:hover": {
      backgroundColor: Colors.buttonBlue
    },
    borderRadius: "4px",
    backgroundColor: Colors.buttonBlue,
    color: "white"
  },
})(IconButton)

export default TestInstructions;
