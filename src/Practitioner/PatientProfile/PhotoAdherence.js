import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useStores from '../../Basics/UseStores';
import StackedLinearProgress from '../../Components/StackedLinearProgress';
import { observer } from 'mobx-react';
import Colors from '../../Basics/Colors';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    colorLabel: {
        backgroundColor: props => props.color,
        height: "1em", width: "1em",
        borderRadius: "2px",
        marginRight: ".5em"
    },
    adherence: {
        fontWeight: "bold",
        fontSize: "1.75em",
        textAlign: "center"
    }
})

const PhotoAdherence = observer(() => {

    const classes = useStyles();
    const { details: patient } = useStores().patientProfileStore.selectedPatient;

    const partV = Math.round(patient.photoSummary.conclusive / patient.photoSummary.requested * 100)
    const totalV = Math.round(patient.photoSummary.submitted / patient.photoSummary.requested * 100)

    return (<>
        <Typography >Photo Adherence</Typography>
        <Typography className={classes.adherence}>{patient.photoAdherence * 100}%</Typography>
        <StackedLinearProgress partValue={partV} totalValue={totalV} />
        <Grid alignItems="flex-end">
            <Label color={Colors.green}>Conclusive: {patient.photoSummary.conclusive} </Label>
            <Label color={Colors.yellow}>Inconclusive: {patient.photoSummary.inconclusive} </Label>
            <Label color={Colors.red}> Missed: {patient.photoSummary.requested - patient.photoSummary.submitted}</Label>
        </Grid>

    </>)

})

const Label = (props) => {
    const classes = useStyles({ color: props.color })
    return (
        <Grid container alignItems="center"><div className={classes.colorLabel} /> <Typography> {props.children}</Typography></Grid>
    )
}

export default PhotoAdherence;