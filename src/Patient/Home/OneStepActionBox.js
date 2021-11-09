import React, { useEffect, useState } from 'react';
import NewButton from '../../Basics/NewButton';
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
import { ArrowRight, CheckBox, KeyboardArrowRightRounded, List, ThumbUpRounded } from '@material-ui/icons';
import FlatButton from '../../Components/FlatButton';
import DailyReportPhoto from '../../Basics/Icons/daily-checkin.png'
import Clipboard from '@material-ui/icons/Assignment';


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
        padding: "1em 1.5em",
        paddingRight: "0",
        "& li p": {
            lineHeight: "1em",
            fontSize: "14px"
        }
    },
    action: { width: "90%", backgroundColor: "white", borderRadius: "5px", color: Colors.textDarkGray },
    bottomButton: {
        fontSize: "1em",
        padding: "0"
    },
    card: {
        padding: 0,
        justifyContent: "flex-start"
    },
    allGood: {
        width: "unset",
        fontSize: "1em",
        padding: ".5em",
        margin: 0,
        marginRight: 0,
        "& > span": {
        },
    },
    issueButton: {
        flex: "1 1 0",
        color: Colors.textDarkGray,
        border: `1px solid ${Colors.textDarkGray}`,
        "&:nth-of-type(odd)": {
            marginRight: ".5em"
        }
    }
})

const OneStepActions = () => {
    const classes = useStyles();
    return (
        <Grid wrap="nowrap" style={{ padding: ".75em 1em", width: "100%", textAlign: "left", position: "relative" }} alignItems="center" justify="flex-start" container>
            <div style={{ width: "100%" }}>
                <Typography variant="h1">Everything going well?</Typography>
                <ul className={classes.list} style={{ textAlign: "left" }}>
                    <li><Typography>You took your medication</Typography></li>
                    <li><Typography>Feeling well</Typography></li>
                    <li><Typography>No side effects</Typography></li>
                </ul>
                <NewButton className={classes.allGood} text="Reportar Todo Bien" icon={<Clipboard />} />
            </div>
            <img style={{ height: "150px", position: "absolute", right: ".5em" }} src={DailyReportPhoto} />
        </Grid>
    )
}

const IssueButton = () => {
    const classes = useStyles();

    return (
        <div style={{padding: ".5em 1em"}}>
            <Grid justify="center" container>
                <NewButton className={`${classes.allGood} ${classes.issueButton}`} text="Meds" icon={<Clipboard />} />
                <NewButton className={`${classes.allGood} ${classes.issueButton}`} text="Side Effects" icon={<Clipboard />} />
            </Grid>
            <Grid style={{paddingTop: ".5em" }} justify="center" container>
                <NewButton className={`${classes.allGood} ${classes.issueButton}`} text="Meds" icon={<Clipboard />} />
                <NewButton className={`${classes.allGood} ${classes.issueButton}`} text="Side Effects" icon={<Clipboard />} />
            </Grid>
        </div>
    )
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
        <>
            <InteractionCard className={classes.card} upperText={<><CheckBox /> Daily Check-In </>}>
                <OneStepActions />
                <Typography variant="body1">Record issues or Request Help</Typography>
                <IssueButton />
            </InteractionCard>
        </>

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