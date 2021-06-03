import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useStores from '../../Basics/UseStores';
import StackedLinearProgress from '../../Components/StackedLinearProgress';
import { observer } from 'mobx-react';
import AdherenceValue from '../../Components/AdherenceValue'

const PhotoAdherence = observer(() => {

    const { details: patient } = useStores().patientProfileStore.selectedPatient;

    const partV = Math.round(patient.photoSummary.conclusive / patient.photoSummary.requested * 100)
    const totalV = Math.round(patient.photoSummary.submitted / patient.photoSummary.requested * 100)
    const missed = patient.photoSummary.requested - patient.photoSummary.submitted;

    return (<>
        <Typography >Photo Adherence</Typography>
        <AdherenceValue adherence={patient.photoAdherence} />
        <StackedLinearProgress 
        partValue={partV} 
        totalValue={totalV} 
        tooltipContent={{
            green: `Conclusive: ${patient.photoSummary.conclusive}`,
            yellow: `Inconclusive: ${patient.photoSummary.inconclusive}`,
            red: `Missed Request ${missed}`
        }}
        />
    </>)

})

export default PhotoAdherence;