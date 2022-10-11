import React from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    fontSize: "1.25em",
    padding: ".5em 0",
  },
  backButton: {
    "& svg": {
      fontSize: "1.5em",
    },
    color: "black",
  },
  topBar: {
    backgroundColor: "white",
    borderBottom: "solid 1px lightgray",
  },
});

export function PageLabel({ title, handleExit, to, hideBackButton }) {
  const history = useHistory();

  const classes = useStyles();

  const buttonProps = to
    ? { component: Link, to: to }
    : { onClick: handleExit || history.goBack };

  return (
    <Grid
      className={classes.topBar}
      container
      alignItems="center"
      wrap="nowrap"
    >
      {!hideBackButton && (
        <IconButton className={classes.backButton} {...buttonProps}>
          <ChevronLeftRounded />
        </IconButton>
      )}

      <PageLabelTitle title={title} />
    </Grid>
  );
}

export function PageLabelTitle({ title }) {
  const classes = useStyles();
  return (
    <Typography className={classes.title} variant="h2">
      {title}
    </Typography>
  );
}
