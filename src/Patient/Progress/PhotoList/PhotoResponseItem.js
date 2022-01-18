import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../../Basics/Colors';
import { DateTime } from 'luxon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpandablePhoto from '../../../Components/ExpandablePhoto';
import PhotoResultTag from '../../../Components/Shared/PhotoResultTag';

const useStyles = makeStyles({
    item: {
        padding: ".5em",
        backgroundColor: Colors.lighterGray,
        boxSizing: "border-box",
        borderRadius: "4px",
    },
    date: {
        display: "block",
        fontWeight: "bold",
        color: Colors.textDarkGray,
        lineHeight: "1em"
    },
    reportData: {
        flexGrow: "1",
        display: "flex",
        flexDirection: "column"
    },
    reason: {
        lineHeight: "1.1em",
        color: Colors.textDarkGray
    }
})

const PhotoResponseItem = ({ date, approved, url, whyPhotoWasSkipped }) => {

    const classes = useStyles();
    const displayDate = DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);


    return (
        <div>
            <Grid alignItems="stretch" wrap="nowrap" className={classes.item} container>
                <ExpandablePhoto url={url} />
                <Box width="1em" />
                <div className={classes.reportData}>
                    <Typography className={classes.date}>{displayDate}</Typography>
                    <Box height=".33em" />
                    <PhotoResultTag skipped={!url} approved={approved} />
                    {!url && <>
                        <Box height=".33em" />
                        <Typography className={classes.reason} variant="body1">{whyPhotoWasSkipped || t('coordinator.sideBar.noReason')}</Typography>
                    </>}
                </div>
            </Grid>
            <Box height=".5em" />
        </div>)

}

export default PhotoResponseItem;