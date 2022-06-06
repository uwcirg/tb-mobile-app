import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import testStripInstructions from '../../Content/test-strip-instructions';

// max width images -->

// This wasnt the stepper test instruction!! I think this is a component
// that I made for the settings / info page - jp

const useStyles = makeStyles({
  container: {
    width: '100%',
  },
  list: {
    listStyle: 'none',
    counterReset: 'instructions',
    '& > li': {
      counterIncrement: 'instructions',
      margin: '1em 0',
    },
    '& > li:before': {
      content: 'counter(instructions) "."',
      marginRight: '5px',
      fontWeight: 'bold',
    },
    paddingLeft: '0',
    textAlign: 'left',
    fontSize: '1em',
  },
  body: {},
  image: {
    width: '400px',
  },
  switcher: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  card: {
    flexGrow: '1',
    flexBasis: '25rem',
    '& > p': {
      fontSize: '3vmax',
    },
    width: '100%',
  },
  sublist: {
    paddingLeft: '20px',
    '& > li': {
      marginTop: '.5em',
    },
  },
});


function InstructionsStepper(){
  return <></>
}

export default InstructionsStepper;
