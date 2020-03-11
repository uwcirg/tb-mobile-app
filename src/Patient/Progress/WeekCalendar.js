import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {DateTime,Interval} from 'luxon'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { Typography, Grid, Container } from '@material-ui/core';
import Calendar from '@material-ui/icons/Event';
import Dot from '@material-ui/icons/FiberManualRecord';
import useStores from '../../Basics/UseStores';


const useStyles = makeStyles({
    container:{
        marginBottom: "1em",
        backgroundColor: "white",
        paddingBottom: ".5em"
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
    }
  
})

const WeekCalendar = () => {

    const classes = useStyles();

    return(<div className={classes.container}>
        <Grid className={classes.monthContainer} container direction="row" justify="flex-end" alignItems="center">
            <Typography className={classes.month} variant="h2" >{DateTime.local().monthLong}</Typography>
            <Calendar size="1.5em" />
        </Grid>
        <Days />
    </div>)

}


function Days(){

    const classes = useStyles();
    const {patientStore,uiStore} = useStores();

    let list = []
    for(let i = 4; i >= 0; i--){
        const today = i == 0;
        const date = DateTime.local().minus({days: i})
        const component = (
            //TODO Add Patient Data
            <div 
                className={`${classes.day} ${today && classes.today} ${i==3 && classes.missedDay}`}
                onClick={() => {
                    if(today){
                        uiStore.onTreatmentFlow = true;
                    }
                }}
                
                >
                <p>{date.weekdayShort}</p>
                <p>{date.day}</p>
                {i==3 && <Dot className={classes.dot} />}
            </div>
        )
        list.push(component)
    }

    return(<div className={classes.week}>{list}</div>)
}

export default WeekCalendar;