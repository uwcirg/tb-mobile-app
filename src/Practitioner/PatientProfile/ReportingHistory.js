import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import CalendarTest from './Calendar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ReportsView from './ReportList';
import Typography from '@material-ui/core/Typography';
import Colors from '../../Basics/Colors';
import Styles from '../../Basics/Styles';
import { useTranslation } from 'react-i18next';
import NotesView from './NotesView';
import Grid from '@material-ui/core/Grid';
import ReportContainer from './ReportContainer';
import NewTableIdea from './NewTableIdea';

const useStyles = makeStyles({
    reportingHistoryContainer: {
        width: "100%",
        "& > h2": {
            textTransform: "uppercase",
            padding: ".5em"
        }
    },
    reportingHistory: {
        width: "100%",
        height: "100%"
    },
    reportsHeader: {
        padding: "1em",
        display: "flex",
        alignItems: "center",
        "& > h2": {
            marginRight: "1em",
            ...Styles.patientPageTitle
        }
    },
    buttonGroup: {
        marginLeft: "auto",
        marginRight: "1em",
        "& > button.selected": {
            color: "white",
            backgroundColor: Colors.textDarkGray
        }
    }

})

const ReportingHistory = observer(() => {
    const [visible, setVisible] = useState('reports');
    const [day, setDay] = useState(new Date())
    const classes = useStyles();
    const { patientProfileStore } = useStores();

    const handleChange = (change) => {
        setDay(change)
    }
    return (
        <div className={classes.reportingHistoryContainer}>
            <ReportingHistoryLabel setVisible={setVisible} visible={visible} />
            <div className={classes.reportingHistory}>
                {visible === "calendar" && <CalendarTest
                    selectedDay={day}
                    handleChange={handleChange}
                    reports={patientProfileStore.selectedPatient.reports}
                    treatmentStart={patientProfileStore.selectedPatient.details.treatmentStart}
                />}
                {visible === "reports" && <NewTableIdea />}
                {visible === "notes" && <NotesView />}

            </div>
        </div>
    )

})

const Labels = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (
        <ReportContainer>
            <Typography variant="body1" color="initial">Date</Typography>
            <Typography className="wide" variant="body1" color="initial">Medication</Typography>
            <Typography className="wide" variant="body1" color="initial">Symptoms</Typography>
            {/* <Typography variant="body1" color="initial">Mood</Typography> */}
            <Typography className="wide" variant="body1" color="initial">Issues</Typography>
            <Typography className="details" variant="body1" color="initial">More</Typography>
        </ReportContainer>
    )
}

const ReportingHistoryLabel = (props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    return (
        <div className={classes.reportsHeader}>
            <Typography variant="h2">{t('coordinator.patientProfile.reportingHistory')}</Typography>
            <ButtonGroup className={classes.buttonGroup} size="small">
                <Button onClick={() => { props.setVisible('reports') }} className={props.visible === 'reports' && "selected"}>{t('coordinator.patientProfile.listReports')}</Button>
                <Button onClick={() => { props.setVisible('calendar') }} className={props.visible === 'calendar' && "selected"}>{t('coordinator.patientProfile.calendarReports')}</Button>
                <Button onClick={() => { props.setVisible('notes') }} className={props.visible === 'notes' && "selected"}>{t('notes')}</Button>
            </ButtonGroup>
        </div>)
}

export default ReportingHistory;