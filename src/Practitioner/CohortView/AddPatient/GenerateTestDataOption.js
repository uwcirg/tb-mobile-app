import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles({
  checkbox: {
    marginTop: "2em",
    "& > span": {
      fontSize: ".75em",
    },
  },
});

const GenerateTestDataOption = observer(() => {
  const { practitionerStore } = useStores();
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          checked={practitionerStore.newPatient.params.isTester}
          onChange={() => {
            practitionerStore.newPatient.params.isTester =
              !practitionerStore.newPatient.params.isTester;
          }}
          name="checkedA"
        />
      }
      className={classes.checkbox}
      label="Generate Random Treatment History (For Testing)"
    />
  );
});

export default GenerateTestDataOption;
