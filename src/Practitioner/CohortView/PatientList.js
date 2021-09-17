import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Priority from '../Shared/Priority';
import Colors from '../../Basics/Colors';


const useStyles = makeStyles({
    profileLink:{
        "&, &:visited":{
            color: Colors.buttonBlue,
            textDecoration: "none"
        }
    }
})

const Name = ({fullName,id}) => {

    const classes = useStyles();
    const {push} = useStores().routingStore;
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
        component: (value,patient) => <Name {...patient}/>
    },
    {
        key: "priority",
        displayName: "Priority",
        component: (value) => <Priority index={value} />
    },
    {
        key: "treatmentStart",
        displayName: "App Start"
    },
    {
        key: "adherence",
        displayName: "Adherence",
        component: percentComponent
    },
    {
        key: "photoAdherence",
        displayName: "Photo Adherence",
        component: percentComponent
    }
]

const PatientList = observer(() => {

    const classes = useStyles();
    const patients = useStores().practitionerStore.patientList;

    return (<div>
        <h1>Patients: {patients.length}</h1>

        <Table>
            <TableHead>
                <TableRow>
                    {fields.map(field => <TableCell>{field.displayName}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {patients && patients.map(patient => <PatientRow key={patient.id} patient={patient} />)}
            </TableBody>
        </Table>
    </div>)

});

const PatientRow = ({ patient, index }) => {

    const { fullName, phoneNumber, priority, treatmentStart, adherence } = patient;
    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<TableRow>
        {fields.map(field => <TableCell>{field.component ? field.component(patient[field.key], patient) : patient[field.key]} </TableCell>)}
    </TableRow>)
}

export default PatientList;