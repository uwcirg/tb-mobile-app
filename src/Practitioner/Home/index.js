import React from 'react';
import { makeStyles, Grid, Box, IconButton, Typography } from '@material-ui/core';
import PractitionerAPI from '../../API/PractitionerAPI';
import useRequestInitalData from '../../Hooks/useRequestInitalData';
import PatientCard from '../ReviewPatients/PatientCard';
import { Refresh } from '@material-ui/icons';
import OverTopBar from '../../Patient/Navigation/OverTopBar';

const useStyles = makeStyles({

})

const PractitionerHome = () => {

    const classes = useStyles();

    const { data, refresh, error, loading } = useRequestInitalData(PractitionerAPI.getPatients)

    return (<div>
            <OverTopBar hideIconButton title={<Grid alignItems='center' container>
                    Review Patients
                <IconButton onClick={refresh}>
                    <Refresh />
                </IconButton>
            </Grid>} />
            <Box aria-hidden height="60px" />
            {loading && <p>Data is loading</p>}
            {data && <>
                <Grid direction="column">
                    <Box height={".5em"} aria-hidden />
                    {data.map(patient => {
                        return <Box padding='0 .5em .5em .5em'>
                            <PatientCard key={`review-patient-${patient.id}`} patient={patient} />
                        </Box>
                    })}
                    <Box height="60px" aria-hidden />
                </Grid>
            </>}</div>)
}

export default PractitionerHome;