import React, { useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import BasicSidebar from '../Shared/BasicSidebar'
import Styles from '../../Basics/Styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import TimeIcon from '@material-ui/icons/AccessTime';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import Colors from '../../Basics/Colors';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        margin: "auto",
        marginTop: "2em",
        height: 13,
        borderRadius: 9,
    },
    colorPrimary: {
        backgroundColor: Colors.lightgray,
    },
    bar: {
        borderRadius: 9,
        backgroundColor: Colors.accentBlue
    },
}))(LinearProgress);

const useStyles = makeStyles({

    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1em",
        boxSizing: 'border-box'
    },
    patientListContainer: {
        marginTop: "auto",
        marginBottom: ".5em"

    },
    patientList: {
        height: "400px",
        overflow: "scroll"
    },
    patientCard: {
        display: "flex",
        alignItems: "center",
        padding: ".25em",
        borderRadius: "4px",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        marginTop: ".5em",
        "& > p": {
            fontSize: ".875em",
            marginLeft: "1em",
            textAlign: "center"
        },
        "&  > *": {
            flexBasis: "20%"
        },
        "& > p:first-child": {
            flexBasis: "25%",
            textAlign: "left"
        }
    },
    notSubmitted: {
        display: "flex",
        alignItems: "center",
        flexGrow: "1",
        "& >  p": {
            marginLeft: "1em",
            fontSize: ".875em"
        }
    },
    labels:{
        borderRadius: "0",
        backgroundColor: "none",
        "& > p": {
            textAlign: "left"
        }
    },
    header:{
        fontWeight: "bold",
        fontSize: "1.5em"
    },
    taskStatus:{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        marginTop: ".5em",
        "& > div":{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            "& > span":{
                color: Colors.accentBlue,
                fontSize: "1.8em",
                alignSelf: "center"
            },
            "& > span.unfinished":{
                color: Colors.textGray,
            },
            "& > p":{
                fontSize: ".875em",
                margin: 0
            }
        }
    },
    progress:{
        ...Styles.profileCard,
        padding: "1em",
        marginTop: "1em"
    }
})

const PatientList = observer(() => {

    const classes = useStyles();
    const { practitionerStore,practitionerUIStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    useEffect(() => {
        practitionerStore.getCompletedResolutionsSummary();
    },[])

    const patientList  = practitionerStore.patientList.sort( each => {
        if(each.reportingStatus.today.reported) return -1
        return 1
    })

    return (<div className={classes.patientListContainer}>
        <Typography className={classes.header} variant="h2">{t('coordinator.titles.reportingStatus')}</Typography>
        <div className={`${classes.patientCard} ${classes.labels}`}>
            <p className={classes.names}>Name</p>
            <p>Medicine Taken</p>
            <p>Photo Submitted</p>
            <p>Symptoms Reported</p>
        </div>
        <div className={classes.patientList}>
            {practitionerStore.patientList && practitionerStore.patientList.map(patient => {
                return (
                    <div key={patient.id} className={classes.patientCard} onClick={() => {practitionerUIStore.goToPatient(patient.id)}}>
                        <p>{patient.givenName} {patient.familyName[0]}.</p>
                        {patient.reportingStatus.today.reported ? <Report data={patient.reportingStatus.today} /> : <Pending />}

                    </div>
                )

            })}
        </div>

    </div>)

})

const Report = (props) => {
    const report = props.data

    return (
        <>
            {report.medicationTaken ? <Check style={{ color: Colors.green }} /> : <Clear style={{ color: Colors.red }} />}
            {report.photo ? <Check style={{ color: Colors.green }} /> : <Clear style={{ color: Colors.red }} />}
            <p>{report.numberSymptoms}</p>
        </>
    )

}

const Pending = () => {
    const classes = useStyles();
    return (
        <div className={classes.notSubmitted}>
            <TimeIcon style={{ color: Colors.yellow }} />
            <p>Not Submitted</p>
        </div>
    )
}

const Summary = observer(() => {
    const classes = useStyles();
    const {dailyCount} = useStores().practitionerStore.resolutionSummary
    const {practitionerStore} = useStores();
    return (
        <div className={classes.progress}>
            <BorderLinearProgress variant="determinate" value={(dailyCount/(dailyCount + practitionerStore.totalTasks))  * 100} />
            <div className={classes.taskStatus}>
            <div>
                <span>{dailyCount}</span>
                <p>Complete</p>
            </div>

            <div>
                <span className={'unfinished'}>{practitionerStore.totalTasks}</span>
                <p>Unfinished</p>
            </div>
            </div>
                
        </div>
    )
});

const TaskBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography className={classes.header} variant="h2">Overview</Typography>
            <Summary />
            <PatientList />
        </div>
    )
}

export default TaskBar;