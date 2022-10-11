import { Grid, IconButton, Typography } from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import StickyTopBar from "./StickyTopBar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  topBar: {
    backgroundColor: "white",
    borderBottom: "1px solid lightgray",
  },
  topBarTitle: {
    fontSize: "1.25em",
    padding: ".5em 0",
  },
  backButton: {
    "& svg": {
      fontSize: "1.5em",
    },
    color: "black",
  },
  sticky: {
    position: "sticky",
    top: 0,
    zIndex: "100",
  },
});

export default function TopPageLabel({ title, sticky, handleExit }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      className={`${classes.topBar}  ${sticky ? classes.sticky : "a"}`}
      container
      alignItems="center"
      wrap="nowrap"
    >
      <IconButton
        className={classes.backButton}
        onClick={handleExit || history.goBack}
      >
        <ChevronLeftRounded />
      </IconButton>
      <Typography className={classes.topBarTitle} variant="h2">
        {title}
      </Typography>
    </Grid>
  );
}
