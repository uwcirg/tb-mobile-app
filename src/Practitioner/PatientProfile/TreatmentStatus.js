import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import 'react-circular-progressbar/dist/styles.css'
import PhotoAdherence from './PhotoAdherence'
import MedicationAdherence from './MedicationAdherence'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    container: {
        flexGrow: 1,
        maxWidth: "280px",
        padding: "1em",
        backgroundColor: "white",
        "& > h2": {
            overflow: "wrap"
        },
    },
    body: {
        "& > div": {
            marginTop: "1em"
        }
    }
})

const TreatmentStatus = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<div className={classes.container}>
        <Typography variant={"h2"}>{t('coordinator.patientTableLabels.adherence')}</Typography>
        <Grid className={classes.body} container direction="column" >
            <MedicationAdherence />
            <PhotoAdherence />
        </Grid>
    </div>)

};


export default TreatmentStatus;