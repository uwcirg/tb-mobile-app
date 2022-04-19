import React, { useEffect } from 'react'
import { useState } from 'react';
import OverTopBar from "../../Navigation/OverTopBar";
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import Step1 from './Step1';
import { Box, IconButton, makeStyles } from '@material-ui/core';
import MuiButton from '../../../Basics/MuiButton';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  body: {
    width: '100%',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  spaced: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  big: {
    fontSize: "5rem"
  }
})

const TestSteps = observer(() =>{
  const {patientUIStore, uiStore} = useStores();
  const classes = useStyles();
  const { t } = useTranslation('translation');



  // Just kidding. dont do steps below. browser back button has no effect on state.
  // If we could read the url, we could have that help us as well.

//  1.make the Step1 component into just a Step component which is passed prop state
//  2. make all of the Step's elements render according to step # (from obj data)
//  3. be sure the back button on the browsers works for state change too
  

  return(<>
  <div className={classes.body}>
    <OverTopBar title="Test Instructions" handleBack={patientUIStore.goToHome} className={classes.body}/>
    <Box height='60px'/>
    <p>{t('commonWords.loading')}</p>
    <Step1 />
    <div className={classes.spaced}>
      {/*  onClick={patientUIStore.router.goBack} */}
      <MuiButton children="<<" onClick={uiStore.prevStep} disabled={uiStore.step === 0 ? true : false}/>
      <p>dot dot {uiStore.step}</p>
      <MuiButton children=">>" onClick={uiStore.nextStep}  />
   </div>
  </div>
    
  </>
  )
});

export default TestSteps;