import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useAsync from '../../Hooks/useAsync';
import PractitionerAPI from '../../API/PractitionerAPI';
import PatientCard from './PatientCard';

async function getPatients(){
    return PractitionerAPI.getPatients(true);
}

const AllPatientsList = () => {

    const { value  } = useAsync(getPatients);

    return (<div>
        {value && value.map( each => {
            return <PatientCard isSimpleView patient={each} />
        })}
    </div>)

}

export default AllPatientsList;