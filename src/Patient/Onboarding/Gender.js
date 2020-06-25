import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useTranslation } from 'react-i18next';
import SurveyHeader from './SurveyHeader';

const useStyles = makeStyles({
    form:{
        border: "solid 1px lightgray",
        borderRadius: "1em",
        width: "90%",
        padding: "1em"
    }
})

const Gender = (props) => {

    const {activationStore} = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('onboarding');
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
      };

    return (
        <div className={props.bodyClass}>
        <SurveyHeader number={1} title={t("gender.title")} />
        <FormControl className={classes.form} component="fieldset">
        {/*<FormLabel component="legend">Gender</FormLabel>*/}
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel  value="female" control={<Radio color="primary" />} label={t("gender.female")} />
          <FormControlLabel value="male" control={<Radio color="primary" />} label={t("gender.male")} />
          <FormControlLabel value="other" control={<Radio color="primary" />} label={t("gender.other")} />
        </RadioGroup>
      </FormControl>
      </div>
    )
}

export default Gender;