import React, { useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import TimeIcon from '@material-ui/icons/AccessTime';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import Colors from '../../Basics/Colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import SubmittedVisual from './SubmittedVisual';
import SectionTitle from '../../Components/Practitioner/SectionTitle';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        margin: "auto",
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
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2em",
        boxSizing: 'border-box',
        borderLeft: `solid 1px ${Colors.lightgray}`
    },
    patientListContainer: {
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column"

    },
    patientList: {
        flex: "1 1 0",
        overflow: "scroll"
    },
    patientCard: {
        display: "flex",
        alignItems: "center",
        padding: ".25em",
        borderRadius: "4px",
        boxShadow: "0px 4px 16px rgba(204, 188, 252, 0.15)",
        backgroundColor: "white",
        marginTop: ".5em",
        "&:hover": {
            cursor: "pointer"
        },
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
        alignItems: "flex-start",
        flexGrow: "1",
        "& >  p": {
            margin: 0,
            marginLeft: "1em",
            fontSize: ".875em"
        }
    },
    labels: {
        borderRadius: "0",
        boxShadow: "none",
        backgroundColor: "none",
        "& > p": {
            textAlign: "center"
        },
        "&:hover": {
            cursor: "unset"
        },
    },
    header: {
        fontWeight: "bold",
        fontSize: "1.5em"
    },
    taskStatus: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        marginTop: ".5em",
        "& > div": {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textTransform: "capitalize",
            "& > span": {
                color: Colors.accentBlue,
                fontSize: "1.8em",
                alignSelf: "center"
            },
            "& > span.unfinished": {
                color: Colors.textGray,
            },
            "& > p": {
                fontSize: ".875em",
                margin: 0
            }
        }
    },
    progress: {
        padding: "1em",
        width: "70%",
        margin: "1em auto",
    }
})

const PatientList = observer(() => {

    const classes = useStyles();
    const { practitionerStore, practitionerUIStore } = useStores();
    const { t } = useTranslation('translation');

    useEffect(() => {
        practitionerStore.getCompletedResolutionsSummary();
    }, [])

    return (<div className={classes.patientListContainer}>
        <SectionTitle>{t('coordinator.titles.reportingStatus')}</SectionTitle>
        <SubmittedVisual />
        <div className={`${classes.patientCard} ${classes.labels}`}>
            <p className={classes.names}>{t('coordinator.patientTableLabels.name')}</p>
            <p>{t('report.medicationTaken')}</p>
            <p>{t('report.photoSubmitted')}</p>
            <p>{t('commonWords.symptoms')}</p>
        </div>
        <div className={classes.patientList}>
            {practitionerStore.patientList && practitionerStore.patientList.map(patient => {
                return (
                    <div key={patient.id} className={classes.patientCard} onClick={() => { practitionerUIStore.goToPatient(patient.id) }}>
                        <p>{patient.givenName} {patient.familyName[0]}.</p>
                        {patient.reportingStatus && patient.reportingStatus.today.reported ? <Report data={patient.reportingStatus.today} /> : <Pending />}

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
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <div className={classes.notSubmitted}>
            <TimeIcon style={{ color: Colors.yellow }} />
            <p>{t('coordinator.tasksSidebar.noReport')}</p>
        </div>
    )
}

const Summary = observer(() => {
    const classes = useStyles();
    const { practitionerStore } = useStores();
    const { t } = useTranslation('translation');
    return (
        <div className={classes.progress}>
            <BorderLinearProgress variant="determinate" value={(practitionerStore.numberOfCompletedTasks / (practitionerStore.numberOfCompletedTasks + practitionerStore.totalTasks)) * 100} />
            <div className={classes.taskStatus}>
                <div>
                    <span>{practitionerStore.numberOfCompletedTasks}</span>
                    <p>{t('coordinator.tasksSidebar.complete')}</p>
                </div>
                <div>
                    <span className={'unfinished'}>{practitionerStore.totalTasks}</span>
                    <p>{t('coordinator.tasksSidebar.unfinished')}</p>
                </div>
            </div>
        </div>
    )
});

const TaskBar = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    return (
        <div className={classes.container}>
            <SectionTitle>{t('coordinator.tasksSidebar.overview')}</SectionTitle>
            <Summary />
            <PatientList />
        </div>
    )
}


export default TaskBar;