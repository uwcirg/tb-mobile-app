import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../Basics/UseStores";
import { observer } from "mobx-react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  bar: {
    bottom: "70px",
  },
}));

const BottomAlert = observer(() => {
  const { uiStore } = useStores();
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    uiStore.alertVisible = false;
  };

  return (
    <Snackbar
      className={classes.bar}
      open={uiStore.alertVisible}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={uiStore.alertType}>
        {uiStore.alertText}
      </Alert>
    </Snackbar>
  );
});

export default BottomAlert;
