import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import Colors from '../../../Basics/Colors';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import { DateTime } from 'luxon';
import Item from './Item';

const useStyles = makeStyles({
    container: {
        width: "100%",
        maxWidth: "400px",
        margin: "auto",
        marginBottom: "1em"
    },
    visContainer: {
        display: "flex",
        flexWrap: "nowrap",
        width: '100%',
        justifyContent: "flex-start",
    },
    element: {
        "&:first-of-type": {
            borderRadius: "5px 0 0 5px"
        },
        "&:last-of-type": {
            borderRadius: "0px 5px 5px 0",
            borderRight: "none"
        },
        borderRight: `1px solid ${Colors.textDarkGray}`,
        width: `${1 / 26 * 100}%`,
        height: "20px",
        backgroundColor: props => props.completed ? Colors.accentBlue : Colors.gray,
        position: "relative"

    },
    endsLayout: {
        width: "100%",
        marginTop: ".5em",
        paddingBottom: "1em",
        borderBottom: `1px solid ${Colors.gray}`,
        "& > div": {
            flex: "1 1 0",
            alignItems: "center"
        },
        "& > div:first-of-type, & > div:nth-of-type(2)": {
            borderRight: "solid 1px gray"
        }
    },
    currentWeek: {
        position: "absolute",
        bottom: ".5em",
        zIndex: "2",
        right: "-.5em",
        color: Colors.red
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

    return (
        <div className={classes.container}>
            <Visualization treatmentWeek={treatmentWeek} />
            <EndsLayout start={start} end={end} week={treatmentWeek} />
        </div>
    )

})

const EndsLayout = ({ start, end, week }) => {
    const classes = useStyles();
    return (
        <Grid justify="space-between" container wrap="nowrap" className={classes.endsLayout} >
            <Item top={"Start:"} bottom={start} />
            <Item className={classes.middleLabel} top={"Now:"} bottom={`Week ${week}`} />
            <Item top={"End:"} bottom={end} />
        </Grid>)
}

const Element = ({ completed, current }) => {
    const classes = useStyles({ completed: completed });
    return (<div className={classes.element}>
        {current && <LocationOnIcon className={classes.currentWeek} />}
    </div>)
}

const Visualization = ({ treatmentWeek }) => {

    const classes = useStyles();

    let list = []
    let i = 0;

    //Track if the marker has been set (treatment week < 26 weeks) if not put it at the end of the visual
    let markerSet = false;
    
    while (i < 26) { //Iterate over the 26 weeks of treatment
        if (i === treatmentWeek) {
            list.push(<Element current={true} completed={true} value={i} />);
            markerSet = true;
        } else if (i < treatmentWeek) {
            list.push(<Element completed={true} current={!markerSet && i === 25} />);
        } else {
            list.push(<Element completed={false} />);
        }
        i++;
    }

    return (<div className={classes.visContainer}>{list}</div>)
}

export default ProgressVis;