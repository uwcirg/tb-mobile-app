import React, { useState } from 'react';
import BigConfirmationButton from '../Home/OneStepActions/BigConfirmationButton';
import PhotoPrompt from '../../Components/Patient/PhotoPrompt';
import { ThumbUp, Timer } from '@material-ui/icons';
import { Box, Grow } from '@material-ui/core';
import Colors from '../../Basics/Colors';
import useStores from '../../Basics/UseStores';
import FlatButton from '../../Components/FlatButton';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

export default function ValidateTimePrompt() {
  const [isTestReady, setIsTestReady] = useState(true);
  const [isPendingValidation, setIsPendingValidation] = useState(true);
  const { t } = useTranslation('translation');

  const handleTimeElapsed = (validTest = true) => {
    setIsTestReady(validTest);
    setIsPendingValidation(false);
  };

  return (
    <>
      <h3>{t('patient.report.photo.help.wait')}:</h3>
      <Box height="150px">
        <TransitionWrapper condition={isPendingValidation}>
          <TimeElapsedButton handleClick={() => handleTimeElapsed(false)} />
          <TimeElapsedButton valid handleClick={handleTimeElapsed} />
        </TransitionWrapper>
        {!isPendingValidation && <TestIsReady isTestReady={isTestReady} />}
      </Box>
    </>
  );
}

const TimeElapsedButton = ({ handleClick, valid }) => {
  return (
    <Box padding="1em .5em">
      <BigConfirmationButton
        primaryColor={valid ? '#388E3C' : Colors.red}
        bgColor={valid ? '#E8F5E9' : Colors.calendarRed}
        icon={valid ? <ThumbUp /> : <Timer />}
        text={
          valid
            ? 'I have waited for twenty minutes'
            : 'I have not waited twenty minutes'
        }
        onClick={handleClick}
      />
    </Box>
  );
};

const TestIsReady = ({ isTestReady }) => {
  const { patientStore } = useStores();
  return (
    <TransitionWrapper>
      {isTestReady ? (
        <PhotoPrompt
          disabled={false}
          onClick={() => {
            patientStore.uiState.cameraIsOpen = true;
          }}
        />
      ) : (
        <TimeoutPrompt />
      )}
    </TransitionWrapper>
  );
};

const TimeoutPrompt = () => {
  const [minutesLeft, setMinutesLeft] = useState(0);
  const classes = useStyles();
  const minutes = [5, 10, 15];
  const handleTimeout = (min) => {
    setMinutesLeft(() => 20 - min);
    console.log(min);
  };
  return (
    <>
      {minutesLeft === 0 ? (
        <Box flexWrap="wrap">
          <h2>About how many minutes ago did you take the test?</h2>
          <Box display="flex" justifyContent="space-around">
            {minutes.map((minute, i) => (
              <FlatButton
                className={classes.padding}
                key={minute}
                onClick={() => handleTimeout(minute)}
              >
                {minute}
              </FlatButton>
            ))}
          </Box>
        </Box>
      ) : (
        <TransitionWrapper>
          <h2>
            Thank you for waiting. We will notify you in {minutesLeft} minutes.
          </h2>
        </TransitionWrapper>
      )}
    </>
  );
};

const TransitionWrapper = ({
  children,
  condition = true,
  height = '150px',
}) => {
  return (
    <Grow
      in={condition}
      {...(condition ? { timeout: 1000 } : { timeout: 200 })}
      unmountOnExit
    >
      <Box
        display="flex"
        height={height}
        justifyContent="center"
        marginX="auto"
      >
        {children}
      </Box>
    </Grow>
  );
};

const useStyles = makeStyles({
  padding: {
    padding: '.2em 1.2em',
  },
});
