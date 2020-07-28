import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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

const Timeline = (props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (<div className={classes.container}>
        <Month weeksInTreatment={props.weeksInTreatment} first month={0}>
            <Panel weeksInTreatment={props.weeksInTreatment} title={t('timeline.start')} weekValue={0} week="0" />
            <Panel weeksInTreatment={props.weeksInTreatment} title={t('timeline.intensive')} weekValue={8} week="0-8" />
        </Month>
        <Month weeksInTreatment={props.weeksInTreatment} month={1}>
            <Panel weeksInTreatment={props.weeksInTreatment} title={`${t('commonWords.first')} ${t('timeline.sputumTest')}`} weekValue={8} week="8" />
        </Month>
        <Month weeksInTreatment={props.weeksInTreatment} month={2} >
            <Panel weeksInTreatment={props.weeksInTreatment} title={`${t('timeline.sputumTest')}`} weekValue={24} week="8-24" />
        </Month>
        <Month weeksInTreatment={props.weeksInTreatment} month={3}>
        <Panel weeksInTreatment={props.weeksInTreatment} title={`${t('timeline.followUp')}`} weekValue={24} noWeek week="Every 2 Months" />
        </Month>
        <Month month={4}>
        <Panel weeksInTreatment={props.weeksInTreatment} title={`${t('commonWords.second')} ${t('timeline.sputumTest')}`} weekValue={24} noWeek week="During Continuous Phase" />
        </Month>
        <Month weeksInTreatment={props.weeksInTreatment} month={5} />
        
        <Month weeksInTreatment={props.weeksInTreatment} month={6}>
        <Panel weeksInTreatment={props.weeksInTreatment} title={`${t('commonWords.final')} ${t('timeline.sputumTest')}`} weekValue={24} week="24" />
        <Panel weeksInTreatment={props.weeksInTreatment} title={t('timeline.end')} weekValue={24} week="24" />
            </Month>
    </div>)

};

const Month = (props) => {
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
    let isCurrentMonth = Math.floor(props.weeksInTreatment / 4) === props.month;

    return (
        <>
            <div className={classes.monthContainer}>
                <div className={classes.timeline}>
    {props.first && <div className={`${classes.monthNumber} ${classes.monthLabel}`}>{t('time.month')}</div>}
                    <div className={`${classes.monthNumber} ${isCurrentMonth && classes.currentMonth}`}>{props.month}</div>
                    <div className={classes.line} />
                </div>
                <div className={classes.panelContainer}>
                    {props.children}
                </div>
            </div>
        </>)
};

const Panel = (props) => {

    const styleProps = {backgroundColor: props.weeksInTreatment === props.weekValue ? Colors.timelineYellow : props.weeksInTreatment < props.weekValue ? Colors.lightgray : Colors.calendarGreen}

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
                        {props.week && <>{!props.noWeek && t('time.week')} {props.week}</>}
                    </Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
                <Typography>
                    Coming Soon
        </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>)
};

export default Timeline;