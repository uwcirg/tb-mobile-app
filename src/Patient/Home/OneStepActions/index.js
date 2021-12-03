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
import ActionButton from './ActionButton';
import Colors from '../../../Basics/Colors';
import Fade from '@material-ui/core/Fade';

import PhotoRequestArea from './PhotoRequestArea';


const ButtonTestTwo = () => <Grid style={{ width: "unset", padding: "2px .5em" }} alignItems="center" container direction="column">
    <Announcement style={{ padding: 0 }} />
    <Typography style={{ fontSize: ".8em", padding: 0 }} variant="body1">No</Typography>
</Grid>


const ButtonTest = () => <Grid style={{ width: "unset", padding: "2px .5em" }} alignItems="center" container direction="column">
    <ThumbUp style={{ padding: 0 }} />
    <Typography style={{ fontSize: ".8em", padding: 0 }} variant="body1">Sí</Typography>
</Grid>

const OneStepActions = observer(({ handleComplete }) => {

    const { patientStore, patientUIStore } = useStores();
    const classes = useStyles();

    const handleReportClick = () => {
        patientUIStore.moveToReportFlow();
        patientStore.refreshReportDate();
    }

    return (
        <Grid wrap="nowrap" style={{ width: "100%", textAlign: "left" }} alignItems="center" justify="flex-start" container>
            <div style={{ width: "100%" }}>
                <Grid alignItems="center" container wrap="nowrap">
                    <p style={{ fontSize: "1.2em", margin: "0", display: "block", width: "80%" }}>Is everything going okay with your treatment today?</p>
                </Grid>
                <Box height="1em" />
                <Grid direction="column" container className={classes.yesNoButtons}>
                    <ActionButton onClick={handleComplete} text="Tomé mis medicamentos y me siento bien" icon={<ButtonTest />} backgroundColor={Colors.calendarGreen} />
                    <Box height=".5em" />
                    <ActionButton onClick={handleReportClick} text='Reportar algun problema o pedir ayuda' icon={<ButtonTestTwo />} backgroundColor={Colors.highlightYellow} />
                    <Box height=".5em" />
                </Grid>
            </div>
        </Grid>
    )
})

const ActionBox = observer(() => {
    const { patientStore} = useStores();
    const { t } = useTranslation('translation');

    const [complete, setComplete] = useState(false);
    const isVisible = usePageVisibility();
    const classes = useStyles();

    useEffect(() => {
        if (isVisible) {
            //Ensure that we check if the date has changed
            patientStore.loadDailyReport();
        }

    }, [isVisible])

    return (
        <InteractionCard className={classes.card} upperText={<><CheckBox /> Daily Check-In </>}>
            {patientStore.report.hasSubmittedPhoto ? "Yes" : "No"}
            <Box width="100%" padding="1em" style={{ boxSizing: "border-box" }}>
                {!complete ? <div>
                    {(patientStore.isPhotoDay && !patientStore.reportStore.photoReportComplete) && <PhotoRequestArea />}
                    <OneStepActions handleComplete={() => { setComplete(true) }} />
                    {patientStore.reportStore.photoReportComplete && <p>Your Photo Has Been Submitted</p>}
                </div>
                    :
                    <Fade timeout={2000} in={complete}>
                        <div>
                            <Confirmation />
                        </div>
                    </Fade>}
            </Box>
        </InteractionCard>

    )
});

const Confirmation = () => {
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