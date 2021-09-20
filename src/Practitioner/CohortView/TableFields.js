import React from 'react';
import Priority from '../Shared/Priority';
import { DateTime } from 'luxon';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import useStores from '../../Basics/UseStores';

const useStyles = makeStyles({
    profileLink: {
        "&, &:visited": {
            color: Colors.buttonBlue,
            textDecoration: "none"
        }
    }
})


const Name = ({ fullName, id }) => {

    const classes = useStyles();
    const { push } = useStores().routingStore;
    //Handle Patient Link
    const handlePatientClick = (event) => {
        event.preventDefault();
        push(`/patients/${id}`)
    }
    return <a className={classes.profileLink} href={`/patients/${id}`} onClick={handlePatientClick}>{fullName}</a>
}

const percentComponent = (value) => {
    return `${Math.round(value * 100)}%`
}

const fields = [
    {
        key: "fullName",
        displayName: "Name",
        formatter: (value, patient) => <Name {...patient} />
    },
    {
        key: "priority",
        displayName: "Priority",
        align: "center",
        formatter: (value) => <Priority index={value} />
    },
    {
        key: "treatmentStart",
        displayName: "App Start",
        formatter: (value) => `${DateTime.fromISO(value).toLocaleString(DateTime.DATE_MED)}`
    },
    {
        key: "daysSinceLastReport",
        displayName: "Last Report",
        formatter: (value) => !(value === false) ? (value > 0 ? `${value} days ago` : "Today") : 'No Reports'
    },
    {
        key: "adherence",
        displayName: "Adherence",
        formatter: percentComponent,
        align: "right"
    },
    {
        key: "photoAdherence",
        displayName: "Photo Adherence",
        formatter: percentComponent,
        align: "right"
    }
]

export default fields;