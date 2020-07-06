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
import Back from '@material-ui/icons/ChevronLeft'
import Next from '@material-ui/icons/ChevronRight'
import Welcome from './Welcome'
import { useTranslation } from 'react-i18next';
import Steps from './Steps'
import TreatmentSteps from './TreatmentSteps'
import TestReport from './ExampleReport'
import {DateTime} from 'luxon'

const Wrapper = observer(() => {
  const { patientUIStore,patientStore } = useStores();

  //Load Test Data for calendar example
  useEffect( () => {
    console.log("effect used")

      const today = DateTime.local().startOf('day')
      let testReports = {}

      for(let i = 0; i < 7; i++){
          let newDay = today.minus({days: i})
          testReports[newDay.toISODate()] = TestReport;
      }
      
     patientStore.savedReports = testReports;

     return function cleanup(){
       patientStore.getReports();
     }


  },[])


  return (
    <Intro stepsList={patientUIStore.onTreatmentWalkthrough ? TreatmentSteps : Steps} />
  )
})

const Intro = observer((props) => {

  const [step, setStep] = useState(0);

  const classes = useStyles();
  const { patientUIStore, routingStore } = useStores();

  const exit = () => {
    patientUIStore.onWalkthrough = false;
    setStep(0);
  }


  const changeStep = (index) => {
    props.stepsList[index] && routingStore.push(props.stepsList[index].push)
    if (index < 0) {

      setStep(0)
      return
    } else if (index > props.stepsList.length - 1) {
      setStep(props.stepsList.length - 1)
      return
    }

    setStep(index);
  }

  return (
     <div className={classes.container}>
      <SwipeContainer stepsList={props.stepsList} exit={exit} index={step} changeIndex={changeStep} />
      <ReactJoyride
        disableOverlayClose
        disableScrolling
        spotlightPadding={2}
        floaterProps={{ hideArrow: true }}
        tooltipComponent={Tooltip}
        steps={props.stepsList}
        run={true}
        continuous
        showProgress
        showSkipButton
        stepIndex={step}
        styles={{
          options: {
            overlayColor: props.stepsList[step].placement === 'center' ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,.85)',
            zIndex: 150
          }
        }}
      />
    </div>)

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
  const { routingStore } = useStores();


  useEffect(() => {
    //If the step includes a new route, go to that route
    if (step.scrollToTop) {
      window.scrollTo(0, 0)
      return
    }

    //Scroll to the item
    if (step.target !== "" && !step.preventScroll) {
      let element = document.querySelector(step.target);
      let headerOffset = step.scrollOffset ? step.scrollOffset : 60;
      let elementPosition = element.getBoundingClientRect().top;
      let offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

  }, [index])


  return (

    <TooltipBody {...step} {...tooltipProps}>
      <div>
        {step.component ? <>{step.component}</> :
          <>
            {step.title && <span>{step.title}</span>}
            <div className={classes.stepContent}>{t(step.translationString)}</div></>}
      </div>
    </TooltipBody>
  )
};

const TooltipBody = styled.div`
  
  color: white;
  background-color: ${props => props.fillBackground ? "rgba(0,0,0,.7)" : "none"};
  width: ${props => props.placement === "center" ? "100vw" : "inherit"};

  div{
    margin: auto;
    padding: 1em;
  }
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
  const { t, i18n } = useTranslation('walkthrough');

  const handleChangeIndex = (index) => {
    props.changeIndex(index);
  }

  const views = props.stepsList.map(() => { return (<div style={styles.slide}></div>) })

  return (
    <div className={classes.swipeContainer}>
      <div className={classes.controls}>
        <div className={classes.paginationContainer}>
          <IconButton onClick={() => { handleChangeIndex(props.index - 1) }} ><Back /></IconButton>
          <Pagination className={classes.dots} dots={props.stepsList.length} index={props.index} onChangeIndex={props.changeIndex} />
          <Button onClick={() => { handleChangeIndex(props.index + 1) }} ><Next /></Button>
        </div>
        <IconButton className={classes.exit} onClick={props.exit}><ClearIcon /> </IconButton>
      </div>
      {props.index == 0 && <div className={classes.bottomText}>
        <p>{t("swipe")}</p>
        <Next />
      </div>}
      <SwipeableViews index={props.index} onChangeIndex={handleChangeIndex}>
        {views && views}
      </SwipeableViews>

    </div>)
};

const useStyles = makeStyles({
  controls: {
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
    bottom: "80px",
    color: "white",
    zIndex: -1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > p": {
      textAlign: "center",
      margin: 0,
      padding: 0
    }
  },
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    height: "60px",

    "& > button": {
      color: "white",
    }
  }
})

export default Wrapper;