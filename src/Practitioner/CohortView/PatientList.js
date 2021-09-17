import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({

})

const fields = [
    {
        key: "fullName",
        displayName: "Name"
    },
    {
        key: "priority",
        displayName: "Priority"
    },
    {
        key: "treatmentStart",
        displayName: "App Start"
    },
    {
        key: "adherence",
        displayName: "Adherence",
        formatter: (value) => {
            return `${Math.round(value * 100)}%`
        }
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
                {fields.map( field => <TableCell>{field.displayName}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {patients && patients.map(patient => <PatientRow key={patient.id} patient={patient} />)}
            </TableBody>
        </Table>
    </div>)

});

const PatientRow = ({ patient }) => {

    const { fullName, phoneNumber, priority, treatmentStart, adherence } = patient;
    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<TableRow>
        {/* <TableCell>{fullName}</TableCell>
        <TableCell align="center">{priority}</TableCell>
        <TableCell>{treatmentStart}</TableCell>
        <TableCell>2 days ago</TableCell>
        <TableCell>{adherence}</TableCell> */}
        {fields.map( field => <TableCell>{field.formatter ? field.formatter(patient[field.key]) : patient[field.key]} </TableCell>)}
    </TableRow>)
}

export default PatientList;