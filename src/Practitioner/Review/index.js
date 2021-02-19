import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { DateTime } from 'luxon';
import Dashboard from './Dashboard'
import Subtitle from './Subtitle'
import Typography from '@material-ui/core/Typography'
import Table from './Table'
import Colors from '../../Basics/Colors';
import PatientList from './Patients/'
import Filters from './Filters'
import Button from '@material-ui/core/ButtonBase';
import Badge from '@material-ui/core/Badge'

const useStyles = makeStyles({
    table: {
        width: "100%",
        height: "50vh"
    },
    date: {
        fontSize: "1.5em",
        fontWeight: "bold",
        padding: "1em 0 2em 0"
    },
    reviewContainer: {
        width: "98%",
        margin: "auto"
    },
    reviewSuperContainer: {
        width: "100%",
        backgroundColor: "#e4e5e4",
        height: "100vh",
        overflow: "scroll"
    },
    tabs: {
        "& > button, & > span > button": {
            marginLeft: ".5em",
            fontSize: "1.5em",
            padding: ".5em .75em .25em .75em",
            borderRadius: "8px 8px 0 0",
            backgroundColor: "#F7F7F7",
            color: Colors.textDarkGray,
        },
        "& > span > .MuiBadge-badge": {
            backgroundColor: Colors.red,
            color: "white"
        }
    },
    main: {
        paddingTop: "24px",
        borderRadius: "8px",
        padding: "1em",
        backgroundColor: "#F7F7F7"
    },
    offTab: {
        backgroundColor: "#ECECEC !important",
        color: Colors.textGray
    }

})

const NumberOfPatients = observer(() => {
    const { practitionerStore } = useStores();
    return (
        <>{practitionerStore.patientList.length}</>
    )
})

const Review = observer(() => {

    const classes = useStyles();
    const [onPhotos, setOnPhotos] = useState(false);
    const { dashboardStore, practitionerStore } = useStores();

    useEffect(() => {
        if (practitionerStore.organizationID > -1) {
            dashboardStore.getPatients(practitionerStore.organizationID);
        }
    }, [practitionerStore.organizationID])


    const fetchData = () => {
        practitionerStore.getMissingPhotos();
        practitionerStore.getSeverePatients();
        practitionerStore.getPhotoReports();
        practitionerStore.getMissingPatients();
        practitionerStore.getSupportRequests();
    }

    useEffect(fetchData, []);


    return (
        <div className={classes.reviewSuperContainer}>
            <div className={classes.reviewContainer}>
                <Date />
                <Dashboard />
                <div className={classes.tabs}>
                    <Button className={`${onPhotos && classes.offTab}`} onClick={() => { setOnPhotos(false) }}>Patients</Button>
                    <Badge color="badge" badgeContent={3}>
                        <Button className={`${!onPhotos && classes.offTab}`} onClick={() => { setOnPhotos(true) }}>Review Test Strips</Button>
                    </Badge>
                </div>

                <div className={classes.main}>
                    {onPhotos ? <div><Subtitle>Photos (<NumberOfPatients />)</Subtitle> </div> :
                        <>
                            <Subtitle>Patients (<NumberOfPatients />)</Subtitle>
                            <Filters />
                            <PatientList />
                            <p>* For now this is limited to 5 patients for easy testing</p>
                        </>}</div>
            </div>
        </div>)

});


const Date = () => {
    const classes = useStyles();
    return (
        <Typography className={classes.date} variant="h2">{DateTime.local().toLocaleString(DateTime.DATE_FULL)}</Typography>
    )
}

export default Review;