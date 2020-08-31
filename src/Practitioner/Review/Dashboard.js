import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Subtitle from './Subtitle'
import Submitted from '../Home/SubmittedVisual'

const useStyles = makeStyles({
    dashboard:{
        height: "20vh"
    }

})

const Dashboard = () => {

    const classes = useStyles();

    return(<div className={classes.dashboard}>
        <Subtitle>Dashboard</Subtitle>
        <Submitted />
    </div>)

}

export default Dashboard;