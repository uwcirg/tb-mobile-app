import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import AddPatientPrompt from './AddPatientPrompt'

const useStyles = makeStyles({

    patientList: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        fontFamily: "Roboto, sans-serif",
        minWidth: "80%",
        borderRadius: ".5em",
        marginTop: "1em"
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
            justifyContent: "center",
            padding: ".5em",
            width: "20%",
            alignItems: "center",
            display: "flex",
            alignItems: "center",
            "&:first-child": {
                paddingLeft: "1em"
            },
            "& > p": {
                padding: 0,
                margin: 0,
                width: "100%",
                textAlign: "left"
            }
        }

    },
    superContainer: {
        width: "80%",
        "& > h2": {
            fontSize: "1.25em",
            width: "100%",
            textAlign: "left"
        }
    }

})

const PatientsView = (props) => {
    return (
        <>
            <Patients list={props.patientList} />
            <Patients temporary list={props.tempList} />
        </>
    )
}


const Patients = (props) => {
    const classes = useStyles();

    let list = props.list.map(patient => {
        return (
            <div className={classes.singlePatient}>
                <div className={classes.name}>
                    <p>
                        {patient.givenName} {patient.familyName}
                    </p>
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

        <div className={classes.superContainer}>
            <h2>{props.temporary ? "Awaiting Activation" : "Active Patients" }</h2>
            <div className={classes.patientList}>
                {props.list && list}
            </div>
            {props.temporary && <AddPatientPrompt />}
        </div>
    )

}

export default PatientsView;