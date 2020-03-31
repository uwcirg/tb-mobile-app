import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InteractionCard from '../Home/InteractionCard';
import Styles from '../../Basics/Styles';
import ClickableText from '../../Basics/ClickableText';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    body: {
        width: "90%"
    },
    header: {
        ...Styles.flexRow,
        alignContent: "center",
        marginBottom: "1em",
        "& > h2": {
            fontSize: "1em",
            marginRight: "auto"
        }
    },
    milestone: {
        ...Styles.flexRow,
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "1em",
        "& > p":{
            margin: 0,
            padding: 0,
        }
    },
    date: {
        ...Styles.flexColumn,
        alignItems: "center",
        marginRight: "1em",
        color: Colors.accentBlue,
        width: "10%"
    },
    month: {
        fontSize: ".75em",
        marginBottom: "3px"
    }
})

const MileStones = () => {

    const classes = useStyles();

    return (<InteractionCard upperText="Milestones">
        <div className={classes.body}>
            <div className={classes.header}><h2>Upcoming</h2><ClickableText hideIcon text="Edit" /></div>
            <MileStoneList />
        </div>
    </InteractionCard>)

}

const MileStoneList = () => {
    const base = DateTime.local();
    return (
        <>
            <MileStone
                date={base.plus({days: 1})}
                name="Treatment Phase 2"
            />
            <MileStone
                date={base.plus({days: 5})}
                name="Medication Pickup" />
            <MileStone
                date={base.plus({weeks: 5})}
                name="Follow Up" />

        </>
    )
}

const MileStone = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.milestone}>
            <div className={classes.date}>
                <div className={classes.month}>{props.date.monthShort}</div>
                <div className={classes.day}>{props.date.day}</div>
            </div>
            <p>{props.name}</p>
        </div>
    )
}

export default MileStones;