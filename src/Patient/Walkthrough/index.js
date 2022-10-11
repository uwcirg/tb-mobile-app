import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import ReactJoyride from "react-joyride";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { useTranslation } from "react-i18next";
import Steps from "./Steps";
import TestReport from "./ExampleReport";
import { DateTime } from "luxon";
import Colors from "../../Basics/Colors";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { useHistory } from "react-router-dom";

const Wrapper = observer((props) => {
  const { patientUIStore, patientStore } = useStores();
  const classes = useStyles();

  //Load Test Data for calendar example
  useEffect(() => {
    const today = DateTime.local().startOf("day");
    let testReports = {};

    for (let i = 0; i < 7; i++) {
      let newDay = today.minus({ days: i });
      testReports[newDay.toISODate()] = TestReport;
    }
    patientStore.tempTreatmentStart = patientStore.treatmentStart;
    patientStore.treatmentStart = today.minus({ days: 8 }).toISODate();
    patientStore.savedReports = testReports;

    return function cleanup() {
      patientStore.getReports();
      patientStore.treatmentStart = patientStore.tempTreatmentStart;
    };
  }, []);

  return (
    <>
      <div className={classes.exit}>
        {!Steps[patientUIStore.walkthroughStep].hideExit && (
          <IconButton
            onClick={() => {
              patientUIStore.onWalkthrough = false;
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </div>
      <Intro startOn={props.startOn} stepsList={Steps} />
    </>
  );
});

const Intro = observer((props) => {
  const classes = useStyles();
  const { patientUIStore } = useStores();
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: `Walkthrough Step ${patientUIStore.walkthroughStep}`,
    });
  }, [patientUIStore.walkthroughStep]);

  return (
    <div className={classes.container}>
      <ReactJoyride
        disableOverlayClose
        disableScrolling
        spotlightPadding={2}
        floaterProps={{ hideArrow: false, disableAnimation: true }}
        tooltipComponent={Tooltip}
        steps={props.stepsList}
        run={true}
        continuous
        showProgress
        showSkipButton
        stepIndex={patientUIStore.walkthroughStep}
        styles={{
          options: {
            overlayColor:
              props.stepsList[patientUIStore.walkthroughStep].placement ===
              "center"
                ? "rgba(0,0,0,.5)"
                : "rgba(0,0,0,.85)",
            zIndex: 150,
            arrowColor: Colors.blue,
          },
        }}
      />
    </div>
  );
});

const Tooltip = observer(({ index, step, tooltipProps }) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");
  const { routingStore, patientUIStore } = useStores();
  const history = useHistory();

  const isLastStep = patientUIStore.walkthroughStep === Steps.length - 1;
  const isFirstStep = patientUIStore.walkthroughStep === 0;

  const goForward = () => {
    if (!isLastStep) {
      const newValue = patientUIStore.walkthroughStep + 1;
      changePage(newValue);
    }
  };

  const goBackward = () => {
    if (!isFirstStep) {
      const newValue = patientUIStore.walkthroughStep - 1;
      changePage(newValue);
    }
  };

  const changePage = (newValue) => {
    // routingStore.push(Steps[newValue].push)
    history.push(Steps[newValue].push);
    patientUIStore.setWalkthroughStep(newValue);
  };

  useEffect(() => {
    //If the step includes a new route, go to that route
    if (step.scrollToTop) {
      window.scrollTo(0, 0);
      return;
    }

    //Scroll to the item
    if (step.target !== "" && !step.preventScroll) {
      let element = document.querySelector(step.target);

      if (element) {
        let headerOffset = step.scrollOffset ? step.scrollOffset : 60;
        let elementPosition = element.getBoundingClientRect().top;
        let offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [index]);

  return (
    <TooltipBody {...step} {...tooltipProps}>
      <div>
        <div className="content">
          {step.component ? (
            <>{step.component}</>
          ) : (
            <>
              {step.title && <span>{step.title}</span>}
              <div className={classes.stepContent}>
                {t(step.translationString)}
              </div>
            </>
          )}
        </div>
        <div className={classes.navigation}>
          <IconButton disabled={isFirstStep} onClick={goBackward}>
            <ArrowBackIcon />
          </IconButton>
          <span>
            {patientUIStore.walkthroughStep + 1}/{Steps.length}
          </span>
          <IconButton disabled={isLastStep} onClick={goForward}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>
    </TooltipBody>
  );
});

const TooltipBody = styled.div`
  color: white;
  background-color: ${Colors.blue};
  border-radius: 10px;
  display: flex;
  justify-content: center;

  div {
    width: 95vw;
    box-sizing: border-box;

    .content {
      width: 100%;
      padding: 1em;

      div {
        width: 90%;
      }
    }
  }
`;

const useStyles = makeStyles({
  controls: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    position: "fixed",
    top: "0",
    zIndex: "1003",
    backgroundColor: "black",
  },
  exit: {
    position: "fixed",
    top: 0,
    zIndex: "151",
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    "& > button": {
      marginLeft: ".5em",
      backgroundColor: Colors.blue,
      color: "white",
    },
  },
  swipeContainer: {
    position: "fixed",
    top: "5px",
    height: "100vh",
    width: "100vw",
    zIndex: 1001,
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
      padding: 0,
    },
  },
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    height: "60px",

    "& > button": {
      color: "white",
    },
  },
  navigation: {
    width: "90%",
    display: "flex",
    padding: "0 1em 1em 1em",
    justifyContent: "space-between",
    alignItems: "center",
    "& > button": {
      color: "white",
    },
  },
});

export default Wrapper;
