import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "./Colors";
import Styles from "./Styles";

const useStyles = makeStyles({
  button: {
    borderRadius: "5px",
    backgroundColor: Colors.buttonBlue,
    color: "white",
    fontSize: "1em",
    textTransform: "capitalize",
    padding: ".5em",
    "&:hover": {
      background: Colors.buttonBlue,
    },
    "&:focus": {
      background: Colors.buttonBlue,
    },
  },
  inner: {
    padding: "0 .5em 0 .5em",
  },
  aligned: {
    ...Styles.alignRight,
  },
});

const SimpleButton = (props) => {
  const classes = useStyles();

  const Base = (
    <Button
      disableElevation
      className={classes.button}
      onClick={props.onClick}
      variant="contained"
      disabled={props.disabled}
    >
      <div className={classes.inner}>{props.children}</div>
    </Button>
  );

  return (
    <div
      className={`${props.alignRight && classes.aligned} ${
        props.className && props.className
      }`}
    >
      {Base}
    </div>
  );
};

export default SimpleButton;
