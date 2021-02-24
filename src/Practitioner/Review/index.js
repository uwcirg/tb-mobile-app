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
import Sorting from './Sorting'
import Button from '@material-ui/core/ButtonBase';
import Badge from '@material-ui/core/Badge'
import Photos from './Photos'

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
        width: "100%",
        margin: "auto",
        paddingTop: "2em"
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
            border: "solid 1px gray",
            borderBottom: "none",


        },
        "& > span > .MuiBadge-badge": {
            backgroundColor: Colors.red,
            color: "white"
        }
    },
    main: {
        paddingTop: "24px",
        borderRadius: "8px",
        padding: "1em 1em 1em 2em",
        backgroundColor: "#F7F7F7"
    },
    offTab: {
        backgroundColor: "#ECECEC !important",
        color: Colors.textGray,
        border: "solid 1px lightgray !important"
    },
    top: {
        paddingLeft: "2em"
    },
    tools:{
        display: "flex",
        width: "100%",
        "& > div:first-of-type":{
            marginRight:"1em",
        }
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
    const { cohortStore, practitionerStore } = useStores();

    useEffect(() => {
            //cohortStore.getPatients();
    }, [practitionerStore.organizationID])


    const fetchData = () => {
        practitionerStore.getMissingPhotos();
        practitionerStore.getSeverePatients();
        practitionerStore.getPhotoReports();
        practitionerStore.getMissingPatients();
        practitionerStore.getSupportRequests();
    }

    useEffect(fetchData, []);

    const numberOfPhotos = practitionerStore.filteredPatients.photo && practitionerStore.filteredPatients.photo.length;


    return (
        <div className={classes.reviewSuperContainer}>
            <div className={classes.reviewContainer}>
                <div className={classes.top}>
                    {/* <Date /> */}
                    <Dashboard />
                </div>

                <div className={classes.tabs}>
                    <Button className={`${onPhotos && classes.offTab}`} onClick={() => { setOnPhotos(false) }}>Patients</Button>
                    <Badge badgeContent={numberOfPhotos}>
                        <Button className={`${!onPhotos && classes.offTab}`} onClick={() => { setOnPhotos(true) }}>Review Test Strips</Button>
                    </Badge>
                </div>

                <div className={classes.main}>
                    {onPhotos ? <div>
                        <Subtitle>Photos ({numberOfPhotos})</Subtitle>
                        <Photos />
                    </div> :
                        <>
                            <Subtitle>Patients (<NumberOfPatients />)</Subtitle>
                            <div className={classes.tools}>
                                <Filters />
                                <Sorting />
                            </div>
                            <PatientList />
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