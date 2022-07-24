import { TextField, makeStyles } from "@material-ui/core";
import React from "react";
import Colors from "../../Basics/Colors";

const useStyles = makeStyles({
  input: {
    backgroundColor: Colors.lightgray,
    borderRadius: "18px",
    border: "solid 1px lightgray",
  },
  label:{
      color: "black"
  }
});

export default function Input(props) {
  const classes = useStyles();

  return (
    <TextField
      {...props}
      fullWidth
      size="small"
      className={classes.input}
      InputLabelProps={{
        className: classes.label
      }
      }
      InputProps={{
        disableUnderline: true,
        style: {
          padding: ".5rem 1rem"
        },
      }}
      variant="standard"
    />
  );
}

Input.propTypes = {
  ...TextField.propTypes,
};
