import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress size="25%" />{" "}
    </div>
  );
};

export default Loading;
