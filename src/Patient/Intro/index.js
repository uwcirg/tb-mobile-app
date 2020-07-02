import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import ReactJoyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import SwipeableViews from 'react-swipeable-views';
import Pagination from './Pagination';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import Steps from './Steps'
import Back from '@material-ui/icons/ChevronLeft'
import Next from '@material-ui/icons/ChevronRight'

const Intro = observer(() => {

  const [step, setStep] = useState(0);

  const classes = useStyles();
  const { patientUIStore } = useStores();

  const handleJoyrideCallback = data => {
    const { action, index, status, type } = data;

    console.log(action)

    if (type === "tooltip") {
      index === 1 && window.scrollTo(0, 0);
      index === 2 && window.scrollTo(0, document.body.scrollHeight);
    }
    console.log(type)
    console.log(index)
  };


  const changeStep = (index) => {

    if (index < 0) {
      setStep(0)
      return
    } else if (index > Steps.length - 1) {
      return
    }

    setStep(index);

    if (index == 3) {
      //patientUIStore.goToProgress();
    } else {
      patientUIStore.goToHome();
    }
  }

  return (
    patientUIStore.onWalkthrough ? <div className={classes.container}>
      <IconButton className={classes.exit} onClick={() => { patientUIStore.onWalkthrough = false; setStep(0) }}><ClearIcon /> </IconButton>
      <SwipeContainer index={step} changeIndex={changeStep} />
      <ReactJoyride
        disableOverlayClose
        spotlightPadding={2}
        floaterProps={{ hideArrow: true }}
        tooltipComponent={Tooltip}
        steps={Steps}
        run={true}
        continuous
        callback={handleJoyrideCallback}
        disableScrolling
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
    </div> : <div />)

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


  return (
    <TooltipBody disableAnimation {...tooltipProps}>
      {step.title && <span>{step.title}</span>}
      <div>{step.content}</div>

    </TooltipBody>
  )
};

const TooltipBody = styled.div`
  background-color: none;
  padding: 2em;
  box-sizing: border-box;
  color: white;
  `

const styles = {
  slide: {
    height: '100vh',
    width: "100vw",
    color: 'red',
  }
};

const SwipeContainer = (props) => {
  const classes = useStyles();

  const handleChangeIndex = (index) => {
    props.changeIndex(index);
  }

  const views = Steps.map(() => { return (<div style={styles.slide}></div>) })

  return (
    <div className={classes.swipeContainer}>
      <div className={classes.paginationContainer}>
        <IconButton onClick={() => { handleChangeIndex(props.index - 1) }} ><Back /></IconButton>
        <Pagination className={classes.dots} dots={Steps.length} index={props.index} onChangeIndex={handleChangeIndex} />
        <Button onClick={() => { handleChangeIndex(props.index + 1) }} ><Next /></Button>
      </div>

      {props.index == 0 && <div className={classes.bottomText}>
        <p>Swipe To See More</p>

      </div>}
      <SwipeableViews index={props.index} onChangeIndex={handleChangeIndex}>
          {props.index == 0 && <div className={classes.customPopOver}> <div>Thanks for signing up to use treatment assistant. We will now guide you through some of the core features of the application.</div> </div>}
          {views && views}
      </SwipeableViews>

    </div>)
};

const useStyles = makeStyles({
  exit: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 1005,
    color: "white",
    padding: "1em",
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
    alignItems: "center",
    width: "100%",
    position: "fixed",
    top: "0",
    zIndex: "1003",

    "& > button": {
      color: "white",
    }
  },
  customPopOver: {
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

export default Intro;