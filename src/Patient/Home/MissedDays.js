import React, { useState } from 'react';
import NewButton from '../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'
import HomePageCard from '../../Components/Patient/HomePageCard';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import Colors from '../../Basics/Colors';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import WarningOutlined from '@material-ui/icons/ReportProblemOutlined';
import Down from '@material-ui/icons/KeyboardArrowDown';
import Up from '@material-ui/icons/KeyboardArrowUp';
import Grow from '@material-ui/core/Collapse';
import { DateTime } from 'luxon';
import MissedReportInfo from '../Progress/MissedReportCriteria';
import EditIcon from '@material-ui/icons/Edit';
import HomePageSectionContainer from '../../Components/Patient/HomePageSectionContainer';

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
    },
    contactTracing: {
        "& > button": {
            textTransform: "capitalize"
        }
    }
})

const ActionBox = observer(() => {
    const classes = useStyles();
    const { patientStore, patientUIStore, uiStore } = useStores();
    const { t } = useTranslation('translation');
    const [show, setShow] = useState(false)

    const handleReportClick = (date) => {
        patientStore.uiState.selectedCalendarDate = date;
        patientUIStore.startHistoricalReport();
    }

    const toggleShow = () => {
        setShow(!show);
    }

    const shouldShowMissedReports = !uiStore.offline && patientStore.missingReports.length > 0;

    return (
        <HomePageSectionContainer upperText={<><WarningIcon />{t('patient.home.cardTitles.actionNeeded')}</>}>
            {shouldShowMissedReports && <HomePageCard className={classes.override} id="intro-missed">
                <div className={classes.warning}><WarningOutlined /><span> {patientStore.missingReports.length} {t('patient.home.missedDays.missing', { count: patientStore.missingReports.length })}</span><IconButton onClick={toggleShow}> {show ? <Up /> : <Down />}</IconButton></div>
                {uiStore.locale && ""}
                <Grow in={show} className={classes.grow}>
                    <MissedReportInfo className={classes.criteria} hideReport />
                    {patientStore.missingReports.map(date => {
                        return <NewButton key={`back-report-${date}`} onClick={() => { handleReportClick(date) }} icon={<Clipboard />} text={DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)} />
                    })}
                </Grow>
            </HomePageCard>}

            <HomePageCard className={classes.contactTracing} upperText="">
                <NewButton onClick={()=>{uiStore.push('/contactTracing')}} icon={<EditIcon />} text={t('updatedContactTracing.button')} />
            </HomePageCard>
        </HomePageSectionContainer>)
});

export default ActionBox;