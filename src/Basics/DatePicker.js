import React from "react";
import useStores from "./UseStores";
import { observer } from "mobx-react";
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/luxon";
import Colors from "./Colors";
import Exit from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    borderRadius: "5px",
    color: "white",
    padding: ".5em",
  },
  input: {
    "& input": {
      cursor: "pointer",
    },
  },
});

const LocalizedDatePicker = observer((props) => {
  const classes = useStyles();
  const { uiStore } = useStores();

  return (
    <MuiPickersUtilsProvider locale={uiStore.locale} utils={DateFnsUtils}>
      <DatePicker
        TextFieldComponent={props.TextFieldComponent}
        inputVariant={props.inputVariant}
        size={props.size}
        InputProps={{
          ...props.InputProps,
          className: ` ${classes.input} ${
            props.InputProps && props.InputProps.className
          }`,
        }}
        error={props.error}
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        animateYearScrolling
        disableFuture={props.disableFuture}
        disablePast={props.disablePast}
        cancelLabel={
          <Exit
            className={classes.button}
            style={{ backgroundColor: Colors.red }}
          />
        }
        okLabel={
          <CheckIcon
            className={classes.button}
            style={{ backgroundColor: Colors.green }}
          />
        }
        onAccept={props.onAccept}
      />
    </MuiPickersUtilsProvider>
  );
});

export default LocalizedDatePicker;
