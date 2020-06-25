import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import FormControl from '@material-ui/core/FormControl';
import SurveyHeader from './SurveyHeader';
import { useTranslation } from 'react-i18next';
import IconButton from "@material-ui/core/IconButton";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MinusIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddIcon from '@material-ui/icons/AddBox';


const useStyles = makeStyles((theme) => ({
    numberSelector: {
        display: "flex",
        width: "100%",
        justifyContent: "center"
    },
    form: {
        padding: "1em",
        borderRadius: "1em",
        boxSizing: "border-box",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        width: "100%",
        fontSize: ".75em"
    },
    button:{
        fontSize: "2em"
    }
}));

const ContactTracing = observer((props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('onboarding');
    const { activationStore } = useStores();


    return (<div className={props.bodyClass}>
        <SurveyHeader number={5} title={t("contactTracing.one")} />
        <Counter />
        {activationStore.onboardingInformation.numberOfContacts > 0 && <>
            <SurveyHeader number={6} title={t("contactTracing.two")} />
            <Survey />
        </>
        }
    </div>)
});

const Counter = observer(() => {
    const classes = useStyles();
    const { activationStore } = useStores();

    return (
        <div className={classes.numberSelector}>
            <IconButton className={classes.button} onClick={() => { activationStore.addToNumberOfContacts(-1) }}>
                <MinusIcon />
            </IconButton>
            <p>{activationStore.onboardingInformation.numberOfContacts}</p>
            <IconButton className={classes.button} onClick={() => { activationStore.addToNumberOfContacts(1) }}>
                <AddIcon />
            </IconButton>
        </div>
    );
})

const Survey = observer(() => {
    const { t, i18n } = useTranslation('onboarding');
    const classes = useStyles();
    const [value, setValue] = useState("yes")

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl className={classes.form} component="fieldset">
            {/*<FormLabel component="legend">Gender</FormLabel>*/}
            <RadioGroup aria-label="contact-tracing-options" name="contact-tracing" value={value} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio color="primary" />} label={t("contactTracing.yes")} />
                <FormControlLabel value="no" control={<Radio color="primary" />} label={t("contactTracing.some")} />
                <FormControlLabel value="some" control={<Radio color="primary" />} label={t("contactTracing.no")} />
            </RadioGroup>
        </FormControl>
    )
})



export default ContactTracing;

