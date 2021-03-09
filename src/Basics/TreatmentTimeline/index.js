import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../Colors';
import Styles from '../Styles';
import { useTranslation } from 'react-i18next';
import raw from "raw.macro";
import Event from './Event'
import Typography from '@material-ui/core/Typography';

const TimelineData = JSON.parse(raw("../../Content/Timeline.json"));

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
    },
    panelContainer: {
        flexGrow: "1",
        padding: "0 .5em",
        borderRadius: "8px"

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
        fontSize: "1em",

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
    },
    monthPreview: {
        textAlign: "center"
    },
    currentMonthBackground: {
        border: `solid 2px ${Colors.transparentBlueAccent}`,
        margin: ".5em 0",
        padding: ".5em"
    },
    location: {
        margin: 0,
        padding: 0
    }
})

const Timeline = (props) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<div className={classes.container}>

        {TimelineData.months.map((item, index) => {
            const computedMonth = props.weeksInTreatment / 4;
            return (<Month
                showLabel={index === 0}
                isCurrentMonth={computedMonth === index}
                month={index}>
                {item.map((each) => {
                    return (
                        <>
                            <Event
                                tense={index - computedMonth}
                                weeksInTreatment={props.weeksInTreatment}
                                title={t(`timeline.${each.title}`)}
                                subtitle={each.subtitle ? t(`timeline.${each.subtitle}`) : ""}
                            /></>)
                })}
            </Month>)
        })}
    </div>)

};

const Month = (props) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (
        <>
            <div className={classes.monthContainer}>
                <div className={classes.timeline}>
                    {props.showLabel && <div id="month-label" className={`${classes.monthNumber} ${classes.monthLabel}`}>{t('time.month')}</div>}
                    <div className={`${classes.monthNumber} ${props.isCurrentMonth && classes.currentMonth}`}>{props.month}</div>
                    <div className={classes.line} />
                </div>
                <div className={`${classes.panelContainer} ${props.isCurrentMonth && classes.currentMonthBackground}`}>
                    {props.isCurrentMonth && <Typography variant="body1" className={classes.location}>{t('timeline.here')} 📍</Typography>}
                    {props.children}
                </div>
            </div>
        </>)
};

const MonthPreview = (props) => {
    const classes = useStyles();
    const { t } = useTranslation('translation');

    //Default to the last month if a patient remains in treatment
    const monthNumber = props.month <= 6 ? props.month : 6

    return (
        <>
            <div className={`${classes.monthPreview} monthPreview`}>
                <div className={`${classes.monthNumber} ${classes.monthLabel}`}>{t('time.month')}</div>
                <div className={`${classes.monthNumber}`}>{props.month}</div>
            </div>
            <div className={`${classes.panelContainer} ${props.isCurrentMonth && classes.currentMonthBackground}`}>
                {TimelineData.months[monthNumber].map((each) => {
                    return (
                        <>
                            <Event
                                tense={0}
                                weeksInTreatment={props.weeksInTreatment}
                                title={t(`timeline.${each.title}`)}
                                subtitle={each.subtitle ? t(`timeline.${each.subtitle}`) : ""}
                            /></>)
                })}
            </div>
        </>
    )
}

export default Timeline;
export { MonthPreview };