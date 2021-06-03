import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useStores from '../../Basics/UseStores';
import StackedLinearProgress from '../../Components/StackedLinearProgress';
import { observer } from 'mobx-react';
import AdherenceValue from '../../Components/AdherenceValue'
import { useTranslation } from 'react-i18next';


const PhotoAdherence = observer(() => {

    const { details: patient } = useStores().patientProfileStore.selectedPatient;
    const { t } = useTranslation('translation');
    const partV = Math.round(patient.photoSummary.conclusive / patient.photoSummary.requested * 100)
    const totalV = Math.round(patient.photoSummary.submitted / patient.photoSummary.requested * 100)
    const missed = patient.photoSummary.requested - patient.photoSummary.submitted;

    return (<div>
        <AdherenceValue title={t('commonWords.testStrips')} adherence={patient.photoAdherence} />
        <StackedLinearProgress
            partValue={partV}
            totalValue={totalV}
            additionalDetails={<>
                <Typography>Percent Submitted: {totalV}%</Typography>
                <Typography>Percent Conclusive: {partV}%</Typography>
            </>}
            detailContent={{
                green: {label: "Conclusive", data: patient.photoSummary.conclusive },
                yellow: {label: "Inconclusive", data: patient.photoSummary.inconclusive || 0 },
                red: {label: "Didn't Submit", data: missed || 0 }
            }}
        />
    </div>)

})

export default PhotoAdherence;