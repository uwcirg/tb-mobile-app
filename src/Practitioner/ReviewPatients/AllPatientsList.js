import React from 'react';
import useAsync from '../../Hooks/useAsync';
import PractitionerAPI from '../../API/PractitionerAPI';
import PatientCard from './PatientCard';
import { Box } from '@material-ui/core';

async function getPatients(){
    return PractitionerAPI.getPatients(true);
}

const AllPatientsList = () => {

    const { value  } = useAsync(getPatients);

    return (<div>
        {value && value.map( each => {
            return (<Box padding=".5em"> 
                <PatientCard isSimpleView patient={each} />
            </Box>)
        })}
    </div>)

}

export default AllPatientsList;