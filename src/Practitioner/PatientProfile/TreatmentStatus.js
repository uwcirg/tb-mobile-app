import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import 'react-circular-progressbar/dist/styles.css'
import PhotoAdherence from './PhotoAdherence'
import MedicationAdherence from './MedicationAdherence'

const useStyles = makeStyles({
    container: {
        flexGrow: 1,
        padding: "1em",
        backgroundColor: "white",
        "& > h2": {
            overflow: "wrap"

        }
    }

})

const TreatmentStatus = (props) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<div className={classes.container}>
        <Typography variant={"h2"}>{t('coordinator.patientProfile.treatmentStatus')}</Typography>
        <MedicationAdherence />
        <PhotoAdherence />
    </div>)

};


export default TreatmentStatus;