import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Colors from '../Colors';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Down from '@material-ui/icons/KeyboardArrowDown'
import Typography from '@material-ui/core/Typography'
import Styles from '../Styles';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({

    monthContainer: {
        minHeight: "50px",
        display: "flex",
        width: "100%",
        "& > first-child": {
            backgroundColor: "gray"
        }


    },
    line: {
        flexGrow: "1",
        height: "auto",
        borderLeft: `dotted 2px ${Colors.accentBlue}`,
    },
    monthNumber: {
        color: Colors.accentBlue,
        fontSize: "1.5em"
    },
    container: {
        maxWidth: "320px",
        margin: "auto",
        width: "90%"
    },
    panel: {
        width: "100%",
        marginTop: ".5em",
        border: "none",
        borderRadius: "8px",
        boxShadow: "none",
        "&::before": {
            opacity: 0
        }
    },
    panelContainer: {
        marginLeft: "1em",
        flexGrow: "1"

    },
    summary: {
        textTransform: "capitalize",
        "&.Mui-expanded": {
            minHeight: "unset"

        },
        padding: "0 .5em 0 .5em",
        margin: 0,
        "& > .titles": {
            ...Styles.flexColumn
        },
        "& > .MuiExpansionPanelSummary-content": {
            margin: 0
        }, borderRadius: "8px",
        backgroundColor: props => props.backgroundColor || Colors.calendarGreen
    },
    subtitle: {
        fontSize: ".8em",
        color: Colors.textGray,
        textTransform: "capitalize"

    },
    timeline: {
        ...Styles.flexColumn,
        minWidth: "50px",
        maxWidth: "50px",
        alignItems: "center"
    },
    icon: {
        color: Colors.buttonBlue
    },
    monthLabel: {
        fontSize: "1em"
    },
    currentMonth: {
        color: "white",
        borderRadius: "50%",
        ...Styles.flexCenter,
        height: "32px",
        width: "32px",
        backgroundColor: Colors.accentBlue
    },
    details: {
        width: "auto"
    }
})


const Timeline = () => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (<div className={classes.container}>
        <Month first month={0}>
            <Panel title={t('timeline.start')} weekValue={0} week="0" />
            <Panel title="Intensive Phase" weekValue={8} week="0-8" />
        </Month>
        <Month month={1}>
            <Panel title={`${t('commonWords.first')} ${t('timeline.sputumTest')}`} weekValue={8} week="8" />
        </Month>
        <Month month={2} >
            <Panel title={`${t('timeline.sputumTest')}`} weekValue={24} week="8-24" />
        </Month>
        <Month month={3} />
        <Month month={4}>

        </Month>
        <Month month={5} />
        <Month month={6} />
    </div>)

};

const Month = observer((props) => {
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
    let isCurrentMonth = Math.floor((useStores().patientStore.patientInformation.weeksInTreatment < 6 || 6) / 4) === props.month;

    return (
        <>
            <div className={classes.monthContainer}>
                <div className={classes.timeline}>
    {props.first && <div className={`${classes.monthNumber} ${classes.monthLabel}`}>{t('time.month')}</div>}
                    <div className={`${classes.monthNumber} ${isCurrentMonth && classes.currentMonth}`}>{props.month}</div>
                    {props.month !== 6 && <div className={classes.line} />}
                </div>
                <div className={classes.panelContainer}>
                    {props.children}
                </div>
            </div>
        </>)
});

const Panel = observer((props) => {

    const {patientStore} = useStores();

    const styleProps = {backgroundColor: patientStore.patientInformation.weeksInTreatment < props.weekValue ? Colors.lightgray : Colors.calendarGreen}

    const classes = useStyles(styleProps);
    const { t, i18n } = useTranslation('translation');
    return (
        <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
                className={classes.summary}
                expandIcon={<Down className={classes.icon} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div className="titles">
                    <Typography className={classes.title}>{props.title}</Typography>
                    <Typography className={classes.subtitle}>
                        {props.week && <>{t('time.week')} {props.week}</>}
                    </Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
                <Typography>
                    Coming Soon
        </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>)
});

export default Timeline;