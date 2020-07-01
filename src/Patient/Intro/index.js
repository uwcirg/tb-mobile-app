import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import ReactJoyride from 'react-joyride';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import SwipeableViews from 'react-swipeable-views';
import Pagination from './Pagination';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';

import Back from '@material-ui/icons/ChevronLeft'
import Next from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles({
  exit: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 1005,
    color: "white",
    padding: 0,
    margin: "1em"
  },
  swipeContainer: {
    position: "fixed",
    top: "5px",
    height: "100vh",
    width: "100vw",
    zIndex: 1001
  },
  bottomText: {
    position: "fixed",
    bottom: "100px",
    color: "white",
    zIndex: 1002,
    width: "100%",
    "& > p": {
      margin: "auto",
      textAlign: "center",
      padding: "1em",
    }
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    position: "fixed",
    bottom: "70px",
    zIndex: "1003",

    "& > button": {
      color: "white",
    }
  },
  customPopOver:{
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      width: "90%",
      boxSizing: "border-box",
      minHeight: "200px",
      backgroundColor: "white",
      borderRadius: "1em",
      padding: "1em"
    }


  }
})

const steps = [
  {
    disableBeacon: "true",
    title: "",
    target: "#intro-greeting",
    content: "",
  },
  {
    disableBeacon: "true",
    title: "",
    target: ".intro-tasks",
    content: "These Are Your Daily Actions",
  },
  {
    title: "This is the navigation Bar",
    target: ".MuiBottomNavigation-root",
    content: "You Can Click Here to Use differnt actions",
  },
  {
    title: "Progress",
    target: ".intro-progress-button",
    content: "Clicking here will take you to your progress",
  },
  {
    title: "Week Calendar",
    target: ".intro-weekcalendar",
    content: "Take action!",
  }
];

const Intro = observer(() => {

  const [step, setStep] = useState(0);

  const classes = useStyles();
  const { patientUIStore } = useStores();

  const changeStep = (index) => {

    if (index < 0) {
      setStep(0)
      return
    }

    if (index == 3) {
      patientUIStore.goToProgress();
    } else {
      patientUIStore.goToHome();
    }

    setStep(index);
  }

  return (
    patientUIStore.onWalkthrough ? <div className={classes.container}>
      <IconButton className={classes.exit} onClick={() => { patientUIStore.onWalkthrough = false; setStep(0) }}><ClearIcon /> </IconButton>
      <SwipeContainer changeIndex={changeStep} />
      <ReactJoyride
        disableOverlayClose
        spotlightPadding={2}
        floaterProps={{ hideArrow: true }}
        tooltipComponent={Tooltip}
        steps={steps}
        run={true}
        disableScrolling
        continuous
        showProgress
        showSkipButton
        stepIndex={step}
        styles={{
          options: {
            overlayColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 150
          }
        }}
      />
    </div> : "")

});

const Tooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}) => {
  const classes = useStyles();
  return(
    <TooltipBody {...tooltipProps}>
      {step.title && <span>{step.title}</span>}
      <div>{step.content}</div>
    </TooltipBody>
  )};

const TooltipBody = styled.div`
  background-color: none;
  padding: 2em;
  color: white;
  `

const styles = {
  slide: {
    height: '100vh',
    width: "100vw",
    padding: "2em",
    color: 'red',
  }
};

const SwipeContainer = (props) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const handleChangeIndex = (index) => {

    props.changeIndex(index);
    setIndex(index);

  }

  const views = steps.map(() => { return (<div style={styles.slide}></div>) })

  return (
    <div className={classes.swipeContainer}>
      <div className={classes.paginationContainer}>
      <IconButton onClick={() => { handleChangeIndex(index - 1) }} ><Back /></IconButton>
      <Pagination className={classes.dots} dots={steps.length} index={index} onChangeIndex={handleChangeIndex} /> 
      <Button onClick={() => { handleChangeIndex(index + 1) }} ><Next /></Button>
      </div>

      {index == 0 && <div className={classes.bottomText}>
        <p>Swipe To See More</p>

      </div>}
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
      {index == 0 && <div className={classes.customPopOver}> <div>Welcome TO THIS THING !!!!!!!!!! ! </div> </div>}
        {views}

      </SwipeableViews>

    </div>)
};

export default Intro;