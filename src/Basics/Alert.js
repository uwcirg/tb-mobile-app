import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  alert: {
    marginTop: "1em",
    textTransform: "capitalize",
  },
}));

export default function CustomizedSnackbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    //Dont want to close on clickaway
    if (reason === "clickaway") {
      return;
    }

    props.onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: props.position ? props.position : "top",
        horizontal: "center",
      }}
      className={classes.alert}
      open={open}
      autoHideDuration={7000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={props.severity ? props.severity : "error"}
      >
        {props.text}
      </Alert>
    </Snackbar>
  );
}
