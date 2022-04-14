import React from 'react';
import { makeStyles, Grid, Box } from '@material-ui/core';
import PractitionerAPI from '../../API/PractitionerAPI';
import useRequestInitalData from '../../Hooks/useRequestInitalData';
import PatientCard from '../ReviewPatients/PatientCard';

const useStyles = makeStyles({

})

const PractitionerHome = () => {

    const classes = useStyles();

    const { data, refresh, error, loading } = useRequestInitalData(PractitionerAPI.getPatients)

    return (<div>
        <Grid container>
            <p>Patient Review</p>
            <button onClick={refresh}>Refresh</button>
        </Grid>
        {loading && <p>Data is loading</p>}
        {data && <>
            <Grid direction="column">
                {data.map(patient => {
                    return <Box padding='0 .5em .5em .5em '>
                        <PatientCard key={`review-patient-${patient.id}`} patient={patient} />
                    </Box>
                })}
            </Grid>
        </>
        }
    </div>)

}

export default PractitionerHome;