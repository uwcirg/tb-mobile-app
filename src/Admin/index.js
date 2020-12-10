import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';
import AddOrganization from './AddOrganization';
import TopBar from './TopBar'
import Summary from './TrialSummary'
import PhotoSummary from './PhotoSummary';
import SiteSummary from './SiteSummary';

const useStyles = makeStyles({
   dashboardContainer:{
    padding: "1em",
    marginTop: "50px"
   }
})

const AdminHome = observer(() => {

    const { adminStore, loginStore } = useStores();
    const classes = useStyles();

    useEffect(() => {
       adminStore.getDashboardData();
    }, [])

    return (
        <div className={classes.dashboardContainer}>
            <TopBar />
            <Summary />
            <SiteSummary />
            <PhotoSummary />

          {/*  <div className={classes.cardContainer}>
                {adminStore.sites && adminStore.sites.map(each => {
                    return (<Card className={classes.organization}>
                        <Typography className={classes.title} variant="h2">{each.title}</Typography>
                        <p>{each.id}</p>
                    </Card>)
                })}

                <AddOrganization /> 
            </div>
            */}
        </div>)

});

export default AdminHome;