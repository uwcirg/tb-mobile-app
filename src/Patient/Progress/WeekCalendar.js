import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {DateTime} from 'luxon'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { Typography, Grid, Container } from '@material-ui/core';
import Calendar from '@material-ui/icons/Event';
import Dot from '@material-ui/icons/FiberManualRecord';
import useStores from '../../Basics/UseStores';
import ClickableText from '../../Basics/ClickableText';
import { observer } from 'mobx-react';
import {useTranslation} from 'react-i18next'

const WeekCalendar = observer(() => {

    const classes = useStyles();
    const {patientStore,uiStore} = useStores();
    const {t, i18n} = useTranslation('translation');

    const goToCalendar = () => {
        patientStore.uiState.onCalendarView = true;
    }

    return(<div className={classes.container + ' intro-weekcalendar'}>
        {/* rerender when language changes*/ uiStore.locale && <span></span>}
        <Grid onClick={goToCalendar} className={classes.monthContainer} container direction="row" justify="flex-end" alignItems="center">
            <Typography className={classes.month} variant="h2" >{DateTime.local().monthLong}</Typography>
            <Calendar size="1.5em" />
        </Grid>
        <Days />
        <ClickableText onClick={goToCalendar} className={classes.clickableText} hideIcon text={t("patient.progress.viewCalendar")} />
    </div>)
});

const Days = observer(() => {

    const classes = useStyles();
    const {patientStore,uiStore} = useStores();

    let list = []
    for(let i = 4; i >= 0; i--){
        const today = i == 0;
        const date = DateTime.local().minus({days: i})

        const report = patientStore.savedReports[`${date.startOf('day').toISODate()}`]

        const missedDay = (report && report.medicationTaken == false );
        const disabled = date.startOf('day') <= (DateTime.fromISO(patientStore.treatmentStart).startOf('day'));

        const component = (
            
            <div 
                key={`week-calendar-${date.weekdayShort}`}
                className={`${classes.day} 
                ${today && !patientStore.dailyActionsCompleted && classes.today} 
                ${missedDay && classes.didntTake}
                ${disabled && classes.disabled}
                ${!report && classes.didntReport}
                `}
                
                onClick={() => {
                    if(today && !patientStore.dailyActionsCompleted){
                        patientStore.uiState.onTreatmentFlow = true;
                        uiStore.activeTab = 0;

                    }else{
                        patientStore.uiState.onCalendarView = true;
                        patientStore.uiState.selectedCalendarDate = date.startOf('day');
                    }
                }}>
                <p>{date.weekdayShort}</p>
                <p>{date.day}</p>
                {(report && report.medicationTaken == false )&& <Dot className={classes.dot} />}
            </div>
        )
        list.push(component)
    }

    return(<div className={classes.week}>{list}</div>)
});

const useStyles = makeStyles({
    container:{
        marginBottom: "1em",
        backgroundColor: "white",
        paddingBottom: ".5em",
        paddingTop: "1em",
    },
    day:{
        ...Styles.flexColumn,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "15%",
        color: Colors.buttonBlue,
        backgroundColor: Colors.calendarGreen,
        padding: ".5em 0 .75em 0",
        borderRadius: "10px",
        "& > p": {
            padding: 0,
            margin: 0,
            fontSize: ".75em"
        },
        "& > p:nth-child(2)" :{
            marginTop: ".2em",
            fontSize: "1.5em"
        }
    },
    didntTake:{
        backgroundColor: Colors.lightgray
    },
    week:{
        ...Styles.flexRow,
        justifyContent: "space-evenly",
        width: "100vw"
    },
    month:{
        fontSize: "1.5em",
        marginRight: ".5em"
    },
    monthContainer: {
        padding: "0 1em .5em 0"
    },
    dot:{
        fontSize: ".6em",
        color: "red"
    },
    clickableText:{
        fontSize: "1em",
        textAlign: "center",
        display: "block",
        margin: "1em auto .5em auto"
    },
    disabled:{
        backgroundColor: Colors.lightgray,
        color: Colors.gray
    },
    didntReport:{
        backgroundColor: Colors.calendarRed
    },
    today:{
        color: "white",
        backgroundColor: Colors.buttonBlue
    },
  
})

export default WeekCalendar;