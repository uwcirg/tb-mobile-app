import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "./Colors";

const useStyles = makeStyles({
  circle: {
    background: Colors.green,
    borderRadius: "50%",
    height: "50px",
    width: "50px",
  },
  letter: {
    color: "white",
    float: "left",
    lineHeight: 1,
    marginTop: "-0.5em",
    paddingTop: "50%",
    textAlign: "center",
    width: "100%",
    fontSize: "1.5em",
  },
});

export default function Icon(props) {
  const classes = useStyles();
  return (
    <div className={`${classes.container} ${props.className}`}>
      <div className={classes.circle}>
        <p className={classes.letter}>{props.name[0]}</p>
      </div>
    </div>
  );
}
