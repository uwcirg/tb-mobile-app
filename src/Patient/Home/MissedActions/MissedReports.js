import React, { useEffect, useState } from 'react';
import NewButton from '../../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'
import useStores from '../../../Basics/UseStores';
import Colors from '../../../Basics/Colors';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Box, makeStyles, Typography } from '@material-ui/core';
import WarningOutlined from '@material-ui/icons/ReportProblemRounded';
import Grow from '@material-ui/core/Collapse';
import { DateTime } from 'luxon';
import MissedReportInfo from '../../Progress/MissedReportCriteria';
import MissedActionCard from './MissedActionCard';
import useToggle from '../../../Hooks/useToggle';
import ButtonLayout from './ButtonLayout';
import Grid from '@material-ui/core/Grid';
import { CheckBox, ThumbUp, Announcement } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    grow: {
        width: "100%",
        "& > div > div > button": {
            margin: ".5em auto"
        }
    },
    criteria: {
        padding: "1em",
        boxSizing: "border-box",
        "& > button": {
            width: "100%"
        }
    },
    oneStep: {
        width: "100%",
        padding: ".5em 1em"
    }
})

const MissedReports = observer(() => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { patientStore } = useStores();
    const [showDetails, toggleShowDetails] = useToggle();

    return (
        <MissedActionCard id="intro-missed">
            <ButtonLayout
                text={`${patientStore.missingReports.length} ${t('patient.home.missedDays.missing', { count: patientStore.missingReports.length })}`}
                icon={<WarningOutlined />}
                color={Colors.warningRed}
                isDropdownOpen={showDetails}
                onClick={toggleShowDetails}
            />
            <Grow in={showDetails} className={classes.grow}>
                <MissedReportInfo className={classes.criteria} hideReport />
                {patientStore.missingReports.map(date => {
                    return <OneStepBackReport date={date} />
                    // return <NewButton key={`back-report-${date}`} onClick={() => { handleReportClick(date) }} icon={<Clipboard />} text={DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)} />
                })}
            </Grow>
        </MissedActionCard>
    )

});

const OneStepBackReport = observer(({ date }) => {

    const classes = useStyles();
    const { patientStore, patientUIStore } = useStores();
    const { t } = useTranslation('translation');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);


    useEffect(() => {
        let timeout;
        if (displaySuccess) {
            timeout = setTimeout(() => {
                setSuccess(true);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [displaySuccess]);

    const handleOneStep = async () => {
        setLoading(true);
        let response = await patientStore.submitOneStepBackReport(date);
        setLoading(false);
        if (!response.error) {
            setDisplaySuccess(true);
        }
    }

    const handleIssue = () => {
        patientStore.uiState.selectedCalendarDate = date;
        patientStore.startHistoricalReport(date);
        patientUIStore.startHistoricalReport();
    }

    return (
        <Grow timeout={1500} in={!success}>
            <Grid alignItems="center" className={classes.oneStep} container>
                <Typography>{displaySuccess ? t('commonWords.successMessage') : DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}</Typography>
                <Box flexGrow="1" />
                {(!loading && !displaySuccess) ? <>
                    <IconButton onClick={handleOneStep}>
                        <ThumbUp />
                    </IconButton>
                    <IconButton onClick={handleIssue}>
                        <Announcement />
                    </IconButton>
                </> : <>
                    {!displaySuccess && <CircularProgress variant="indeterminate" />}
                </>}
            </Grid>
        </Grow>
    )
});

export default MissedReports;