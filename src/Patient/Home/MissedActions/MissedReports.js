import React from 'react';
import NewButton from '../../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'
import useStores from '../../../Basics/UseStores';
import Colors from '../../../Basics/Colors';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import WarningOutlined from '@material-ui/icons/ReportProblemRounded';
import Grow from '@material-ui/core/Collapse';
import { DateTime } from 'luxon';
import MissedReportInfo from '../../Progress/MissedReportCriteria';
import useToggle from '../../../Hooks/useToggle';
import MissedActionCard from './MissedActionCard';
import ButtonLayout from './ButtonLayout';

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
                    return <NewButton key={`back-report-${date}`} onClick={() => { handleReportClick(date) }} icon={<Clipboard />} text={DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)} />
                })}
            </Grow>
        </MissedActionCard>
    )

});

export default MissedReports;