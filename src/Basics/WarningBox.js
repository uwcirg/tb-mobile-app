import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../Basics/Colors";

const useStyles = makeStyles({
  container: {
    border: `2px solid ${Colors.yellow}`,
    backgroundColor: Colors.timelineYellow,
    borderRadius: "10px",
    minHeight: "50px",
    padding: ".5em 1em",
    boxSizing: "border-box",
  },
});

const WarningBox = (props) => {
  const classes = useStyles();

  return (
    <div className={`${classes.container} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default WarningBox;
