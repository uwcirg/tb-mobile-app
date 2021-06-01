import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';

import { CircularProgressbarWithChildren as CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    container:{
        flexGrow: 0,
        backgroundColor: "white",
        "& > h2":{
            padding: "1em",
            overflow: "wrap"
            
        }
    },
    middle: {
        ...Styles.flexRow,
        flexShrink: 0,
        borderTop: "solid 1px lightgray",
        borderBottom: "solid 1px lightgray",
        "& > div:first-of-type":{
            borderRight: "solid 1px lightgray"
        }
    },
    bottom: {

        ...Styles.flexColumn,
        alignItems: "center",
        flexShrink: 0,
    },
    graph:{
        flexShrink: 0,
        height: "150px",
        overflow: "hidden",
        width: "60%",
        maxWidth: "200px",
        position: "relative",
        top: "1.5em",
        margin: "auto"
    },
    item:{
        flexShrink: 0,
        ...Styles.flexColumn,
        flexGrow: "1",
        padding: "1em",
        alignItems: "center",
        "& > span":{
            fontWeight: "bold",
        },
        "& > p":{
            margin: 0,
        }
    },
    visText:{
        position: 'relative',
        top: "-1em",
        ...Styles.flexColumn,
        alignItems: "center",
        "& > span":{
            margin: 0,
            fontWeight: "bold",
            fontSize: "1.75em"
        },
        "& > p":{
            margin: 0,
            padding: 0
        }
    },
    tst:{
        position: "relative",
        width: "90%",
        margin: "auto",
        height: "50px",
        "& > div.MuiLinearProgress-colorPrimary:first-of-type":{
            backgroundColor: "unset"
        },
        "& div:first-of-type > .MuiLinearProgress-barColorPrimary":{
            backgroundColor: "red"
        }
    }

})

const TreatmentStatus = observer((props) => {

    const { t, i18n } = useTranslation('translation');
    const patient = useStores().patientProfileStore.selectedPatient.details;
    const classes = useStyles();

    return (<div className={classes.container}>
        <Typography variant={"h2"}>{t('coordinator.patientProfile.treatmentStatus')}</Typography>
        <Adherence value={patient.adherence} />
        <div className={classes.middle}>
            {/* <Item top={"100%"} bottom={t('coordinator.patientProfile.feelingWell')} />
            <Item top={"0 out of 5"} bottom={t('coordinator.patientProfile.contactTracing')} /> */}
        </div>
        <div className={classes.bottom}>
            <Item top={`${patient.daysInTreatment}/180`} bottom={t('coordinator.patientProfile.completedDays')} />
        </div>
        <div className={classes.tst}>
            <LinearProgress style={{position: "absolute", top: "10px", width: "100%", zIndex: 1}}  variant={"determinate"} value={20} />
            <LinearProgress style={{position: "absolute", top: "10px", width: "100%", zIndex: 0}}  variant={"determinate"} value={40} />
        </div>
    </div>)

});

const Item = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.item}>
            <span>{props.top}</span>
            <p>{props.bottom}</p>
        </div>
    )
}

const Adherence = (props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    return(
        <div className={classes.graph}>
                        <CircularProgressbar
                        strokeWidth={6}
                         circleRatio={0.5} value={(props.value || 0) * 100} styles={buildStyles({
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                            pathColor: Colors.blue,
                            rotation: 3 / 4,
                            strokeLinecap: "round",
                            
                        })}>
                            <div className={classes.visText}>
                                <span>{String((props.value || 0) * 100).substr(0,4)}%</span>
                                <p>{t('coordinator.adherence')}</p>
                            </div> 
                        </CircularProgressbar>
                    </div>
    )
}

export default TreatmentStatus;