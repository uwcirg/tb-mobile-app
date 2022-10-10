import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Colors from "../../Basics/Colors";

const useStyles = makeStyles({
  root: {},
  icon: {
    fontSize: "1em",
    marginRight: "5px",
  },
  button: {
    textTransform: "capitalize",
    color: Colors.buttonBlue,
    padding: 0,
  },
  text: {
    marginRight: ".5em",
  },
});

const EditableField = (props) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" direction="row">
      <Grid item className={classes.text}>
        <strong>{props.label}</strong>:
      </Grid>
      <Grid item className={classes.text}>
        {props.value}
      </Grid>
      <Button className={classes.button} disableElevation>
        <EditIcon className={classes.icon} />
        Edit
      </Button>
    </Grid>
  );
};

export default EditableField;
