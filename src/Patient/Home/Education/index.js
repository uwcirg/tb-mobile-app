import PopUp from '../../Navigation/PopUp'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../../Basics/Styles';
import { observer } from 'mobx-react';
import useStores from '../../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import { usePageVisibility } from '../../../Hooks/PageVisibility'
import TestStripUpdate from './TestStripUpdateMay'
import ChatReminder from './ChatReminder';
import DefaultLayout from './DefaultMessage'

const useStyles = makeStyles({
    container: {
        width: "80%",
        minHeight: "80vh",
        ...Styles.flexColumn

    }
})

const EducationalMessage = observer((props) => {

    const { t } = useTranslation('translation');

    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    const { educationStore: education } = patientStore;

    const isVisible = usePageVisibility();

    //Check for service worker update when page goes from invisible to visible.
    //this helps us detect when the application is launched from installed
    useEffect(() => {
        if (document.visibilityState === "visible") {
            education.setExited(false)

            //Ensure that we check if the date has changed
            education.checkForChanges();
        }
    }, [isVisible])

    const handleClose = (isExit) => {
        education.setExited(true);
        if (isExit) {
            education.markEducationAsRead();
        }
    }

    const visible = education.hasDayPassedSinceLastUpdateRead && education.message && !education.exited && !patientUIStore.onWalkthrough;

    return (
        <>
            {visible ?
                <PopUp className={classes.container} handleClickAway={handleClose}>
                    <ComponentToDisplay treatmentDay={education.dayShown} />
                </PopUp> : ""}
        </>)

})

const ComponentToDisplay = ({treatmentDay}) => {

    switch (treatmentDay) {
        case "0": return <TestStripUpdate />
        case "5": return <ChatReminder />
        default: return <DefaultLayout />
    }
}

export default EducationalMessage;