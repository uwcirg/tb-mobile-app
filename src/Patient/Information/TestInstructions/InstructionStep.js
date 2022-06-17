import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import testStripInstructions from '../../../Content/test-strip-instructions';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  space: {
    maxWidth: "500px",
  },
  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: '1',
  },
  text: {
    padding: "16px 0",
    fontSize: "18px"
  }
});

const InstructionStep = ({ currentStep }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation('translation');

  return (
    <div className={classes.body}>
      <img
        src={`/img/${i18n.language}/test-instructions/${currentStep + 1}.png`}
        alt={`step # ${currentStep}`}
      />
      <Typography className={classes.text} variant="body2">
        {typeof (testStripInstructions[currentStep]) === "string" ? t(testStripInstructions[currentStep]) : testStripInstructions[currentStep]}
      </Typography>
    </div>
  );
};

export default InstructionStep;
