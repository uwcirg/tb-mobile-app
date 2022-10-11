import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  form: {
    padding: "1em",
    borderRadius: "1em",
    boxSizing: "border-box",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    width: "100%",
    fontSize: ".75em",
  },
});

const TracingOptions = ({ option, setOption }) => {
  const { t } = useTranslation("translation");
  const classes = useStyles();

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <FormControl className={classes.form} component="fieldset">
      <RadioGroup
        aria-label="contact-tracing-options"
        name="contact-tracing"
        value={option}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Yes"
          control={<Radio color="primary" />}
          label={t("patient.onboarding.contactTracing.all")}
        />
        <FormControlLabel
          value="Some"
          control={<Radio color="primary" />}
          label={t("patient.onboarding.contactTracing.some")}
        />
        <FormControlLabel
          value="No"
          control={<Radio color="primary" />}
          label={t("patient.onboarding.contactTracing.none")}
        />
        <FormControlLabel
          value="Unsure"
          control={<Radio color="primary" />}
          label={t("patient.onboarding.contactTracing.unsure")}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default TracingOptions;
