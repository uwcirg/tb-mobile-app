import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  test: {
    border: "solid 1px blue",
    height: "100px",
    overflow: "scroll",
  },
  panel: {
    boxShadow: "none",
    margin: 0,
  },
  heading: {
    fontSize: "1em",
  },
  icon: {
    padding: 0,
    margin: 0,
  },
  body: {
    "& > h1:first-of-type": {
      display: "none",
    },
  },
});

export default function Test(props) {
  const classes = useStyles();

  const title = props.children.find((each) => {
    return each.type === "h1";
  });

  return (
    <Panel title={title.props.children[0]} children={props.children.slice(1)} />
  );
}

function Panel(props) {
  const classes = useStyles();
  return (
    <ExpansionPanel className={classes.panel}>
      <ExpansionPanelSummary
        onClick={props.onClick}
        className={classes.summary}
        expandIcon={<ExpandMoreIcon className={classes.icon} />}
        aria-controls="panel-content"
        id="expand-section"
      >
        <Typography variant="h2" className={classes.heading}>
          {props.title}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.body}>{props.children}</div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
