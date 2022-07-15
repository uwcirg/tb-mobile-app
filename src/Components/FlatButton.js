import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import Colors from "../Basics/Colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    width: "fit-content",
    display: "flex",
    justifyContent: "flex-start",
    padding: ".15em .5em .15em .5em",
    borderRadius: "4px",
    fontSize: ".875em",
    boxSizing: "border-box",
    color: (props) => props.color || "white",
    backgroundColor: (props) => props.backgroundColor || Colors.buttonBlue,
    border: (props) => (props.border ? `solid 2px ${props.color}` : "none"),
    overflow: "grow",
    "& > span": {
      fontSize: "1em",
      textTransform: "capitalize",
      textAlign: "left",
      letterSpacing: ".15px",
      lineHeight: "1.15em",
      padding: ".5em",
    },
    "& > span  > svg": {
      fontSize: "1.2em",
      paddingRight: ".5em",
    },
    "&:hover": {
      backgroundColor: Colors.accentBlue,
      color: (props) => props.hoverColor || "white",
    },
    "&:disabled": {
      backgroundColor: Colors.lightgray,
    },
  },
});

const FlatButton = (props) => {
  const classes = useStyles(props);

  if (props.to) {
    return (
      <Button
        disabled={props.disabled}
        component={Link}
        to={props.to}
        size="small"
        className={`${props.className} ${classes.button}`}
      >
        {props.children}
      </Button>
    );
  }

  return (
    <Button
      disabled={props.disabled}
      onClick={props.onClick}
      size="small"
      className={`${props.className} ${classes.button}`}
    >
      {props.children}
    </Button>
  );
};

export default FlatButton;
