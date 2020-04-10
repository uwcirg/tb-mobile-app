import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import PopUp from '../Navigation/PopUp';
import NewButton from '../../Basics/NewButton'
import Camera from '@material-ui/icons/CameraAlt';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles/'
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DoctorIcon } from '../../Basics/Icons/doctor.svg';

const SymptomWarning = observer(() => {

    const { patientStore } = useStores();
    const classes = useStyles(); 
    const {t, i18n} = useTranslation('translation');
    
    const handleClick = () => {
        patientStore.toggleSymptomWarningVisibility();
    }

    const handleExit = () => {
        patientStore.toggleSymptomWarningVisibility();
    }

    return (
        <PopUp handleClickAway={handleExit}>
            <DoctorIcon />
            <h1 className={classes.title}>
                {t("patient.report.symptoms.warning.title")} {" "}
                </h1>
            <p classes={classes.subtitle}>{t("patient.report.symptoms.warning.subtitle")}</p>
            <NewButton onClick={handleClick} className={classes.customButton} text={t("patient.report.symptoms.warning.button")} />
            <Button className={classes.basicButton} onClick={handleExit}>{t("patient.report.symptoms.warning.moreInformation")}</Button>
        </PopUp>
    )
});

const useStyles = makeStyles({
    basicButton: {
        textTransform: "capitalize",
        color: Colors.buttonBlue
    },
    title:{
        margin: "1em 0 0 0",
        fontSize: "120%"
    },
    subtitle: {
        fontSize: "100%"
    },
    customButton: {
        width: "50%",
        textAlign: "center",
        "& > span":{
            width: "100%"
        },
        "& > svg": {
            display: "none"
        }
    }
})


export default SymptomWarning;