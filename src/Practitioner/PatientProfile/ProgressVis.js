import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography'
import { toJS } from 'mobx';
import Colors from '../../Basics/Colors';
import Grid from '@material-ui/core/Grid'
import { DateTime } from 'luxon';



const useStyles = makeStyles({
    visContainer: {
        display: "flex",
        flexWrap: "nowrap",
        width: '100%',
        justifyContent: "flex-start"
    },
    element: {
        borderRight: `1px solid ${'black'}`,
        width: `${1 / 26 * 100}%`,
        height: "20px",
        backgroundColor: props => props.completed ? Colors.calendarGreen : "unset"

    },
    endsLayout:{
        width: "100%",
        padding: ".5em 0"
    }
})

const ProgressVis = observer(() => {

    const classes = useStyles();
    const { patientProfileStore } = useStores();

    const treatmentWeek = patientProfileStore.selectedPatient.details.weeksInTreatment

    const getDate = (iso) => {
        return (DateTime.fromISO(iso).toLocaleString({ day: 'numeric', month: 'short' }))
    }

    const start = getDate(patientProfileStore.selectedPatient.details.treatmentStart);
    const end = getDate(patientProfileStore.selectedPatient.details.treatmentEndDate);

    let list = []

    let i = 0;

    while (i < 26) {

        if (i < treatmentWeek) {
            list.push(true);
        } else {
            list.push(false);
        }
        i++;
    }



    return (
        <>
            <EndsLayout left={"Start"} right={"End"} />
            <div className={classes.visContainer}>
                {list.map(e => {
                    return <Element completed={e} />
                })}
            </div>
            <EndsLayout left={start} right={end} />
        </>
    )

})

const EndsLayout = ({ left, right }) => {
    const classes = useStyles();
    return (
        <Grid justify="space-between" container wrap="nowrap" className={classes.endsLayout} >
            <Typography variant="body1">{left}</Typography>
            <Typography variant="body1">{right}</Typography>
        </Grid>)
}

const Element = ({ completed }) => {
    const classes = useStyles({ completed: completed });
    return (<div className={classes.element}></div>)
}

export default ProgressVis;