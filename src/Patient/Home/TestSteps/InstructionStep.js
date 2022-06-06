import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import testStripInstructions from '../../../Content/test-strip-instructions';
import { useTranslation } from 'react-i18next';

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
      <p style={{ padding: '0 20px' }}>
        {t(testStripInstructions[currentStep])}
      </p>
    </div>
  );
};

export default InstructionStep;
