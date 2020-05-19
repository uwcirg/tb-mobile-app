import React from 'react';
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
import ChevronRight from '@material-ui/icons/ChevronRight'

import { MileStone } from '../Progress/Milestones'


const ProgressGraph = observer((props) => {
    const classes = useStyles();
    const { patientStore, patientUIStore, } = useStores();
    const dayValue = (patientStore.daysSinceTreatmentStart / 180) * 100;
    const { t, i18n } = useTranslation('translation');

    return (
        <InteractionCard upperText={t("patient.home.cardTitles.myProgress")}>
            <div className={classes.container}>
                <div className={classes.topSection}>
                    <div className={classes.graph}>
                        <CircularProgressbar circleRatio={0.5} value={dayValue} styles={buildStyles({
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                            pathColor: Colors.accentBlue,
                            rotation: 3 / 4,
                            strokeLinecap: "round"
                        })}>
                            <p className={classes.progressText}>{patientStore.daysSinceTreatmentStart} {t("commonWords.of")} <br /> 180 {t('time.days')}</p>
                        </CircularProgressbar>
                    </div>
                    <StatBox title={`4`} text={t('patient.home.progress.currentStreak')} />
                </div>
            </div>
            <div className={classes.bottomSection}>
                <h2>{t("patient.home.progress.upcomingDate")}</h2>
            </div>

            <div className={classes.milestone}>
                {patientStore.milestones[0] && <MileStone milestone={patientStore.milestones[0]} />}
                <ClickableText onClick={patientUIStore.goToProgress} className={classes.bottomText} hideIcon text={<>{t("patient.home.progress.viewAll")}</>} />
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
        width: "100%",
        alignItems: "flex-start",
        "& > h2": {
            fontSize: "1em",
            marginLeft: "5%",
            marginBottom: "1em",
            textTransform: "capitalize"
        }
    },
    bottomText: {
        fontSize: "1em",
        margin: ".5em",
        textAlign: "right",
    },
    milestone:{
        width: "85%",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between"
    }

})


export default ProgressGraph;
