import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Styles from "../../Basics/Styles";
import Colors from "../../Basics/Colors";

const useStyles = makeStyles({
  reportItem: {
    ...Styles.flexColumn,
    justifyContent: "flex-start",
    fontSize: ".875em",
    letterSpacing: ".15px",
    color: Colors.textDarkGray,
    // minWidth: props => props.type === "symptoms-preview" && "160px",
    "& > span": {
      fontWeight: "bold",
      "& > svg": {
        fontSize: "4em",
      },
    },
    "& > span, & > p": {
      margin: 0,
      padding: 0,
    },
    "& > p": {
      marginBottom: "3px",
    },
  },
});

const ReportItem = (props) => {
  const classes = useStyles(props);
  return (
    <div className={`section ${classes.reportItem}`}>
      {/* <p>{props.title}</p> */}
      <span>{props.content}</span>
    </div>
  );
};

export default ReportItem;
