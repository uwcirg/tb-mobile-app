import React, { useEffect, useState } from 'react';
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
import { ThumbUp, Announcement, CheckCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
    grow: {
        width: "100%",
        "& > div > div > button": {
            margin: ".5em auto"
        }
    },
    criteria: {
        padding: "1em 0",
        boxSizing: "border-box",
        "& > button": {
            width: "100%"
        }
    },
    oneStep: {
        width: "100%",
        padding: ".5em 0",
        "&:last-of-type": {
            borderBottom: `solid 1px ${Colors.lightgray}`
        }
    },
    reportOption: {
        color: "black",
        borderRadius: "5px",
        backgroundColor: props => props.yes ? Colors.calendarGreen : Colors.highlightYellow
    },
    header: {
        borderBottom: `1px solid ${Colors.lightgray}`
    },
    content: {
        padding: "0 1em"
    },
    label: {
        width: "50px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        textTransform: "capitalize",
        "& > p": { fontSize: ".75em", textAlign: "center", lineHeight: "1em" }
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
                <div className={classes.content}>
                    <Grid alignItems="center" className={`${classes.oneStep} ${classes.header}`} container>
                        <Typography>{t('coordinator.patientProfile.date')}</Typography>
                        <Box flexGrow="1" />
                        <div className={classes.label}>
                            <Typography>{t('patient.report.allGood')}</Typography>
                        </div>
                        <Box width=".5em" />
                        <div className={classes.label}>
                            <Typography >{t('patient.report.trackIssues')}</Typography>
                        </div>
                    </Grid>
                    {patientStore.missingReports.map((date, index) => {
                        return <OneStepBackReport key={`back-report-${date}`} date={date} />
                    })}
                    <MissedReportInfo className={classes.criteria} hideReport />
                </div>
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
            setTimeout(() => {
                patientStore.updateReports(response);
            }, 3000)
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
                {displaySuccess ? <SuccessMessage /> : <Typography>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}</Typography>}
                <Box flexGrow="1" />
                {(!loading && !displaySuccess) ? <>
                    <OptionButton yes onClick={handleOneStep}>
                        <ThumbUp />
                    </OptionButton>
                    <Box width=".5em" />
                    <OptionButton onClick={handleIssue}>
                        <Announcement />
                    </OptionButton>
                </> : <>
                    {!displaySuccess && <CircularProgress variant="indeterminate" />}
                </>}
            </Grid>
        </Grow>
    )
});

const SuccessMessage = () => {
    const { t } = useTranslation('translation');
    return (<Grid container alignItems="center" ><CheckCircle style={{ color: Colors.green }} />
        <Box width=".5em" />
        <Typography variant="body1">{t('commonWords.successMessage')}</Typography>
    </Grid>)
}

const OptionButton = (props) => {
    const classes = useStyles({ yes: props.yes })
    let newProps = { ...props }
    delete newProps.yes
    return <IconButton {...newProps} className={classes.reportOption} />
}

export default MissedReports;