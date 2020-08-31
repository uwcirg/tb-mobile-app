import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import { DateTime } from 'luxon';
import Dashboard from './Dashboard'
import Subtitle from './Subtitle'
import Typography from '@material-ui/core/Typography'
import Table from './Table'

const useStyles = makeStyles({
    table:{
        width: "100%",
        height: "50vh"
    },
    date:{
        fontSize: "1.5em",
        fontWeight: "bold",
        margin: "1em 0 2em 0"
    },
    reviewContainer:{
        marginLeft: "2em"
    }
  
})

const Review = () => {

    //Titles 
    //Table Layout
    //Pull in data
    const classes = useStyles();

    return(<div className={classes.reviewContainer}>
        <Date />
        <Dashboard />
        <Subtitle>Patients To Review</Subtitle>
        <Table />
        <Subtitle>Reviewed Patients</Subtitle>
        
    </div>)

}

const Date = () => {
    const classes = useStyles();
    return(
            <Typography className={classes.date} variant="h2">{DateTime.local().toLocaleString(DateTime.DATE_FULL)}</Typography>
    )
}


export default Review;