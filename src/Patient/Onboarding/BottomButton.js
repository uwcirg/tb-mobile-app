import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Tabs from './StepList'
import SimpleButton from '../../Basics/SimpleButton';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({
    button: {
        marginTop: "auto",
        padding: "1em 1em 0 0",
        boxSizing: "border-box"
    }
})

const BottomButton = ({disabled, preventDefault, onClick}) => {

    const {patientUIStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const handleClick = () => {
        if(!preventDefault){
            patientUIStore.nextOnboardingStep();
        }
        onClick && onClick();
    }

    return (<SimpleButton className={classes.button} disabled={disabled} onClick={handleClick} alignRight>{t('patient.onboarding.next')}</SimpleButton>)

}

export default BottomButton;