import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useTranslation } from "react-i18next";
import SurveyHeader from "./SurveyHeader";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  form: {
    border: "solid 1px lightgray",
    borderRadius: "1em",
    width: "90%",
    padding: "1em",
  },
  label: {
    textTransform: "capitalize",
  },
});

const Gender = observer((props) => {
  const { activationStore } = useStores();
  const classes = useStyles();
  const { t, i18n } = useTranslation("translation");

  const handleChange = (event) => {
    activationStore.onboardingInformation.gender = event.target.value;
  };

  return (
    <div className={props.bodyClass}>
      <SurveyHeader
        index={props.index}
        title={t("patient.onboarding.gender.title")}
      />
      <FormControl className={classes.form} component="fieldset">
        {/*<FormLabel component="legend">Gender</FormLabel>*/}
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={activationStore.onboardingInformation.gender}
          onChange={handleChange}
        >
          <Label
            value="Woman"
            control={<Radio color="primary" />}
            label={t("patient.onboarding.gender.woman")}
          />
          <Label
            value="Man"
            control={<Radio color="primary" />}
            label={t("patient.onboarding.gender.man")}
          />
          <Label
            value="TransWoman"
            control={<Radio color="primary" />}
            label={t("patient.onboarding.gender.transWoman")}
          />
          <Label
            value="TransMan"
            control={<Radio color="primary" />}
            label={t("patient.onboarding.gender.transMan")}
          />
          <Label
            value="Nonbinary"
            control={<Radio color="primary" />}
            label={t("patient.onboarding.gender.nonbinary")}
          />
          <Label
            value="Other"
            control={<Radio color="primary" />}
            label={t("patient.onboarding.gender.other")}
          />
          {activationStore.onboardingInformation.gender === "Other" && (
            <TextField
              value={activationStore.onboardingInformation.genderOther}
              label={t("patient.onboarding.gender.question")}
              onChange={(e) => {
                activationStore.onboardingInformation.genderOther =
                  e.target.value;
              }}
            />
          )}
        </RadioGroup>
      </FormControl>
    </div>
  );
});

const Label = (props) => {
  const classes = useStyles();
  return <FormControlLabel className={classes.label} {...props} />;
};

export default Gender;
