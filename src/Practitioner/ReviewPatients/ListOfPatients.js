import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import PractitionerContext from '../PractitionerContext';
import addIssuesToPatients from '../../Utility/FindIssues';
import { Box, Grid } from '@material-ui/core';
import PatientCard from './PatientCard';

const wasToday = (isoTime) => {
    return DateTime.fromISO(isoTime).toISODate() === DateTime.local().toISODate()
}

const ListOfPatients = ({ tabValue }) => {

    const { value: patients, setValue: setPatients } = useContext(PractitionerContext).patientIssues

    const markPatientAsReviewed = (patientId) => {
        let tempValue = [...patients]
        const indexOfPatient = tempValue.findIndex(each => { return each.id === patientId })
        tempValue[indexOfPatient].lastGeneralResolution = DateTime.local().toISO()
        setPatients(tempValue)
    }

    const patientsToDisplay = (patients || []).filter(_patient => {
        if (tabValue === 2) return true;
        const alreadyReviewed = wasToday(_patient.lastGeneralResolution);
        return tabValue === 0 ? !alreadyReviewed : alreadyReviewed
    })

    //@Todo - wrap this in a callback since the calculations are complex 
    const patientsWithIssues = addIssuesToPatients(patientsToDisplay || []).sort((a, b) => {
        return b.issues.total - a.issues.total;
    });

    if (!patients) return "";

    return (<Grid container direction="column" >
        <Box height={".5em"} aria-hidden />
        {patientsWithIssues.map(patient => {
            return <Box key={`review-patient-${patient.id}`} padding='0 .5em .5em .5em'>
                <PatientCard isReviewed={tabValue === 1} markPatientAsReviewed={markPatientAsReviewed} patient={patient} />
            </Box>
        })}
        <Box height="60px" aria-hidden />
    </Grid>)

};

export default ListOfPatients;