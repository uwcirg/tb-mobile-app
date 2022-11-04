import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ReportButton from "../../../Components/ReportButton";

const useStyles = makeStyles({
  fullWidth: {
    padding: "0 1em",
    boxSizing: "border-box",
  },
});

const BottomButton = ({ onClick, children, disabled }) => {
  const classes = useStyles();

  return (
    <Grid justify="flex-end" className={classes.fullWidth} container>
      <ReportButton disabled={disabled} onClick={onClick}>
        {children}
      </ReportButton>
    </Grid>
  );
};

export default BottomButton;
