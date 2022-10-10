import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../Basics/Colors";
import IconButton from "@material-ui/core/IconButton";
import { AutoWidth } from "./Containers";
import Exit from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles({
  buttons: {
    padding: "1em",
    marginTop: "2em",
  },
  cancel: {
    backgroundColor: Colors.warningRed,
    marginRight: "1em",
    "&:hover": {
      backgroundColor: Colors.red,
    },
  },
  ok: {
    backgroundColor: Colors.green,
    "&:hover": {
      backgroundColor: Colors.approvedGreen,
    },
  },
  button: {
    borderRadius: "5px",
    color: "white",
  },
});

const YesNoButtons = ({ handleCancel, handleAccept }) => {
  const classes = useStyles();

  return (
    <AutoWidth justify="flex-end" className={classes.buttons}>
      <Button onClick={handleCancel} className={classes.cancel}>
        <Exit />
      </Button>
      <Button onClick={handleAccept} className={classes.ok}>
        <CheckIcon />
      </Button>
    </AutoWidth>
  );
};

const Button = (props) => {
  const classes = useStyles();
  return (
    <IconButton {...props} className={`${classes.button} ${props.className}`} />
  );
};

export default YesNoButtons;
