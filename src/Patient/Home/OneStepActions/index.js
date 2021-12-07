import React, { useEffect, useState } from 'react';
import InteractionCard from '../../../Basics/HomePageSection';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel from '../../../Basics/ExpansionPanel';
import ConfirmationLayout from '../../../Components/Patient/ConfirmationLayout';
import { usePageVisibility } from '../../../Hooks/PageVisibility';
import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import { CheckBox, ThumbUp, Announcement } from '@material-ui/icons';
import useStyles from './styles';
import ActionButton from './ActionButton';
import Colors from '../../../Basics/Colors';
import Fade from '@material-ui/core/Fade';

import PhotoRequestArea from './PhotoRequestArea';
import PartialConfirmation from './PartialConfirmation';
import Review from './ReviewSubmission';

const ButtonLabel = ({ text, icon }) => {
    const classes = useStyles();
    return <Grid className={classes.buttonLabel} alignItems="center" container direction="column">
        {icon}
        <Typography style={{ fontSize: ".8em", padding: 0 }} variant="body1">{text}</Typography>
    </Grid>
}

const OneStepActions = observer(() => {

    const { patientStore, patientUIStore } = useStores();
    const classes = useStyles();

    const handleReportClick = () => {
        patientUIStore.moveToReportFlow();
        patientStore.refreshReportDate();
    }

    const { t } = useTranslation('translation');

    return (
        <Box style={{ width: "100%" }}>
            {patientStore.reportStore.baseReportComplete ? <PartialConfirmation /> :
                <>
                    <Grid alignItems="center" container wrap="nowrap">
                        <Typography variant="body1" className={classes.sectionHeader}>{t('patient.oneStepReporting.supportTitle')}</Typography>
                    </Grid>
                    <Box height="1em" />
                    <Grid direction="column" container className={classes.yesNoButtons}>
                        <ActionButton onClick={patientStore.reportStore.oneStepReport}
                            text={t('patient.oneStepReporting.goodOption')}
                            icon={<ButtonLabel icon={<ThumbUp />} text={t('commonWords.yes')} />} backgroundColor={Colors.calendarGreen} />
                        <Box height=".5em" />
                        <ActionButton onClick={handleReportClick} 
                        text={t('patient.oneStepReporting.helpOption')} 
                        icon={<ButtonLabel icon={<Announcement />} text={t('commonWords.no')} />}
                        backgroundColor={Colors.highlightYellow} 
                        />
                        <Box height=".5em" />
                    </Grid>
                </>}
        </Box>
    )
})

const ActionBox = observer(() => {
    const { patientStore } = useStores();
    const { t } = useTranslation('translation');

    const isVisible = usePageVisibility();
    const classes = useStyles();

    useEffect(() => {
        if (isVisible) {
            patientStore.loadDailyReport(); //Ensure that we check if the date has changed
        }

    }, [isVisible])

    return (
        <InteractionCard className={classes.card} upperText={<><CheckBox />{t('patient.home.cardTitles.todaysTasks')}</>}>
            <Box width="100%" padding="1em" style={{ boxSizing: "border-box" }}>
                {!patientStore.reportStore.allReportComplete ? <div>
                    {(patientStore.isPhotoDay && !patientStore.reportStore.photoReportComplete) && <PhotoRequestArea />}
                    <OneStepActions />
                    {patientStore.reportStore.photoReportComplete && <PartialConfirmation isPhoto />}
                </div>
                    :
                    <Fade timeout={2000} in={patientStore.reportStore.allReportComplete} >
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

export default ActionBox;