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

    return(<div className={classes.container + ' intro-weekcalendar'}>
        {/* rerender when language changes*/uiStore.locale && <span></span>}
        <Grid className={classes.monthContainer} container direction="row" justify="flex-end" alignItems="center">
            <Typography className={classes.month} variant="h2" >{DateTime.local().monthLong}</Typography>
            <Calendar size="1.5em" />
        </Grid>
        <Days />
        <ClickableText onClick={() => {patientStore.uiState.onCalendarView = true}} className={classes.clickableText} hideIcon text={t("patient.progress.viewCalendar")} />
    </div>)
});

function Days(){

    const classes = useStyles();
    const {patientStore} = useStores();

    let list = []
    for(let i = 4; i >= 0; i--){
        const today = i == 0;
        const date = DateTime.local().minus({days: i})
        const component = (
            //TODO Add Patient Data
            <div 
                key={`week-calendar-${date.weekdayShort}`}
                className={`${classes.day} ${today && classes.today} ${i==3 && classes.missedDay}`}
                onClick={() => {
                    if(today){
                        patientStore.uiState.onTreatmentFlow = true;
                    }else{
                        patientStore.uiState.onCalendarView = true;
                    }
                }}>
                <p>{date.weekdayShort}</p>
                <p>{date.day}</p>
                {i==3 && <Dot className={classes.dot} />}
            </div>
        )
        list.push(component)
    }

    return(<div className={classes.week}>{list}</div>)
}

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
    today:{
        color: "white",
        backgroundColor: Colors.buttonBlue
    },
    missedDay:{
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
    }
  
})

export default WeekCalendar;