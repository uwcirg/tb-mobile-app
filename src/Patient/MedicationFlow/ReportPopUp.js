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

const useStyles = makeStyles({
    basicButton: {
        textTransform: "capitalize",
        color: Colors.buttonBlue
    },
    title:{
        margin: 0,
    }
})

const ReportPopUp = observer(() => {

    const { patientStore } = useStores();
    const classes = useStyles(); 
    const {t, i18n} = useTranslation('translation');
    
    const handleClick = () => {
        patientStore.uiState.onPhotoFlow = true;
    }

    const handleExit = () => {
        patientStore.uiState.onTreatmentFlow = false;
    }

    return (
        <PopUp handleClickAway={handleExit}>
            <img src="/img/list.svg" />
            <h1 className={classes.title}>
                {t("reportConfirmation.goodJob")} {" "}
                {patientStore.givenName}!
                </h1>
            <p>{t("reportConfirmation.photoNeeded")}</p>
            <NewButton onClick={handleClick} icon={<Camera />} text={t("home.actions.uploadPhoto")} />
            <Button className={classes.basicButton} onClick={handleExit}>{t("reportConfirmation.doLater")}</Button>
        </PopUp>
    )
});


export default ReportPopUp;