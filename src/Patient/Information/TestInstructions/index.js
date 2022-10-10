import React, { useReducer } from "react";
import InstructionStep from "./InstructionStep";
import {
  Grid,
  Box,
  makeStyles,
  MobileStepper,
  IconButton,
} from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Colors from "../../../Basics/Colors";
import { withStyles } from "@material-ui/styles";
import { useSwipeable } from "react-swipeable";

function reducer(state, action) {
  switch (action.type) {
    case "next":
      return state + 1;
    case "previous":
      return state - 1;
    default:
      throw new Error();
  }
}

const useStyles = makeStyles({
  spaced: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FAFAFA",
    padding: "1rem",
  },
  big: {
    fontSize: "5rem",
  },
  step: { maxWidth: "400px" },
  container: {
    boxSizing: "border-box",
    minHeight: "calc(90vh - 60px)",
    padding: "1em",
  },
});

const TestInstructions = () => {
  const classes = useStyles();

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => {
      if (step < 5 && eventData.dir === "Left") {
        dispatch({ type: "next" });
      }
      if (step > 0 && eventData.dir === "Right") {
        dispatch({ type: "previous" });
      }
    },
  });

  const [step, dispatch] = useReducer(reducer, 0);

  return (
    <Grid className={classes.container} direction="column" container>
      <Grid justify="space-between" container>
        <StepperButton
          children={<ChevronLeft />}
          onClick={() => {
            dispatch({ type: "previous" });
          }}
          disabled={step === 0}
        />
        <MobileStepper
          style={{ backgroundColor: "white" }}
          steps={6}
          variant="dots"
          position="static"
          activeStep={step}
        />
        <StepperButton
          children={<ChevronRight />}
          onClick={() => {
            dispatch({ type: "next" });
          }}
          disabled={step >= 5}
        />
      </Grid>
      <Box
        style={{ boxSizing: "border-box" }}
        flexGrow="1"
        padding="0 1em"
        width="100%"
        maxWidth="500px"
      >
        <div {...swipeHandlers}>
          <InstructionStep className="step" currentStep={step} />
        </div>
      </Box>
    </Grid>
  );
};

const StepperButton = withStyles({
  root: {
    "&:focus, &:hover": {
      backgroundColor: Colors.buttonBlue,
    },
    borderRadius: "4px",
    backgroundColor: Colors.buttonBlue,
    color: "white",
  },
})(IconButton);

export default TestInstructions;
