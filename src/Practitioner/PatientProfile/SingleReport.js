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
import Tag from '../../Components/Tag';
import { useTranslation } from 'react-i18next';
import ReportContainer from './ReportContainer';
const useStyles = makeStyles({
    report: {
        ...Styles.profileCard,
        boxSizing: "border-box",
        width: "100%",
        backgroundColor: "white",
        marginBottom: ".75em",
        padding: ".5em 0"
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
    expandButton: {
        borderRadius: 0,
        boxShadow: "none"
    }
})


const ReportCard = ({ report }) => {
    const [expanded, setExpanded] = useState(false);

    const classes = useStyles();
    const date = DateTime.fromISO(report.date);
    const { t } = useTranslation('translation');

    return (

        <div className={classes.report}>
            <ReportContainer>
                <div className={classes.time}>
                    <span>{date.day}</span>
                    <p>{date.monthShort}</p>
                </div>
                <Typography className="wide" variant="body1" color="initial">Taken</Typography>
                <Typography className="wide" variant="body1" color="initial">Dolor de panza</Typography>
                {/* <Typography variant="body1" color="initial">Mood</Typography> */}
                <Grid container direction="column">
                {report.numberOfDaysAfterRequest > 0 &&<Tag className={classes.lateTag} backgroundColor={Colors.warningRed}>{`${report.numberOfDaysAfterRequest} ${t('patient.report.dayLate', { count: report.numberOfDaysAfterRequest })}`}</Tag>}
                </Grid>
                <IconButton className={classes.expandButton} onClick={() => { setExpanded(!expanded) }}>{expanded ? <CollapseButton /> : <ExpandButton />}</IconButton>
            </ReportContainer>

            <Collapse in={expanded}>

            </Collapse>
        </div>)

}

export default ReportCard;