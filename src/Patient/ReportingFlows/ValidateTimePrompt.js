import React, { useState } from 'react';
import BigConfirmationButton from '../Home/OneStepActions/BigConfirmationButton';
import PhotoPrompt from '../../Components/Patient/PhotoPrompt';
import { ThumbUp, Timer } from '@material-ui/icons';
import { Box, Grow } from '@material-ui/core';
import Colors from '../../Basics/Colors';
import useStores from '../../Basics/UseStores';

export default function ValidateTimePrompt(props) {
  const [testNotReady, setTestNotReady] = useState(true);
  const [checked, setChecked] = useState(true);
  const { patientStore } = useStores();

  const handleNotReady = () => {};

  return (
    <Box height="150px">
      <Grow
        in={checked}
        {...(checked ? { timeout: 1000 } : { timeout: 200 })}
        unmountOnExit
        onExited={() => setChecked()}
      >
        <Box display="flex" marginX="auto">
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
              onClick={() => {
                setTestNotReady(false);
                setChecked((prev) => !prev);
              }}
            />
          </Box>
        </Box>
      </Grow>
      {!checked && (
        <Grow in={true} {...(!checked ? { timeout: 1000 } : { timeout: 2000 })}>
          <Box display="flex" marginX="auto" height="150px">
            <PhotoPrompt
              disabled={testNotReady}
              onClick={() => {
                patientStore.uiState.cameraIsOpen = true;
              }}
            />
          </Box>
        </Grow>
      )}
    </Box>
  );
}
