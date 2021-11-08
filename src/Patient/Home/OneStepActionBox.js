import React, { useEffect, useState } from 'react';
import NewButton from '../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment';
import Camera from '@material-ui/icons/CameraAlt';
import InteractionCard from '../../Basics/HomePageSection';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Colors from '../../Basics/Colors';
import ActionIcon from '@material-ui/icons/PlaylistAddCheck';
import PatientReport from '../../Basics/PatientReport';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel from '../../Basics/ExpansionPanel';
import PhotoUploading from '../../Basics/Loading/PhotoUploading';
import ConfirmationLayout from '../../Components/Patient/ConfirmationLayout';
import { usePageVisibility } from '../../Hooks/PageVisibility';
import { Button, ButtonBase, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import { ArrowRight, CheckBox, KeyboardArrowRightRounded, ThumbUpRounded } from '@material-ui/icons';
import FlatButton from '../../Components/FlatButton';

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
    },
    loadingMessage: {
        padding: "1em",
        "& div:first-of-type": {
            marginRight: ".5em"
        }
    },
    list: {
        margin: 0,
        padding: "1.1em .5em",
        fontSize: "10px",
        "& li p": {
            lineHeight: "1em"
        }
    },
    action: { width: "90%", backgroundColor: "white", borderRadius: "5px", color: Colors.textDarkGray },
    bottomButton:{
        fontSize: "1em",
        padding: "0"
    },
    card:{
        padding: 0,
        justifyContent: "flex-start"
    }
})

const OneStepActions = () => {
    const classes = useStyles();
    return (<Grid style={{ width: "100%", textAlign: "left", padding: "0 .5em" }} alignItems="center" justify="flex-start" container>
            <div>
                <Typography variant="h1" style={{ fontSize: "1em", fontWeight: "bold" }}>Everything going okay?</Typography>
                <ul className={classes.list} style={{ textAlign: "left" }}>
                    <li><Typography>You took your medication</Typography></li>
                    <li><Typography>Feeling good</Typography></li>
                </ul>
                <FlatButton className={classes.bottomButton}>One tap check-in <KeyboardArrowRightRounded style={{fontSize: "1.5em",padding: 0}} /></FlatButton>
            </div>
            <KeyboardArrowRightRounded style={{ marginLeft: "auto" }} />
        </Grid>)
}

const ActionBox = observer(() => {
    const { patientStore, patientUIStore } = useStores();
    const { t } = useTranslation('translation');
    const [counter, changeCounter] = useState(0);

    const isVisible = usePageVisibility();

    const classes = useStyles();


    useEffect(() => {
        if (isVisible) {
            //Ensure that we check if the date has changed
            patientStore.loadDailyReport();
        }

    }, [isVisible])


    //Once a minute refresh the local report check
    //Prevents a bug where the old state can be shown until the page is refreshed
    useEffect(() => {
        const interval = setInterval(() => {
            changeCounter(prevCounter => prevCounter + 1);
            patientStore.loadDailyReport();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleReportClick = () => {
        patientUIStore.moveToReportFlow();
        patientStore.refreshReportDate();
    }

    const handlePhotoClick = () => {
        if (!patientStore.report.hasSubmitted) {
            patientUIStore.skippedToPhotoFlow = true;
        }
        patientUIStore.openPhotoReport();
    }

    return (
        <InteractionCard className={classes.card} upperText={<><CheckBox /> Daily Check-In </>}>
            <OneStepActions />
        </InteractionCard>

    )
});

//////////////

const Confirmation = (props) => {
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.confirmationSuperContainer}>
            <ConfirmationLayout title={t("patient.home.completed.title")} subtitle={t("patient.home.completed.subtitle")} />
            <ExpansionPanel
                previewClassName={classes.reportPreview}
                preview={t("patient.reportConfirmation.viewOrEdit")}
                icon={<EditIcon style={{ fontSize: "1em" }} />}>
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