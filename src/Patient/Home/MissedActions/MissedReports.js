import React, { useState } from 'react';
import NewButton from '../../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'
import HomePageCard from '../../../Components/Patient/HomePageCard';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import Colors from '../../../Basics/Colors';
import IconButton from '@material-ui/core/IconButton';
import WarningOutlined from '@material-ui/icons/ReportProblemOutlined';
import Down from '@material-ui/icons/KeyboardArrowDown';
import Up from '@material-ui/icons/KeyboardArrowUp';
import Grow from '@material-ui/core/Collapse';
import { DateTime } from 'luxon';
import MissedReportInfo from '../../Progress/MissedReportCriteria';
import useToggle from '../../../Hooks/useToggle';

const useStyles = makeStyles({
    warning: {
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingLeft: "1em",
        width: "90%",
        "& > span": {
            margin: "0 auto 0 .5em"
        },
        "& > svg": {
            color: Colors.red,
        }
    },
    grow: {
        width: "100%",
        "& > div > div > button": {
            margin: ".5em auto"
        }
    },
    override: {
        padding: "5px"
    },
    criteria: {
        padding: "1em",
        boxSizing: "border-box",
        "& > button": {
            width: "100%"
        }
    }
})

const MissedReports = observer(() => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { patientStore, patientUIStore } = useStores();
    const [showDetails, toggleShowDetails] = useToggle();

    const handleReportClick = (date) => {
        patientStore.uiState.selectedCalendarDate = date;
        patientUIStore.startHistoricalReport();
    }

    return (
        <HomePageCard className={classes.override} id="intro-missed">
            <div className={classes.warning}>
                <WarningOutlined />
                <span> {patientStore.missingReports.length} {t('patient.home.missedDays.missing', { count: patientStore.missingReports.length })}</span>
                <IconButton onClick={toggleShowDetails}> {showDetails ? <Up /> : <Down />}</IconButton>
            </div>
            {/* {uiStore.locale && ""} */}
            <Grow in={showDetails} className={classes.grow}>
                <MissedReportInfo className={classes.criteria} hideReport />
                {patientStore.missingReports.map(date => {
                    return <NewButton key={`back-report-${date}`} onClick={() => { handleReportClick(date) }} icon={<Clipboard />} text={DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)} />
                })}
            </Grow>
        </HomePageCard>
    )

});

export default MissedReports;