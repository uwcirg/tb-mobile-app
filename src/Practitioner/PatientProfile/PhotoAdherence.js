import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useStores from '../../Basics/UseStores';
import StackedLinearProgress from '../../Components/StackedLinearProgress';
import { observer } from 'mobx-react';
import AdherenceValue from '../../Components/AdherenceValue'
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    percent:{fontSize: "1.75em"},
    details:{width: "100%", margin: "1em 0"}
})

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
            additionalDetails={<Details submitted={totalV} conclusive={partV} />}
            detailContent={{
                green: { label: "Conclusive", data: patient.photoSummary.conclusive },
                yellow: { label: "Inconclusive", data: patient.photoSummary.inconclusive || 0 },
                red: { label: "Didn't Submit", data: missed || 0 }
            }}
        />
    </div>)

})

const Details = ({ submitted, conclusive }) => {
    const classes = useStyles();

    return (<Grid wrap="nowrap" direction="row" justifyContent="center" className={classes.details} container>
        <Detail text={"Submitted"} percent={submitted} />
        <Detail text={"Conclusive"} percent={conclusive} />
    </Grid>)
}

const Detail = ({text,percent}) =>{
    const classes = useStyles();
    return(
        <Grid direction="column" alignItems="center" container>
            <Typography>{text}</Typography>
            <Typography className={classes.percent} variant="h2">{percent}%</Typography>
        </Grid>)
}

export default PhotoAdherence;