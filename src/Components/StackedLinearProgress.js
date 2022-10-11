import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../Basics/Colors";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  container: {
    margin: "1em auto",
  },
  barContainer: {
    height: "15px",
    borderRadius: "5px",
    overflow: "hidden",
    width: "100%",
    backgroundColor: Colors.adherence.red,
    display: "flex",
  },
});

const StackedLinearProgress = ({ partValue, totalValue }) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");

  return (
    <div className={classes.barContainer}>
      {partValue > 0 && (
        <div
          style={{
            backgroundColor: Colors.adherence.green,
            width: `${partValue}%`,
          }}
        />
      )}
      <div
        style={{
          backgroundColor: Colors.adherence.yellow,
          width: `${totalValue - partValue}%`,
        }}
      />
    </div>
  );
};

export default StackedLinearProgress;
