import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    halfCircle: {
        width: "100%",
        height: "120px",
        overflow: "hidden",
    },
    dialText: {
        "& > span": {
            display: "block",
            width: "100%",
            fontSize: "2em",
            textAlign: "center",
            marginBottom: 0
        },
        "& > p": {
            margin: 0,
            marginTop: ".5em",
            display: "block",
            width: "100%"
        },
        position: "relative",
    },
    visContainer: {
        marginTop: "1em",
        flexBasis: "40%",
        textAlign: "center",
    },
    container: {
        width: "100%",
        display: "flex"
    },
    key:{
        marginLeft: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"

    },
    keyItem:{
        display: "flex",
        alignItems: "center",
        marginTop: ".5em",
        "& > p": {
            margin: 0,
            marginLeft: ".5em"
        }
    },
    circle:{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: props => props.color
    }

})


const Submitted = observer(() => {
    const classes = useStyles();
    const { practitionerStore } = useStores();
    const { t, i18n } = useTranslation('translation'); 
    const percentage = Math.round(((practitionerStore.totalReported / (practitionerStore.patientList.length || 1)) * 100)).toString()

    return (
        <div className={classes.container}>
            <div className={classes.visContainer}>
                {percentage > 0 ? <div className={classes.halfCircle}>
                    <CircularProgressbarWithChildren
                        value={(practitionerStore.totalReported / practitionerStore.patientList.length) * 100}
                        circleRatio={.5}
                        strokeWidth={8}
                        styles={buildStyles({
                            rotation: 3 / 4,
                            pathColor: Colors.yellow,
                            trailColor: "#eee",
                            strokeLinecap: "butt"
                        })}
                    >

                        {/* Foreground path */}
                        <CircularProgressbarWithChildren
                            circleRatio={.5}
                            strokeWidth={8}
                            value={(practitionerStore.resolutionSummary.takenMedication / practitionerStore.patientList.length) * 100}
                            styles={buildStyles({
                                rotation: 3 / 4,
                                pathColor: Colors.green,
                                trailColor: "transparent",
                                strokeLinecap: "butt"
                            })}
                        > <div className={classes.dialText}>
                                <span>{percentage}%</span>
                                <p>{t('coordinator.tasksSidebar.submitted')} <br /> {t('patient.home.today')}</p>
                            </div> </CircularProgressbarWithChildren>
                    </CircularProgressbarWithChildren>
                </div> : t('coordinator.tasksSideBar.noneYet')}
            </div>
            <div className={classes.key}>
                <KeyItem color={Colors.green} text={t('coordinator.tasksSidebar.taken')} />
                <KeyItem color={Colors.yellow} text={t('coordinator.tasksSidebar.notTaken')} />
            </div>
        </div>
    )

})

const KeyItem = (props) => {

    const classes = useStyles(props);

    return <div className={classes.keyItem}>
        <div className={classes.circle} />
        <p>{props.text}</p>
    </div>
}

export default Submitted;