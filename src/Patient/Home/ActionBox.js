import React, { useEffect, useState } from 'react'
import NewButton from '../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'
import Camera from '@material-ui/icons/CameraAlt';
import InteractionCard from '../../Basics/InteractionCard';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import Styles from '../../Basics/Styles';
import { ReactComponent as DoctorIcon } from '../../Basics/Icons/doctor.svg';
import CheckIcon from '@material-ui/icons/Check';
import Colors from '../../Basics/Colors';
import ActionIcon from '@material-ui/icons/PlaylistAddCheck';
import PatientReport from '../../Basics/PatientReport';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel from '../../Basics/ExpansionPanel';

const useStyles = makeStyles({
    confirmation: {
        ...Styles.flexRow,
        marginBottom: "1em",
        alignItems: "flex-end",
    },
    confirmationText: {
        ...Styles.flexColumn,
        paddingLeft: "1em",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "50%",
        height: "100%",
        textAlign: "left",
    },
    check: {
        color: Colors.approvedGreen,
        fontSize: "2.5em",
    },
    confirmationHeader: {
        ...Styles.flexRow,
        fontSize: "1.25em",
        margin: 0,
        "& > svg": {
            color: Colors.approvedGreen,
            marginLeft: ".5em"
        }
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


    //Once a minute refresh the local report check
    //Prevents a bug where the old state can be shown until the page is refreshed
    useEffect(() => {
        patientStore.reportStore.getTodaysReport();
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
            {/* patientStore.requiresSubmission && <ClickableText onClick={patientUIStore.skipToReportConfirmation} className={classes.bottomButton} text={t("patient.home.confirmAndSubmit")} /> */}
        </InteractionCard>)
});

const Confirmation = (props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const [showReport, setShowReport] = useState(false);

    return (
        <div className={classes.confirmationSuperContainer}>
            <div className={classes.confirmation}>
                <DoctorIcon />
                <div className={classes.confirmationText}>
                    <div className={classes.confirmationHeader}>{t("patient.home.completed.title")}<CheckIcon /></div>
                    <p>{t("patient.home.completed.subtitle")}</p>
                </div>
            </div>
            <ExpansionPanel
                previewClassName={classes.reportPreview}
                preview={t("View / Edit Treatment Log")}
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