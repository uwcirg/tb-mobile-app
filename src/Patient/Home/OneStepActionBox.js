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
import { Box, Button, ButtonBase, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import { ArrowRight, CheckBox, KeyboardArrowRightRounded, List, ThumbDown, ThumbUp, ThumbUpRounded } from '@material-ui/icons';
import FlatButton from '../../Components/FlatButton';
import DailyReportPhoto from '../../Basics/Icons/daily-checkin.png'
import AssessmentIcon from '@material-ui/icons/Assessment';



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
        padding: "0 1.5em",
        paddingRight: "0",
        "& li p": {
            lineHeight: "1.1em",
            fontSize: "1em"
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
        width: "100%",
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
    },
    yesNoButtons: {

        "& button": {
            border: "none",
            "& p:first-of-type, & svg:first-of-type": {
                fontWeight: "bold",
                padding: ".25em .5em",
                margin: "0"
            },
            "& span": {
                margin: "0 .5em"
            }
        },

        "& button:first-of-type": {
            backgroundColor: Colors.green,
            color: "white"
        },
        "& button:nth-of-type(2)": {
            backgroundColor: Colors.buttonBlue,
            color: "white"
        },

    }
})

const OneStepActions = () => {
    const classes = useStyles();
    return (
        <Grid wrap="nowrap" style={{ padding: ".75em 1em", width: "100%", textAlign: "left", position: "relative" }} alignItems="center" justify="flex-start" container>
            <div style={{ width: "100%" }}>
                <Typography variant="h1">How is everything going today?</Typography>
                <Typography variant="body1" style={{lineHeight: "1em", margin: "1em 0"}}>
                    Please let us know if you <strong>missed a dose</strong>, are experiencing <strong>side effects</strong>, or need any <strong>support</strong>.
                </Typography>
                <Box height=".5em" />
                <Grid direction="column" container className={classes.yesNoButtons}>
                    <NewButton className={classes.allGood} text="Todo Bien" icon={<ThumbUp />} />
                    <Box height=".5em" />
                    <NewButton className={classes.allGood} text='Report Issues & Get Support' icon={<AssessmentIcon />} />
                </Grid>
            </div>
        </Grid>
    )
}

const WhenToReport = () => {
    return (
        <Grid container wrap="nowrap" style={{ paddingBottom: ".5em" }}>
            <div>
                <p style={{ margin: 0 }}>Please let us know if:</p>
                <ul className={classes.list}>
                    <li><Typography>Missed a dose</Typography></li>
                    <li><Typography>Have any side effects</Typography></li>
                    <li><Typography>Have questions or need assitance</Typography></li>
                </ul>
            </div>
            {/* <img style={{ width: "50px", objectFit: "contain", marginLeft: "auto", padding: "0 .5em" }} src={DailyReportPhoto} /> */}
        </Grid>
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
            </InteractionCard>
        </>

    )
});

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