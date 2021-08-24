import Colors from '../../Basics/Colors';
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';
import Collapse from '@material-ui/core/Collapse';
import { DateTime } from 'luxon';
import IconButton from '@material-ui/core/IconButton'
import ExpandButton from '@material-ui/icons/KeyboardArrowDown';
import CollapseButton from '@material-ui/icons/KeyboardArrowUp';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    report: {
        ...Styles.profileCard,
        boxSizing: "border-box",
        width: "100%",
        backgroundColor: "white",
        marginBottom: ".75em",
        padding: ".5em"
    },
    mainReportContent: {
        display: "flex",
        flexGrow: "1",
        "& > div.section": {
            marginLeft: "1em",
            paddingRight: "1em",
            borderRight: "solid 1px gray"
        },
        "& > div.section:last-of-type": {
            borderRight: "none"
        },
    },
    time: {
        height: "auto",
        ...Styles.flexColumn,
        justifyContent: "center",
        flexShrink: 0,
        "& > span": {
            fontSize: "1.5em",
            margin: 0
        },
        "& > p": {
            fontSize: "1em",
            margin: 0
        }
    },
    preview: {
        width: "100%",
    },
    details: {
        justifyContent: "flex-start",
        flexGrow: 1,
        " & > *": {
            paddingLeft: ".5em",
            display: "flex",
            flexGrow: "1",
            borderRight: `solid 1px ${Colors.lightgray}`
        },
        "& > .wide": {
            flexGrow: "2"
        },
        "& > .details": {
            marginLeft: "auto",
            flexGrow: 0
        },
        "& > *:last-of-type": {
            borderRight: "none"
        }
    },
    expandButton: {
        marginLeft: "auto"
    }
})


const ReportCard = ({ report }) => {
    const [expanded, setExpanded] = useState(false);

    const classes = useStyles();
    const date = DateTime.fromISO(report.date);

    return (

        <div className={classes.report}>
                <Grid className={classes.details} container>
                    <div className={classes.time}>
                        <span>{date.day}</span>
                        <p>{date.monthShort}</p>
                    </div>
                    <Typography variant="body1" color="initial">Taken</Typography>
                    <Typography className="wide" variant="body1" color="initial">Dolor de panza</Typography>
                    <Typography variant="body1" color="initial">Mood</Typography>
                    <Typography className="wide" variant="body1" color="initial">Issues</Typography>
                    <IconButton className="details" onClick={() => { setExpanded(!expanded) }}>{expanded ? <CollapseButton /> : <ExpandButton />}</IconButton>
                </Grid>

            <Collapse in={expanded}>

            </Collapse>
        </div>)

}

export default ReportCard;