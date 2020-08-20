import React, { useState } from 'react';
import { observer } from 'mobx-react'
import useStores from '../../Basics/UseStores'
import { CircularProgressbarWithChildren as CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { makeStyles } from '@material-ui/core/styles'
import Styles from '../../Basics/Styles';
import InteractionCard from '../../Basics/InteractionCard';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import ClickableText from '../../Basics/ClickableText';
import { MileStone } from '../Progress/Milestones'
import TreatmentTimeline, { Panel } from '../../Basics/TreatmentTimeline'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const ProgressGraph = observer((props) => {
    const classes = useStyles();
    const [showTimeline, setShowTimeline] = useState(false);
    const { patientStore, patientUIStore, } = useStores();
    const dayValue = (patientStore.patientInformation.daysInTreatment / 180) * 100;
    const { t, i18n } = useTranslation('translation');

    const expand = () => {
        console.log("expand")
        setShowTimeline(!showTimeline)
    }

    return (
        <InteractionCard id="intro-progress-card" upperText={t("patient.home.cardTitles.myProgress")}>
            <div className={classes.container}>
                <div className={classes.topSection}>
                    <div className={classes.graph}>
                        <CircularProgressbar circleRatio={0.5} value={dayValue} styles={buildStyles({
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                            pathColor: Colors.accentBlue,
                            rotation: 3 / 4,
                            strokeLinecap: "round"
                        })}>
                            <p className={classes.progressText}>{patientStore.patientInformation.daysInTreatment} {t("commonWords.of")} <br /> 180 {t('time.days')}</p>
                        </CircularProgressbar>
                    </div>
                    <StatBox title={patientStore.getCurrentStreak} text={t('patient.home.progress.currentStreak')} />
                </div>
            </div>
            <div className={classes.bottomSection}>
                <div className={classes.timelineHeader}>
                <Typography variant="h2">Timeline</Typography>
                <ClickableText onClick={expand} hideIcon text={"View All"} />
                </div>
                <div className={classes.timeline}>
                    {!showTimeline ? <div className="preview">
                        <Panel weeksInTreatment={props.weeksInTreatment} title={`${t('timeline.followUp')}`} weekValue={24} noWeek week="Every 2 Months" />
                    </div> :
                        <TreatmentTimeline weeksInTreatment={patientStore.patientInformation.weeksInTreatment} />}
                    {/* <button onClick={expand}>show all</button> */}     
                </div>
            </div>
        </InteractionCard>
    )
});

function StatBox(props) {
    const classes = useStyles();
    return (
        <div className={classes.statBox}>
            <h2 className={classes.statBoxTitle}>{props.title}</h2>
            <span className={classes.statBoxText}>{props.text}</span>
        </div>
    )
}

const useStyles = makeStyles({
    progressText: {
        textAlign: "center",
        color: Colors.accentBlue,
        padding: 0,
        margin: 0,
        position: "relative",
        top: "-1em",
        fontSize: "110%"
    },
    graph: {
        width: "50%",
        maxWidth: "200px",
        position: "relative",
        top: "1.5em"
    },
    stats: {
        ...Styles.flexRow,
        justifyContent: "flex-end",
        position: "relative",
        top: "-2em"
    },
    statBox: {
        ...Styles.flexColumn,
        width: "50%",
        alignContent: "center",
        alignItems: "center"
    },
    statBoxTitle: {
        fontSize: "2em",
        textAlign: "center",
        color: Colors.accentBlue,
        margin: "0 .5em 0 0",
        padding: 0,
    },
    statBoxText: {
        width: "100%",
        textAlign: "center",
        margin: 0,
        padding: 0,
        color: Colors.textGray,
        fontWeight: 250,
        marginBottom: ".5em",
        fontSize: ".8em"
    },
    actionButton: {
        position: "relative",
        top: "-2em"
    },
    topSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "24vw",
        padding: ".5em",
        paddingLeft: "1em",
        borderBottom: `solid 2px ${Colors.lightgray}`
    },
    bottomSection: {
        ...Styles.flexColumn,
        position: "relative",
        width: "100%",
        alignItems: "flex-start",
        "& > button": {
            position: "relative",
            right: 0
        }
    },
    bottomText: {
        fontSize: "1em",
        margin: ".5em",
        textAlign: "right",
    },
    milestone: {
        width: "85%",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between"
    },
    timeline: {
        margin: "0 1em 0 1em",
        boxSizing: "border-box",
        display: "flex",
        width: "100%",
        "& > button": {
            marginLeft: "auto"
        },
        "& > .preview":{
            width: "70%",
            padding: ".5em"
        }
    },
    timelineHeader:{
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        margin: "1em 0 1em 0",
        "& > h2": {
            marginLeft: "1em",
            fontSize: "1em",
            textTransform: "capitalize",
            fontWeight:"bold",
        },
        "& >  button":{
            marginLeft: "auto",
            marginRight: "1em"
        }
    }

})


export default ProgressGraph;
