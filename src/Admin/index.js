import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react'
import TopBar from './TopBar'
import Summary from './TrialSummary'
import PhotoSummary from './PhotoSummary';
import SiteSummary from './SiteSummary';
import Patients from './Patients';

const useStyles = makeStyles({
   dashboardContainer:{
    padding: "1em",
    marginTop: "50px"
   }
})

const AdminHome = observer(() => {

    const { adminStore, uiStore } = useStores();
    const classes = useStyles();
    const [a,setA] = useState(1);

    useEffect(() => {
       adminStore.getDashboardData();
    }, [])

    return (
        <div className={classes.dashboardContainer}>
            <TopBar />
            {uiStore.router.location.pathname === "/patients"? <Patients /> :<>
            <Summary />
            <SiteSummary />
            <PhotoSummary />
            </>}

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
        </div>
        )

});

export default AdminHome;