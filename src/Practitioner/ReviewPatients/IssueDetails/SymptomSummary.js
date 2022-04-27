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
                    const count = patient.issues.symptomCounts[string];
                    return (<Grid key={`${patient.id}-symptom-${index}`} container>
                        <Symptom string={string} />
                        {count > 1 && <>: {count}</>}
                    </Grid>)
                })}
            </Box>
        </>
    )

}

export default SymptomSummary;