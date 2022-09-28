import React from 'react';
import { Box } from '@material-ui/core';
import FlatButton from '../../Components/FlatButton';
import { makeStyles } from '@material-ui/core';
import Colors from '../../Basics/Colors';

export default function NextReportStep({
  handleNext,
  translatedString,
  nextDisabled,
}) {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="flex-end" marginTop="1em">
      <FlatButton
        onClick={handleNext}
        disabled={nextDisabled}
        className={classes.padding}
        backgroundColor={Colors.green}
        color={Colors.white}
        label={translatedString}
      >
        {translatedString}
      </FlatButton>
    </Box>
  );
}

const useStyles = makeStyles({
  padding: {
    padding: '.8em 1em',
  },
});
