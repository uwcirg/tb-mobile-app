import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({

    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: ".5em",
        boxSizing: 'border-box'
    },
    patientListContainer: {
        "& > h2": { ...Styles.patientPageTitle },
    },
    patientList: {
        maxHeight: "400px",
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
        "& > p": {
            fontSize: ".875em",
            marginLeft: "1em",
        },
        "&  > *": {
            flexBasis: "20%"
        },
        "& > p:first-child": {
            flexBasis: "30%"
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
    }
})

const PatientList = observer(() => {

    const classes = useStyles();
    const { practitionerStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    const patientList  = practitionerStore.patientList.sort( each => {
        if(each.reportingStatus.today.reported) return -1
        return 1
    })

    return (<div className={classes.patientListContainer}>
        <Typography variant="h2">{t('coordinator.titles.reportingStatus')}</Typography>
        <div className={`${classes.patientCard} ${classes.labels}`}>
            <p className={classes.names}>Name</p>
            <p>Medicine Taken</p>
            <p>Photo Submitted</p>
            <p>Symptoms Reported</p>
        </div>
        <div className={classes.patientList}>
            {practitionerStore.patientList && practitionerStore.patientList.map(patient => {
                return (
                    <div className={classes.patientCard}>
                        <p key={patient.id}>{patient.givenName} {patient.familyName[0]}.</p>
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

const TaskBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <PatientList />
        </div>
    )
}

export default TaskBar;