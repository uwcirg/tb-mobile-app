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
import useToggle from '../../../Hooks/useToggle';
import Dialog from '@material-ui/core/Dialog';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


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
        fontWeight: "bold",
        color: Colors.textDarkGray,
        lineHeight: "1em"
    },
    tag: {
        display: "block",
        fontSize: ".8em",
        width: "fit-content",
        padding: "2px 8px",
        fontWeight: "bold"
    },
    reportData: {
        flexGrow: "1",
        display: "flex",
        flexDirection: "column"
    },
    reason: {
        lineHeight: "1.1em",
        color: Colors.textDarkGray
    },
    noPhoto: {
        alignSelf: "center",
        justifySelf: "center",
        color: Colors.warningRed,
        fontSize: "3em"
    },
    skipped: {
        display: "flex",
        backgroundColor: Colors.lightgray,
        minHeight: "75px",
        width: "75px",
        borderRadius: "4px",
        flexShrink: 0
    },
})

const Result = ({ approved }) => {
    const classes = useStyles();
    if (approved !== null) {
        return approved ? <Tag className={classes.tag} backgroundColor={Colors.calendarGreen}>Medication Detected</Tag> : <Tag className={classes.tag} backgroundColor={Colors.highlightYellow}>Unclear Result</Tag>;
    }
    return <Tag className={classes.tag} backgroundColor={Colors.lightgray}>Awaiting Review</Tag>
}

const PhotoResponseItem = ({ date, photoId, approved, url, whyPhotoWasSkipped }) => {

    const classes = useStyles();
    const displayDate = DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
    const [showFull, toggleShowFull] = useToggle(false);

    return (
        <div>
            <Dialog onClose={toggleShowFull} open={showFull}>
                <img src={url} />
            </Dialog>
            <Grid alignItems="stretch" wrap="nowrap" className={classes.item} container>
                {url ? <ButtonBase onClick={toggleShowFull} style={{ backgroundImage: `url(${url})` }} className={classes.photo}>
                    <AspectRatioIcon className={classes.expandIcon} />
                </ButtonBase> : <ButtonBase disabled className={classes.skipped}>
                    <HighlightOffIcon className={classes.noPhoto} />
                </ButtonBase>}
                <Box width="1em" />
                <div className={classes.reportData}>
                    <Typography className={classes.date}>{displayDate}</Typography>
                    <Box height=".33em" />
                    {url ? <Result approved={approved} /> :
                        <>
                            <Tag backgroundColor={Colors.calendarRed} className={classes.tag}>Skipped Photo</Tag>
                            <Box height=".33em" />
                            <Typography className={classes.reason} variant="body1">{whyPhotoWasSkipped || "None provided"}</Typography>
                        </>}
                </div>
            </Grid>
            <Box height=".5em" />
        </div>)

}

export default PhotoResponseItem;