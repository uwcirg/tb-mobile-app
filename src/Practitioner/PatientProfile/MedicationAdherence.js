import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../../Basics/UseStores'
import Typography from '@material-ui/core/Typography'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import AdherenceValue from '../../Components/AdherenceValue'
import StackedLinearProgress from '../../Components/StackedLinearProgress'

const useStyles = makeStyles({

})

const Adherence = observer(() => {
    const { details: patient } = useStores().patientProfileStore.selectedPatient;

    const classes = useStyles();
    const { t } = useTranslation('translation');

    const part = Math.floor(patient.medicationSummary.adherentDays / patient.medicationSummary.daysSinceAppStart * 100)
    const total = Math.floor((patient.medicationSummary.adherentDays + patient.medicationSummary.reportedMissedDays)  / patient.medicationSummary.daysSinceAppStart * 100)

    return (
        <div>
            <AdherenceValue title={t('commonWords.medication')} adherence={patient.adherence} />
            <StackedLinearProgress 
                partValue={part} 
                totalValue={total} 
                tooltipContent={{
                    green: `Reported Taken: ${patient.medicationSummary.adherentDays}`,
                    yellow: `Reported Not Taken: ${patient.medicationSummary.reportedMissedDays}`,
                    red: `Didn't Report ${patient.medicationSummary.daysSinceAppStart - patient.medicationSummary.reportedMissedDays - patient.medicationSummary.adherentDays}`
                }}
                />
        </div>
    )
})


export default Adherence;