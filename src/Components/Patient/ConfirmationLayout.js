import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Styles from "../../Basics/Styles";
import { ReactComponent as DoctorIcon } from "../../Basics/Icons/doctor.svg";
import CheckIcon from "@material-ui/icons/Check";
import Colors from "../../Basics/Colors";
import { Box, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  iconContainer: {
    position: "relative",
  },
  check: {
    position: "absolute",
    top: "25%",
    right: 0,
    fontSize: "2em",
    color: "white",
    backgroundColor: Colors.green,
    padding: "5px",
    borderRadius: "50%",
  },
  confirmationText: {
    ...Styles.flexColumn,
    paddingLeft: "1em",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "50%",
    height: "100%",
    textAlign: "left",
  },
  confirmationHeaderText: {
    fontSize: "1.5em",
    margin: 0,
    alignSelf: "flex-end",
  },
  lowerText: {
    lineHeight: "1.25em",
  },
});

const ConfirmationLayout = ({ title, subtitle }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <div className={classes.iconContainer}>
        <DoctorIcon />
        <CheckIcon className={classes.check} />
      </div>
      <div className={classes.confirmationText}>
        <Grid wrap="nowrap" container>
          <div>
            <Typography className={classes.confirmationHeaderText}>
              {title}
            </Typography>
            <Typography className={classes.lowerText}>{subtitle} 👍</Typography>
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

export default ConfirmationLayout;
