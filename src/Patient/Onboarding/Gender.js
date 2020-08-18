import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useTranslation } from 'react-i18next';
import SurveyHeader from './SurveyHeader';

const useStyles = makeStyles({
  form: {
    border: "solid 1px lightgray",
    borderRadius: "1em",
    width: "90%",
    padding: "1em"
  }
})

const Gender = observer((props) => {

  const { activationStore } = useStores();
  const classes = useStyles();
  const { t, i18n } = useTranslation('translation');

  const handleChange = (event) => {
    activationStore.onboardingInformation.gender = event.target.value;
  };

  return (
    <div className={props.bodyClass}>
      <SurveyHeader number={1} title={t("patient.onboarding.gender.title")} />
      <FormControl className={classes.form} component="fieldset">
        {/*<FormLabel component="legend">Gender</FormLabel>*/}
        <RadioGroup aria-label="gender" name="gender1" value={activationStore.onboardingInformation.gender} onChange={handleChange}>
          <FormControlLabel value="Female" control={<Radio color="primary" />} label={t("patient.onboarding.gender.female")} />
          <FormControlLabel value="Male" control={<Radio color="primary" />} label={t("patient.onboarding.gender.male")} />
          <FormControlLabel value="Other" control={<Radio color="primary" />} label={t("patient.onboarding.gender.other")} />
        </RadioGroup>
      </FormControl>
    </div>
  )
});

export default Gender;