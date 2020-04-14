import React from 'react';
import { observer } from 'mobx-react'
import useStores from '../../Basics/UseStores'
import { CircularProgressbarWithChildren as CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { makeStyles } from '@material-ui/core/styles'
import Styles from '../../Basics/Styles';
import InteractionCard from './InteractionCard';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';


const ProgressGraph = observer((props) => {
    const classes = useStyles();
    const { patientStore } = useStores();
    const dayValue = (patientStore.daysSinceTreatmentStart / 180) * 100;
    const { t, i18n } = useTranslation('translation');
    t("patient.profile.startDate")

    return (
        <InteractionCard upperText={t("patient.home.cardTitles.myProgress")}>
            <div className={classes.graph}>
                <CircularProgressbar circleRatio={0.5} value={dayValue} styles={buildStyles({
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    pathColor: Colors.accentBlue,
                    rotation: 3 / 4,
                    strokeLinecap: "round"
                })}>
                    <p className={classes.progressText}>{patientStore.daysSinceTreatmentStart} of <br /> 180 {t('time.days')}</p>
                </CircularProgressbar>
            </div>
            <div className={classes.stats}>
                <StatBox title={`4 ${t('time.days')}`} text={t('patient.home.progress.currentStreak')} />
                <StatBox title='Feb 28' text={t('patient.home.progress.nextCheckin')} />
                <StatBox title='Oct 2' text={t('patient.home.progress.endDate')}/>
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
        margin: "auto",
        maxWidth: "200px"
    },
    stats: {
        ...Styles.flexRow,
        justifyContent: "flex-end",
        position: "relative",
        top: "-2em"
    },
    statBox: {
        ...Styles.flexColumn,
        width: "28vw",
        alignContent: "center",
        alignItems: "center",
        "&:first-child": {
            borderRight: `1px solid ${Colors.gray}`
        },
        "&:last-child": {
            borderLeft: `.5px solid ${Colors.gray}`
        }
    },
    statBoxTitle: {
        fontSize: "1em",
        textAlign: "center",
        color: Colors.accentBlue,
        margin: "0 0 .5em 0",
        padding: 0,
    },
    statBoxText: {
        width: "80%",
        textAlign: "center",
        margin: 0,
        padding: 0,
        color: Colors.textGray,
        fontWeight: 250
    },
    actionButton: {
        position: "relative",
        top: "-2em"
    }

})


export default ProgressGraph;
