import React, { useState } from 'react';
import BigConfirmationButton from '../Home/OneStepActions/BigConfirmationButton';
import PhotoPrompt from '../../Components/Patient/PhotoPrompt';
import { ThumbUp, Timer } from '@material-ui/icons';
import { Box, Grow } from '@material-ui/core';
import Colors from '../../Basics/Colors';
import useStores from '../../Basics/UseStores';
import FlatButton from '../../Components/FlatButton';

export default function ValidateTimePrompt() {
  const [testReady, setTestReady] = useState(true);
  const [pendingValidation, setPendingValidation] = useState(true);

  const handleTimeElapsed = (validTest = true) => {
    setTestReady(validTest);
    setPendingValidation((prev) => !prev);
  };

  return (
    <Box height="150px">
      <TransitionWrapper condition={pendingValidation}>
        <TimeElapsedButton handleClick={() => handleTimeElapsed(false)} />
        <TimeElapsedButton valid handleClick={handleTimeElapsed} />
      </TransitionWrapper>
      {!pendingValidation && <TestIsReady testReady={testReady} />}
    </Box>
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

const TestIsReady = ({ testReady }) => {
  const { patientStore } = useStores();
  const minutes = [5, 10, 15];
  return (
    <TransitionWrapper>
      {testReady ? (
        <PhotoPrompt
          disabled={false}
          onClick={() => {
            patientStore.uiState.cameraIsOpen = true;
          }}
        />
      ) : (
        <Box flexWrap="wrap">
          <h2>About how many minutes ago did you take the test?</h2>
          <Box display="flex" justifyContent="space-around">
            {minutes.map((minute, i) => (
              <FlatButton
                key={minute}
                onClick={
                  {
                    /*() => patientStore.setTimeElapsed(minute)*/
                  }
                }
              >
                {minute}
              </FlatButton>
            ))}
          </Box>
        </Box>
      )}
    </TransitionWrapper>
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
