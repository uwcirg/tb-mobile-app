import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import Colors from "../../Basics/Colors";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    margin: "0 auto",
    backgroundColor: (props) => props.color,
    borderRadius: "5px",
    textTransform: "capitalize",
    padding: ".5em",
    color: "white",
    lineHeight: "1.2em",
    "&:hover": {
      backgroundColor: Colors.accentBlue,
    },
  },
  icon: {
    padding: "0 1em",
    "& > svg": {
      fontSize: "1em",
    },
  },
});

const SharedButton = (props) => {
  const styleProps = { color: props.color ? props.color : Colors.buttonBlue };
  const classes = useStyles(styleProps);

  return (
    <Button
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
    >
      {props.icon ? props.icon : <CheckIcon />}
      <Box padding="0 .5em">{props.text && props.text}</Box>
    </Button>
  );
};

export default SharedButton;
