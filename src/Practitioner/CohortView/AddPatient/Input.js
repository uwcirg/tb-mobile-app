import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../../Basics/UseStores";
import { observer } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  input: {
    "& input": {
      backgroundColor: "white",
      borderRadius: "4px",
    },
  },
});

const PatientInput = observer((props) => {
  const { t } = useTranslation("translation");
  const classes = useStyles();
  const { practitionerStore } = useStores();

  const handleInputs = (e) => {
    practitionerStore.newPatient.params[e.target.id] = e.target.value;
  };

  return (
    <TextField
      size="small"
      variant="outlined"
      id={props.id}
      label={t(`patient.userFields.${props.id}`)}
      onClick={props.onClick}
      type={props.type}
      onChange={handleInputs}
      error={
        practitionerStore.newPatient.errorReturned &&
        practitionerStore.newPatient.errors[props.id] != undefined
      }
      className={classes.input}
      value={practitionerStore.newPatient.params[props.id]}
    />
  );
});

export default PatientInput;
