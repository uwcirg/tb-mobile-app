import React, { useContext } from 'react';
import PatientCard from './PatientCard';
import { Box } from '@material-ui/core';
import PractitionerContext from '../PractitionerContext';
import LoadingPatients from './LoadingPatients';

const AllPatientsList = () => {

    const { value: patients, status } = useContext(PractitionerContext).patients;

    if (status === "pending") return <LoadingPatients />;

    return (<div>
        {patients && patients.map(each => {
            return (<Box padding=".5em">
                <PatientCard isSimpleView patient={each} />
            </Box>)
        })}
    </div>)

}

export default AllPatientsList;