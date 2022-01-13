import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../../Basics/Colors';
import { DateTime } from 'luxon';
import AspectRatioIcon from '@material-ui/icons/ZoomOutMap';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tag from '../../../Components/Tag';


const useStyles = makeStyles({
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

const PhotoResponseItem = ({date, photoId, approved, url, whyPhotoWasSkipped }) => {
    
    const classes = useStyles();
    const displayDate = DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);

    return (
        <div key={`photo-list-${photoId}`}>
            <Grid alignItems="stretch" wrap="nowrap" className={classes.item} container>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
                    <Typography className={classes.date}>{displayDate}</Typography>
                    {url ? <Result approved={approved} /> :
                        <><Tag backgroundColor={Colors.calendarRed} className={classes.tag}>Skipped Photo</Tag></>}
                </div>
                {url ? <ButtonBase style={{ backgroundImage: `url(${url})` }} className={classes.photo}>
                    <AspectRatioIcon className={classes.expandIcon} />
                </ButtonBase> : <Box minHeight="75px">  <Typography variant="body1">Reason: {whyPhotoWasSkipped || "None provided"}</Typography></Box>}
            </Grid>
            <Box height=".5em" />
        </div>)

}

export default PhotoResponseItem;