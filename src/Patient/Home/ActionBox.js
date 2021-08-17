import React, { useEffect, useState } from 'react';
import NewButton from '../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment';
import Camera from '@material-ui/icons/CameraAlt';
import InteractionCard from '../../Basics/HomePageSection';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import Colors from '../../Basics/Colors';
import ActionIcon from '@material-ui/icons/PlaylistAddCheck';
import PatientReport from '../../Basics/PatientReport';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel from '../../Basics/ExpansionPanel';
import PhotoUploading from '../../Basics/Loading/PhotoUploading';
import { usePageVisibility } from '../../Hooks/PageVisibility';
import ConfirmationLayout from '../../Components/Patient/ConfirmationLayout';

const useStyles = makeStyles({
    check: {
        color: Colors.approvedGreen,
        fontSize: "2.5em",
    },
    bottomButton: {
        margin: "1em",
        "& > svg": {
            fontSize: "1.25em"
        }
    },
    review: {
        padding: ".5em"
    },
    reportPreview: {
        "& > span": {
            margin: "auto"
        }
    }
})

const ActionBox = observer(() => {
    const { patientStore, patientUIStore } = useStores();
    const { t } = useTranslation('translation');
    const [counter, changeCounter] = useState(0);

    const isVisible = usePageVisibility();

    useEffect(() => {
        //if (document.visibilityState === "visible") {
        //Ensure that we check if the date has changed
        patientStore.reportStore.getTodaysReport();

    }, [])


    //Once a minute refresh the local report check
    //Prevents a bug where the old state can be shown until the page is refreshed
    useEffect(() => {
        //patientStore.reportStore.getTodaysReport();
        const interval = setInterval(() => {
            changeCounter(prevCounter => prevCounter + 1);
            patientStore.loadDailyReport();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleReportClick = () => {
        patientUIStore.moveToReportFlow();
    }

    const handlePhotoClick = () => {
        if (!patientStore.report.hasSubmitted) {
            patientUIStore.skippedToPhotoFlow = true;
        }
        patientUIStore.openPhotoReport();
    }

    return (
        <InteractionCard upperText={<><ActionIcon />{t("patient.home.cardTitles.todaysTasks")}</>} id="intro-tasks">
            {counter >= 0 && patientStore.reportStore.allReportComplete ?
                <>
                    <Confirmation onClick={patientUIStore.editReport} />
                </>
                :
                <>
                    <NewButton positive={patientStore.reportStore.baseReportComplete} onClick={handleReportClick} icon={<Clipboard />} text={t("patient.home.todaysActions.logMedication")} />
                    {patientStore.isPhotoDay && <NewButton positive={patientStore.reportStore.photoReportComplete} onClick={handlePhotoClick} icon={<Camera />} text={t("patient.home.todaysActions.uploadPhoto")} />}
                </>
            }
            {patientStore.photoIsUploading && <PhotoUploading />}
        </InteractionCard>)
});

const Confirmation = (props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.confirmationSuperContainer}>
            <ConfirmationLayout title={t("patient.home.completed.title")} subtitle={t("patient.home.completed.subtitle")} />
            <ExpansionPanel
                previewClassName={classes.reportPreview}
                preview={t("patient.reportConfirmation.viewOrEdit")}
                icon={<EditIcon style={{ fontSize: "1em" }} />}
            >
                <Review />
            </ExpansionPanel>
        </div>
    )
}

const Review = observer(() => {

    const { patientStore } = useStores();

    return (
        <PatientReport
            medicationNotTakenReason={patientStore.report.whyMedicationNotTaken}
            medicationWasTaken={patientStore.report.tookMedication}
            timeTaken={patientStore.report.timeTaken}
            selectedSymptoms={patientStore.report.selectedSymptoms}
            photoString={patientStore.report.photoString}
            isPhotoDay={patientStore.isPhotoDay}
            feelingWell={patientStore.report.doingOkay}
        />
    )
})

export default ActionBox;