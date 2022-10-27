import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Styles from "../../Basics/Styles";
import Collapse from "@material-ui/core/Collapse";
import { DateTime } from "luxon";
import IconButton from "@material-ui/core/IconButton";
import ExpandButton from "@material-ui/icons/KeyboardArrowDown";
import CollapseButton from "@material-ui/icons/KeyboardArrowUp";
import Tag from "../../Components/Tag";

const useStyles = makeStyles({
  report: {
    ...Styles.profileCard,
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: "white",
    marginBottom: ".75em",
    "& > .preview": {
      transition: "all 2s ease",
      display: "flex",
      padding: ".75em",
      alignItems: "center",
      "& > button.expand": {
        marginLeft: "auto",
      },
      "& > .time": {
        height: "auto",
        padding: "0 1em",
        ...Styles.flexColumn,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        "& > span": {
          fontSize: "1.5em",
          margin: 0,
        },
        "& > p": {
          fontSize: "1em",
          margin: 0,
        },
      },
    },
  },
  mainReportContent: {
    display: "flex",
    flexGrow: "1",
    "& > div.section": {
      marginLeft: "1em",
      paddingRight: "1em",
      borderRight: "solid 1px gray",
    },
    "& > div.section:last-of-type": {
      borderRight: "none",
    },
  },
});

const ReportCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();
  const date = DateTime.fromISO(props.date);

  return (
    <div className={classes.report}>
      <div className="preview">
        <div className="time">
          <span>{date.day}</span>
          <p>{date.monthShort}</p>
        </div>
        <Tag backgroundColor={props.tagColor}>{props.tagText}</Tag>
        <div className={classes.mainReportContent}>{props.children}</div>
        {props.expandedContent && (
          <IconButton
            className="expand"
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? <CollapseButton /> : <ExpandButton />}
          </IconButton>
        )}
      </div>
      {props.expandedContent && (
        <Collapse in={expanded}>{props.expandedContent}</Collapse>
      )}
    </div>
  );
};

export default ReportCard;
