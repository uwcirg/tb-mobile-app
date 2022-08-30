import React, { useState } from 'react';
import BigConfirmationButton from '../Home/OneStepActions/BigConfirmationButton';
import PhotoPrompt from '../../Components/Patient/PhotoPrompt';
import { ThumbUp, Timer } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import Colors from '../../Basics/Colors';
import useStores from '../../Basics/UseStores';

export default function ValidateTimePrompt(props) {
  const [testNotReady, setTestNotReady] = useState(true);
  const { patientStore } = useStores();

  const handleNotReady = () => {};

  return (
    <>
      <Box display="flex">
        <Box flexGrow={1} padding="1em .5em">
          <BigConfirmationButton
            primaryColor={Colors.red}
            bgColor={Colors.calendarRed}
            icon={<Timer />}
            text={'I have not waited twenty minutes'}
            onClick={handleNotReady}
          />
        </Box>
        <Box flexGrow={1} padding="1em .5em">
          <BigConfirmationButton
            primaryColor={'#388E3C'}
            bgColor={'#E8F5E9'}
            icon={<ThumbUp />}
            text={'I have waited for twenty minutes'}
            onClick={() => setTestNotReady(false)}
          />
        </Box>
      </Box>
      <PhotoPrompt
        disabled={testNotReady}
        onClick={() => {
          patientStore.uiState.cameraIsOpen = true;
        }}
      />
    </>
  );
}
