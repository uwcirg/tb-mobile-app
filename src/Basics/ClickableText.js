import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonBase } from "@material-ui/core";
import Colors from "./Colors";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  text: {
    color: Colors.buttonBlue,
    background: "none",
    textTransform: "capitalize",
    fontSize: "1em",
    fontFamily: "Roboto, sans-serif",
    "& > svg": {
      marginRight: ".25em",
    },
    textAlign: "left",
  },
  big: {
    fontSize: "1em",
  },
});

const ClickableText = (props) => {
  const classes = useStyles();

  const propsToUse = {
    component: props.to ? Link : "button",
    onClick: props.onClick,
    to: props.to,
  };

  return !props.big ? (
    <ButtonBase
      {...propsToUse}
      className={`${classes.text} ${props.className}`}
    >
      {!props.hideIcon && (
        <>{props.icon ? <>{props.icon}</> : <ErrorOutlineIcon />}</>
      )}
      {props.text}
    </ButtonBase>
  ) : (
    <ButtonBase
      {...propsToUse}
      className={`${classes.text} ${classes.big} ${props.className}`}
    >
      {props.text}
    </ButtonBase>
  );
};

export default ClickableText;
