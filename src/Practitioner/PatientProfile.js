import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react'

import Calendar from '../Basics/ReportCalendar';



const useStyles = makeStyles({
    listItem: {
        fontWeight: "bold",
        textTransform: "capitalize"
    },
    profile: {
        width: "50vw"
    }
})

const Profile = observer((props) => {

    const {practitionerStore} = useStores();

    useEffect(()=>{
        practitionerStore.getPatientDailyReports(props.id);
    },[])

    const classes = useStyles();

    let test;

    if (props.patient) {
        test = Object.keys(props.patient).map(each => {
            return <p><span className={classes.listItem}>{each}</span>: {JSON.stringify(props.patient[each])}</p>
        })
    }

    return (
        <div>
            <div className={classes.profile}>
                {props.patient && <h1>{props.patient.givenName} {props.patient.familyName}</h1>}
                {test}
            </div>
            {props.patient && practitionerStore.selectedPatient.reports && 
            <Calendar 
            reports={practitionerStore.selectedPatient.reports}
            treatmentStart={props.patient.treatmentStart}
               />}
        </div>)

});

export default Profile;