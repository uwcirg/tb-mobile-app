import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InteractionCard from '../../Basics/InteractionCard';
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import useStores from '../../Basics/UseStores';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddMilestone from './AddMilestone';
import AddMilestones from './AddMilestone';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
    body: {
        width: "90%",
        "& > h2, & > div > h2": {
            fontSize: "1em",
            marginRight: "auto"
        }
    },
    header: {
        ...Styles.flexRow,
        justifyContent: "flex-end",
        marginBottom: "1em",
        width: "100%"
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
        fontSize: ".8em",
        marginBottom: "3px"
    },
    addButton: {
        backgroundColor: Colors.buttonBlue,
        color: "white",
        boxShadow: "none"
    },
    milestoneText:{
        ...Styles.flexColumn,
        "& > span": {
            margin: 0,
            padding: 0
        },
        "& > .title":{
            fontWeight: "medium",
            fontSize: ".9em",
            marginBottom: "5px"
        },
        "& > .date":{
            fontSize: ".75em"
        }
    }
})

const MileStones = observer(() => {

    const classes = useStyles();
    const { patientStore, patientUIStore } = useStores();
    const [onAddFlow, setOnFlow] = useState(false)
    const { t, i18n } = useTranslation('translation');


    const previous = patientStore.milestones.filter((m) => { return DateTime.fromISO(m.datetime).diffNow("minutes").minutes < 0 })
    const upcoming = patientStore.milestones.filter((m) => { return DateTime.fromISO(m.datetime).diffNow("minutes").minutes > 0 })

    return (
        <>
            {onAddFlow ? <AddMilestones handleBack={() => { setOnFlow(false) }} /> :
                <InteractionCard upperText={t("patient.progress.milestones")}>
                    <div className={classes.body}>
                        {/*<h2>{t("milestones.previous")}</h2>*/}
                        <div className={classes.header}> <h2>{t("milestones.previous")}</h2><Fab onClick={patientUIStore.goToAddMilestone} className={classes.addButton} size="small"><AddIcon /></Fab></div>
                        <MileStoneList milestones={upcoming} />
                        <h2>{t("milestones.upcoming")}</h2>
                        <MileStoneList milestones={previous} />
                       
                    </div>
                </InteractionCard>
            }
        </>
    )

});

const MileStoneList = (props) => {

    const list = props.milestones.map((milestone, index) => {
       
        return (<MileStone
            key={`milestone-${index}`}
            milestone={milestone}
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
    const date = DateTime.fromISO(props.milestone.datetime);
    return (
        <div className={classes.milestone}>
            <div className={classes.date}>
                <div className={classes.month}>{date.monthShort}</div>
                <div className={classes.day}>{date.day}</div>
            </div>
            <div className={classes.milestoneText}>
                <span className="title">{props.milestone.title}</span>
                <span className="date">{date.toLocaleString(DateTime.DATE_SHORT)}</span>
            </div>
        </div>
    )
}

export default MileStones;
export {MileStone};