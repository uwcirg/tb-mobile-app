import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'
import Styles from '../../Basics/Styles';
import Trend from '@material-ui/icons/TrendingUp';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';

import { CircularProgressbarWithChildren as CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const useStyles = makeStyles({
    container:{
        flexGrow: 0,
        backgroundColor: "white",
        "& > h2":{
            padding: "1em 0 0 1em"
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
    }

})

const TreatmentStatus = observer((props) => {

    const patient = useStores().practitionerStore.selectedPatient.details;
    const classes = useStyles();

    return (<div className={classes.container}>
        <Typography variant={"h2"}>Treatment Status</Typography>
        <Adherence value={patient.adherence} />
        <div className={classes.middle}>
            <Item top={"80%"} bottom={"Feeling Healthy"} />
            <Item top={"0 out of 5"} bottom={"Contact Traces"} />
        </div>
        <div className={classes.bottom}>
            <Item top={`${patient.daysInTreatment}/180`} bottom={"Days Completed"} />
            {/*<Item top={<><Trend style={{color: Colors.green}} />90/180</>} bottom={"Days Completed"} />*/}
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
                                <span>{(props.value || 0) * 100}%</span>
                                <p>Adherence</p>
                            </div> 
                        </CircularProgressbar>
                    </div>
    )
}

export default TreatmentStatus;