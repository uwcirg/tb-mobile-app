import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    button: {
        alignSelf: "flex-end",
        marginTop: "auto",
        padding: ".5em .75em .5em .75em",
        boxSizing: "border-box",
        backgroundColor: Colors.buttonBlue,
        color: "white",
        fontSize: "1em",
        textTransform: "capitalize",
        "&:focus, &:hover": {
            background: Colors.buttonBlue
        },
        "&:disabled":{
            backgroundColor: Colors.gray
        }
    },

})

const BottomButton = ({ disabled, preventDefault, onClick }) => {

    const { patientUIStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const handleClick = () => {
        if (!preventDefault) {
            patientUIStore.nextOnboardingStep();
        }
        onClick && onClick();
    }

    return (<Button className={classes.button} disabled={disabled} onClick={handleClick} alignRight>{t('patient.onboarding.next')}</Button>)

}

export default BottomButton;