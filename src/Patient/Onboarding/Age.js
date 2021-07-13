import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import SurveyHeader from './SurveyHeader';
import { useTranslation } from 'react-i18next';
import { Input } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
    },
    selectEmpty: {

    },
    inputContainer: {
        width: "40%",
        margin: "auto"
    },
    input:{
        fontSize: "1.5em",
        textAlign: "center"
    }
}));

const Age = observer((props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const { activationStore } = useStores();

    //Limit to only reasonable ages here
    const handleChange = (e) => { activationStore.onboardingInformation.age = e.target.value }

    return (<div className={props.bodyClass}>
        <SurveyHeader index={props.index} title={t("patient.onboarding.age")} />
        <div className={classes.inputContainer}>
            <Input className={classes.input} value={activationStore.onboardingInformation.age} onChange={handleChange} placeholder="Age" type="number"></Input>
        </div>
    </div>)

});


export default Age;


