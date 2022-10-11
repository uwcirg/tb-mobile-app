import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tag from "../../../Components/Tag";
import Colors from "../../../Basics/Colors";

const useStyles = makeStyles({
  tag: {
    color: Colors.textDarkGray,
    fontWeight: "bold",
    margin: ".25em 0",
    maxWidth: "120px",
    textAlign: "center",
    fontSize: ".8em",
  },
});

const ReportTag = (props) => {
  const classes = useStyles();

  return <Tag {...props} className={`${classes.tag} ${props.className}`} />;
};

export default ReportTag;
