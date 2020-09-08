import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import { DateTime } from 'luxon';
import Dashboard from './Dashboard'
import Subtitle from './Subtitle'
import Typography from '@material-ui/core/Typography'
import Table from './Table'
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    table:{
        width: "100%",
        height: "50vh"
    },
    date:{
        fontSize: "1.5em",
        fontWeight: "bold",
        padding: "1em 0 2em 0"
    },
    reviewContainer:{
        width: "95%",
        margin: "auto"
    },
    reviewSuperContainer:{
        width: "100%",
        backgroundColor: "#F2F2F2",
        height: "100vh",
        overflow: "scroll"
    }
  
})

const NumberOfPatients = observer(() => {
    const {dashboardStore} = useStores();
    return(
        <>{dashboardStore.patientList.length}</>
    )
})

const Review = () => {
    //Pull in data
    //Table Layout
   
    const classes = useStyles();
    const {dashboardStore,practitionerStore} = useStores();

    useEffect(()=>{
        dashboardStore.getPatients(practitionerStore.organizationID);
    },[])

    return(
        <div className={classes.reviewSuperContainer}>
    <div className={classes.reviewContainer}>
        <Date />
        <Dashboard />
        <Subtitle>Patients To Review (<NumberOfPatients />)</Subtitle>
        <Table />
        <Subtitle>Reviewed Patients</Subtitle>
        <Table />
    </div>
    </div>)

}

const Date = () => {
    const classes = useStyles();
    return(
            <Typography className={classes.date} variant="h2">{DateTime.local().toLocaleString(DateTime.DATE_FULL)}</Typography>
    )
}


export default Review;