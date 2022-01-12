import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';
import Grid from '@material-ui/core/Grid'
import { Box, ButtonBase, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AspectRatioIcon from '@material-ui/icons/ZoomOutMap';
import PhotoStatus from '../../Components/PhotoStatus';
import { DateTime } from 'luxon';
import Tag from '../../Components/Tag';
import { Timelapse } from '@material-ui/icons';
import PatientInformationAPI from '../../API/PatientInformationAPI';


const useStyles = makeStyles({
    container: {
        padding: "0 .5em"
    },
    photo: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: ".5em",
        backgroundColor: Colors.lightgray,
        height: "75px",
        width: "75px",
        backgroundSize: "fill",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        border: "none",
        borderRadius: "4px",
        flexShrink: 0,
    },
    item: {
        padding: ".5em",
        backgroundColor: Colors.lighterGray,
        boxSizing: "border-box",
        borderRadius: "4px",
    },
    title: {
        fontSize: "1.25em",
        padding: ".5em 0"
    },
    expandIcon: {
        fontSize: "1.25em",
        color: "white"
    },
    date: {
        display: "block",
        fontSize: ".8em",
        fontWeight: "bold",
        color: Colors.textDarkGray
    },
    tag: {
        display: "block",
        fontSize: ".8em",
        width: "fit-content",
        padding: "2px 8px",
        fontWeight: "bold"
    }
})

const Result = ({ approved }) => {
    const classes = useStyles();
    if (approved !== null) {
        return approved ? <Tag className={classes.tag} backgroundColor={Colors.calendarGreen}>Medication Detected</Tag> : <Tag className={classes.tag} backgroundColor={Colors.highlightYellow}>Unclear Result</Tag>;
    }
    return <Tag className={classes.tag} backgroundColor={Colors.lightgray}>Awaiting Review</Tag>
}

const PhotoList = observer(() => {

    const classes = useStyles();
    const { patientStore } = useStores();
    const { t } = useTranslation('translation');

    const [photos,setPhotos] = useState([]);

    const api = new PatientInformationAPI();

    const loadPhotos = async (offset = 0) => {
        const newPhotos = await api.getPhotoReports(offset);
        setPhotos([...photos,...newPhotos]);
    }

    useEffect(()=>{
        loadPhotos();
    },[])

    return (<div className={classes.container}>
        <Typography className={classes.title} variant="h2">{t('dashboard.photoReports')}</Typography>
        {photos.map((photoReport) => {
            const displayDate = DateTime.fromISO(photoReport.date).toLocaleString(DateTime.DATE_MED);
            return (
                <div key={`photo-list-${photoReport.photoId}`}>
                    <Grid alignItems="stretch" wrap="nowrap" className={classes.item} container>
                        <div style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
                            <Typography className={classes.date}>{displayDate}</Typography>
                            {photoReport.url ? <Result approved={photoReport.approved} /> :
                                <><Tag backgroundColor={Colors.calendarRed} className={classes.tag}>Skipped Photo</Tag></>}
                        </div>
                        {photoReport.url ? <ButtonBase style={{ backgroundImage: `url(${photoReport.url})` }} className={classes.photo}>
                            <AspectRatioIcon className={classes.expandIcon} />
                        </ButtonBase> : <Box minHeight="75px">  <Typography variant="body1">Reason: {photoReport.whyPhotoWasSkipped || "None provided"}</Typography></Box>}
                    </Grid>
                    <Box height=".5em" />
                </div>)
        })}
        <Box padding="1em 0">
        <button onClick={()=>{loadPhotos(photos.length)}}>Load More</button>
        </Box>
    </div>)

})

export default PhotoList;