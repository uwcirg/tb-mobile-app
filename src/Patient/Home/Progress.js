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
import TreatmentTimeline, { MonthPreview } from '../../Basics/TreatmentTimeline'
import Event from '../../Basics/TreatmentTimeline/Event'
import Typography from '@material-ui/core/Typography';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Down from '@material-ui/icons/KeyboardArrowDown';
import Up from '@material-ui/icons/KeyboardArrowUp';


const ProgressGraph = observer((props) => {
    const classes = useStyles();
    const [showTimeline, setShowTimeline] = useState(false);
    const { patientStore } = useStores();
    const dayValue = (patientStore.patientInformation.daysInTreatment / 180) * 100;
    const { t } = useTranslation('translation');

    const toggleExpand = () => {
        setShowTimeline(!showTimeline)
    }

    return (
        <InteractionCard id="intro-progress-card" upperText={<><TrendingUpIcon /> {t("patient.home.cardTitles.myProgress")}</>}>
            <div className={classes.container}>
                <div className={classes.topSection}>
                    <div className={classes.graph}>
                        <CircularProgressbar circleRatio={0.5} value={dayValue} styles={buildStyles({
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                            pathColor: Colors.accentBlue,
                            rotation: 3 / 4,
                            strokeLinecap: "round"
                        })}>
                            <p className={classes.progressText}><span>{patientStore.patientInformation.daysInTreatment}</span> {t('time.days')}</p>
                        </CircularProgressbar>
                    </div>
                    <StatBox title={patientStore.getCurrentStreak} text={t('patient.home.progress.currentStreak')} />
                </div>
            </div>
            <div className={classes.bottomSection}>
                <div className={classes.timelineHeader}>
                    <Typography variant="h2">{t('timeline.title')}</Typography>
                    <ClickableText onClick={toggleExpand} hideIcon 
                    text={<>{showTimeline ? t('patient.home.progress.close') : t('patient.home.progress.viewAll')} {showTimeline ? <Up />:<Down />}</>} />
                </div>
                <div className={classes.timeline}>
                    {!showTimeline ?
                        <>
                            <span>{t('timeline.here')} 📍</span>
                            <div className="preview">
                                <MonthPreview month={Math.floor(patientStore.patientInformation.weeksInTreatment / 4)} />
                                <Event weeksInTreatment={props.weeksInTreatment} title={`${t('timeline.followUp')}`} weekValue={24} noWeek week={t("timeline.twoMonths")} />
                            </div></> :
                        <>
                            <br />
                            <TreatmentTimeline weeksInTreatment={patientStore.patientInformation.weeksInTreatment} />
                        </>
                    }
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
        fontSize: "100%",
        width: "90%",
        "& > span": {
            fontSize: "1.75em",
            fontWeight: "bold"
        }
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
        margin: "0",
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
        boxSizing: "border-box",
        width: "100%",
        paddingBottom: ".5em",
        "& > span": {
            display: "block",
            fontSize: ".8em",
            color: Colors.textGray,
            margin: "0 0 1em 5%",
            padding: 0
        },
        "& > button": {
            marginLeft: "auto"
        },
        "& > .preview": {
            display: "flex",
            alignItems: "flex-start",
            width: "90%",
            padding: "0 1em 0 1em",
            "& > .monthPreview": {
                marginRight: "1em"
            },
            "& > div:nth-of-type(2)": {
                marginTop: 0
            }
        }
    },
    timelineHeader: {
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        margin: "1em 0 0 0",
        "& > h2": {
            marginLeft: "1em",
            fontSize: "1em",
            textTransform: "capitalize",
            fontWeight: "bold",
        },
        "& >  button": {
            marginLeft: "auto",
            marginRight: "1em"
        }
    },
    container: {
        borderBottom: `solid 2px ${Colors.lightgray}`
    },
    motivationalText: {
        width: "90%",
        display: "flex",
        justifyContent: "center",
        fontSize: "1em",
        color: Colors.textDarkGray,
        "& > p":{
            textAlign: "left"
        },
        margin: "auto",
        marginBottom: "1em"
    }

})


export default ProgressGraph;
