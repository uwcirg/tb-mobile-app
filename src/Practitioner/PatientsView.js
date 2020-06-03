import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import AddPatientPrompt from './AddPatientPrompt'
import Colors from '../Basics/Colors';
import AdherenceGraph from './AdherenceGraph';
import Card from './Shared/Card';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/People'

const useStyles = makeStyles({
    title:{
        width: "100%",
        textAlign: "left"
    },
    container: {
        margin: "2em 0 2em 0",
        width: "60%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        "& > div": {
            marginTop: "2em"
        }
    },
    patientList: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        fontFamily: "Roboto, sans-serif",
        minWidth: "80%"
    },
    singlePatient: {
        display: "flex",
        minHeight: "50px",
        borderBottom: "1px solid lightgray",
        "&:first-child": {
            backgroundColor: "white",
            color: "gray",
            borderRadius: ".5em .5em 0 0",
            fontWeight: "bold"
        },
        "&:last-child": {
            borderBottom: "none"
        },
        "& > div": {
            justifyContent: "flex-start",
            padding: ".5em",
            width: "20%",
            display: "flex",
            alignItems: "center",
            "&:first-child": {
                paddingLeft: "1em"
            },
            "& > p,a,a:visited": {
                color: Colors.buttonBlue,
                cursor: "pointer",
                padding: 0,
                margin: 0,
                width: "100%",
                textAlign: "left"
            }
        }
    },
    superContainer: {
        width: "80%",
        backgroundColor: "lightgray",
        "& > h2": {
            fontSize: "2em",
            width: "100%",
            textAlign: "left"
        }
    }
})

const PatientsView = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <h1 className={classes.title}> My Patients</h1>
            <AdherenceGraph />
            <Patients icon={<PersonIcon />} title={"All Patients"} list={props.patientList} handlePatientClick={props.handlePatientClick} />
            <Patients icon={<PersonAddIcon />} title={"Awaiting Activation"} list={props.tempList} />
        </div>
    )
}

const Patients = (props) => {
    const classes = useStyles();

    let list = props.list.map(patient => {
        return (
            <div className={classes.singlePatient}>
                <div className={classes.name}>
                    <a onClick={() => { props.handlePatientClick(patient.identifier[0].value) }}>
                        {patient.givenName} {patient.familyName}
                    </a>
                </div>
                <div className={classes.name}>
                    {patient.phoneNumber}
                </div>
                <div>
                    {DateTime.fromISO(patient.treatmentStart).toLocaleString(DateTime.DATE_SHORT)}
                </div>
                <div>
                    {patient.lastReport ? patient.lastReport.date : "No Reports"}
                </div>
            </div>
        )
    })

    list.unshift((<div className={classes.singlePatient}>
        <div className={classes.name}>
            Name
                </div>
        <div className={classes.name}>
            Phone
                </div>
        <div>
            Treatment Start
                </div>
        <div>
            Last submission
                </div>
    </div>))

    return (
        <Card icon={props.icon} title={props.title}>
            <div className={classes.patientList}>
                {props.list ? list : "No Patients Found"}
            </div>
            {props.temporary && <AddPatientPrompt />}
        </Card>
    )
}

export default PatientsView;