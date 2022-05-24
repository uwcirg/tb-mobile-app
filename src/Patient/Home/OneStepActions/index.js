import React, { useEffect, useState } from 'react';
import InteractionCard from '../../../Basics/HomePageSection';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';

import { usePageVisibility } from '../../../Hooks/PageVisibility';

import { Grid, Box, CircularProgress, Typography, Fade, ButtonBase } from '@material-ui/core';
import { CheckBox, ThumbUp, Announcement, Edit } from '@material-ui/icons';

import useStyles from './styles';
import ActionButton from './ActionButton';
import Colors from '../../../Basics/Colors';

import PhotoRequestArea from './PhotoRequestArea';
import PartialConfirmation from './PartialConfirmation';
import Confirmation from './Confirmation';

const ButtonLabel = ({ text, icon }) => {
    const classes = useStyles();
    return <Grid className={classes.buttonLabel} alignItems="center" container direction="column">

        <Typography style={{ fontSize: ".8em", padding: 0, fontSize: "12px" }} variant="body1">{text}</Typography>
    </Grid>
}

const CustomButton = ({ icon, text, onClick, primaryColor, bgColor }) => {
    return (
        <ButtonBase onClick={onClick} style={{ border: `1px solid ${primaryColor}`, flex: "1 1 0", borderRadius: "5px", padding: "8px", backgroundColor: bgColor }}>
            <Grid container alignItems='center' direction="column">
                {React.cloneElement(icon, { style: { fontSize: "3rem", color: primaryColor } })}
                <Box height='8px' />
                <Typography style={{ lineHeight: "1.1rem" }}>{text}</Typography>
            </Grid>
        </ButtonBase>
    )
}

const OneStepActions = observer(({ setCompletedNow }) => {

    const { patientStore, patientUIStore } = useStores();
    const classes = useStyles();

    const handleReportClick = () => {
        patientUIStore.moveToReportFlow();
        patientStore.refreshReportDate();
    }

    const handleOneStepClick = () => {
        setCompletedNow(true);
        patientStore.submitOneStepReport();
    }

    const { t } = useTranslation('translation');

    const ButtonContent = <>
        <Grid alignItems="center" container wrap="nowrap">
            <Typography variant="body1" className={classes.sectionHeader}>
                {t('patient.oneStepReporting.supportTitle')}
                </Typography>
        </Grid>
        <Box height="1em" />
        <Grid wrap="nowrap" container className={classes.yesNoButtons}>
            <CustomButton primaryColor={"#388E3C"} bgColor={"#E8F5E9"} icon={<ThumbUp />} text={t('patient.oneStepReporting.goodOption')} onClick={handleOneStepClick} />
            <Box width="8px" />
            <CustomButton bgColor={"#FFFDE7"} primaryColor={"#FBC02D"} icon={<Announcement />} text={t('patient.oneStepReporting.helpOption')} onClick={handleReportClick} />
        </Grid>
    </>

    return (
        <Box style={{ width: "100%" }}>
            {patientStore.reportStore.baseReportComplete ? <PartialConfirmation /> :
                <>
                    {patientStore.oneStepStatus.loading ? <Grid container justify="center" alignItems="center" style={{ width: "100%", height: "200px" }}><CircularProgress variant="indeterminate" /> </Grid> : ButtonContent}
                </>}
        </Box>
    )
})

const ActionBox = observer(() => {
    const { patientStore } = useStores();
    const { t } = useTranslation('translation');

    const [completedNow, setCompletedNow] = useState(false);
    const [counter, changeCounter] = useState(0);

    const isVisible = usePageVisibility();
    const classes = useStyles();

    useEffect(() => {
        const interval = setInterval(() => {
            changeCounter(prevCounter => prevCounter + 1);
            patientStore.loadDailyReport();
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isVisible) {
            patientStore.loadDailyReport(); //Ensure that we check if the date has changed
        }
    }, [isVisible])

    return (
        <InteractionCard id="intro-tasks" className={classes.card} upperText={<><CheckBox />{t('patient.home.cardTitles.todaysTasks')}</>}>
            <Box width="100%" padding="1em" style={{ boxSizing: "border-box" }}>
                {(counter >= 0 && !patientStore.reportStore.allReportComplete) ? <div>
                    {/* {(patientStore.isPhotoDay && !patientStore.reportStore.photoReportComplete) && <PhotoRequestArea />} */}
                    <OneStepActions setCompletedNow={setCompletedNow} />
                    {/* {patientStore.reportStore.photoReportComplete && <PartialConfirmation isPhoto />} */}
                </div>
                    :
                    <>
                        {completedNow ?
                            <Fade timeout={2000} in={patientStore.oneStepStatus.loadingComplete} >
                                <div>
                                    <Confirmation />
                                </div>
                            </Fade> :
                            <div>
                                <Confirmation />
                            </div>
                        }
                    </>
                }
            </Box>
        </InteractionCard>
    )
});


export default ActionBox