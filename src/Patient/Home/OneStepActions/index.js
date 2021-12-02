import React, { useEffect, useState } from 'react';
import InteractionCard from '../../../Basics/HomePageSection';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import PatientReport from '../../../Basics/PatientReport';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel from '../../../Basics/ExpansionPanel';
import ConfirmationLayout from '../../../Components/Patient/ConfirmationLayout';
import { usePageVisibility } from '../../../Hooks/PageVisibility';
import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import { CheckBox, ThumbUp, Announcement, CameraAlt } from '@material-ui/icons';
import useStyles from './styles';
import ActionButton from '../ActionButton';
import Colors from '../../../Basics/Colors';


const ButtonTestTwo = () => <Grid style={{ width: "unset", padding: "2px .5em" }} alignItems="center" container direction="column">
    <Announcement style={{ padding: 0 }} />
    <Typography style={{ padding: 0 }} variant="body1">No</Typography>
</Grid>


const ButtonTest = () => <Grid style={{ width: "unset", padding: "2px .5em" }} alignItems="center" container direction="column">
    <ThumbUp style={{ padding: 0 }} />
    <Typography style={{ padding: 0 }} variant="body1">Sí</Typography>
</Grid>

const OneStepActions = () => {
    const classes = useStyles();
    return (
        <Grid wrap="nowrap" style={{ padding: ".75em 1em", width: "100%", textAlign: "left", position: "relative" }} alignItems="center" justify="flex-start" container>
            <div style={{ width: "100%" }}>
                <Grid alignItems="center" container wrap="nowrap">
                    <p style={{ fontSize: "1.2em", margin: "0", display: "block", width: "80%" }}>Is everything going okay with your treatment today?</p>
                </Grid>
                <Box height="1em" />
                <Grid direction="column" container className={classes.yesNoButtons}>
                    <ActionButton text="Tomé mis medicamentos y me siento bien" icon={<ButtonTest />} backgroundColor={Colors.calendarGreen} />
                    <Box height=".5em" />
                    <ActionButton text='Reportar algun problema o pedir ayuda' icon={<ButtonTestTwo />} backgroundColor={Colors.highlightYellow} />
                </Grid>
            </div>
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
        <InteractionCard className={classes.card} upperText={<><CheckBox /> Daily Check-In </>}>
            <Box padding="1em">
                <p style={{ fontSize: "1.2em", margin: "0", display: "block", width: "90%" }}>Please complete a test strip to confirm your progress</p>
                <Box height="1em" />
                <ActionButton text="Complete Test Strip and Submit Photo" icon={<CameraAlt />} backgroundColor={Colors.accentBlue} />
            </Box>
            <OneStepActions />
        </InteractionCard>

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