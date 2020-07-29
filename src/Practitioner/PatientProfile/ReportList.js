import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography';
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    container: {
        flexGrow: "1",
        maxHeight: "78vh",
        overflow: "scroll"
    },
    report: {
        ...Styles.profileCard,
        boxSizing: "border-box",
        padding: ".5em 1em .5em 1em",
        width: "95%",
        minHeight: "85px",
        backgroundColor: "white",
        marginBottom: "1em",
        marginLeft: ".5em",
        display: "flex",
        alignItems: "center"
    },
    time:{
        height: "auto",
        flexBasis: "10%",
        ...Styles.flexColumn,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        "& > span":{
            fontSize: "1.5em",
            margin: 0
        },
        "& > p":{
            fontSize: "1em",
            margin: 0
        }
    },
    tag:{
        backgroundColor: props => props.backgroundColor,
        padding: "5px",
        textTransform: "uppercase",
        letterSpacing: "1.15px",
        fontSize: ".75em"
    }

})

const ReportView = observer(() => {

    const {practitionerStore} = useStores();
    const classes = useStyles();

    return (<div className={classes.container}>
        {practitionerStore.selectedPatientReports.length > 0 && practitionerStore.selectedPatientReports.map(report => {
            return <Report date={report.date} />
        })}
    </div>)

})

const Report = (props) => {
    const classes = useStyles();
    const date = DateTime.fromISO(props.date);

    return (
        <div className={classes.report}>
            <div className={classes.time}>
                <span>{date.day}</span>
                <p>{date.monthShort}</p>
            </div>
            <Tag backgroundColor={Colors.patientHistory.report}>Report</Tag>
        </div>
    )
}

const Tag = (props) => {
    const classes = useStyles(props);
    return <span className={classes.tag}>{props.children}</span>
}

export default ReportView;