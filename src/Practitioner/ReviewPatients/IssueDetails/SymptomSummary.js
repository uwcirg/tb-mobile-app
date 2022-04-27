import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Symptom from '../../Shared/Symptom';
import Colors from '../../../Basics/Colors';

const SymptomSummary = ({patient}) => {

    return (
        <>
            <Typography>Symptoms</Typography>
            <Box bgcolor={Colors.lighterGray} padding=".5em">
                {Object.keys(patient.issues.symptomCounts).map((string, index) => {
                    return (<Grid key={`${patient.id}-symptom-${index}`} container>
                        <Symptom string={string} />: {patient.issues.symptomCounts[string]}
                    </Grid>)
                })}
            </Box>
        </>
    )

}

export default SymptomSummary;