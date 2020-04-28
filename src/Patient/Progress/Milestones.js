import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InteractionCard from '../Home/InteractionCard';
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import useStores from '../../Basics/UseStores';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddMilestone from './AddMilestone';
import AddMilestones from './AddMilestone';

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
        "& > p": {
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
    },
    addButton: {
        backgroundColor: Colors.buttonBlue,
        color: "white",
        boxShadow: "none"
    }
})

const MileStones = () => {

    const classes = useStyles();
    const { patientStore } = useStores();
    const [onAddFlow, setOnFlow] = useState(false)

    return (
        <>
            { onAddFlow ? <AddMilestones handleBack={() => {setOnFlow(false)}} /> :
                <InteractionCard upperText="Milestones">
                    <div className={classes.body}>
                        <div className={classes.header}><h2>Upcoming</h2><Fab onClick={() => { setOnFlow(true) }} className={classes.addButton} size="small"><AddIcon /></Fab></div>
                        <MileStoneList milestones={patientStore.milestones} />
                    </div>
                </InteractionCard>
            }
        </>
    )

}

const MileStoneList = (props) => {
    const base = DateTime.local();

    const list = props.milestones.map(milestone => {
        return (<MileStone
            date={base.plus({ days: 1 })}
            name="Treatment Phase 2"
        />)
    })



    return (
        <>
            {props.milestones.length > 0 ? list : <p>No Milestones Saved</p>}
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