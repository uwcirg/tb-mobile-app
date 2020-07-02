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
import Welcome from './Welcome'
import { useTranslation } from 'react-i18next';


const Intro = observer(() => {

  const [step, setStep] = useState(0);

  const classes = useStyles();
  const { patientUIStore } = useStores();

  const exit = () => {
    patientUIStore.onWalkthrough = false; 
    setStep(0);
  }

  const handleJoyrideCallback = data => {
    const { action, index, status, type } = data;

    /*
    console.log(action)    
    console.log(type)
    console.log(index)
    */

    if (type === "tooltip") {
      //index === 1 && window.scrollTo(0, 0);
      //index === 2 && window.scrollTo(0, document.body.scrollHeight);
    }

  };


  const changeStep = (index) => {

    if (index < 0) {
      setStep(0)
      return
    } else if (index > Steps.length - 1) {
      return
    }

    setStep(index);
  }

  return (
    patientUIStore.onWalkthrough ? <div className={classes.container}>
      <SwipeContainer exit={exit} index={step} changeIndex={changeStep} />
      <ReactJoyride
        disableOverlayClose
        disableScrolling
        spotlightPadding={2}
        floaterProps={{ hideArrow: true }}
        tooltipComponent={Tooltip}
        steps={Steps}
        run={true}
        continuous
        callback={handleJoyrideCallback}
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
  const { t, i18n } = useTranslation('walkthrough');


  useEffect(() => {
    if (!step.preventScroll) {
      let element = document.querySelector(step.target);
      let headerOffset = 60;
      let elementPosition = element.getBoundingClientRect().top;
      let offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, [])


  return (

    <TooltipBody step={step} {...tooltipProps}>
      {step.component ? <>{step.component}</> :
        <>
          {step.title && <span>{step.title}</span>}
          <div className={classes.stepContent}>{t(step.translationString)}</div></>}
    </TooltipBody>
  )
};

const TooltipBody = styled.div`
  background-color: none;
  padding: ${props => { props.step.component ? "0" : "2em" }};
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
      <div className={classes.controls}>
        <div className={classes.paginationContainer}>
          <IconButton onClick={() => { handleChangeIndex(props.index - 1) }} ><Back /></IconButton>
          <Pagination className={classes.dots} dots={Steps.length} index={props.index} onChangeIndex={props.changeIndex} />
          <Button onClick={() => { handleChangeIndex(props.index + 1) }} ><Next /></Button>
        </div>
        <IconButton className={classes.exit} onClick={props.exit}><ClearIcon /> </IconButton>
      </div>

      {props.index == 0 && <div className={classes.bottomText}>
        <p>Swipe To See More</p>

      </div>}
      <SwipeableViews index={props.index} onChangeIndex={handleChangeIndex}>
        {props.index == 0 && <Welcome />}
        {views && views}
      </SwipeableViews>

    </div>)
};

const useStyles = makeStyles({
  controls:{
    display: "flex",
    alignItems: "center",
    width: "100%",
    position: "fixed",
    top: "0",
    zIndex: "1003",
    backgroundColor: "black"
  },
  exit: {
    color: "white",
    marginLeft: "auto"
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
    zIndex: 1,
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

    "& > button": {
      color: "white",
    }
  },
  stepContent: {
    width: "80%",
    margin: "auto"
  }
})

export default Intro;