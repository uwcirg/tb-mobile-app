import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography';
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';


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
        alignItems: "center",
        "& > div.section":{
            marginLeft: "1em",
            paddingRight: ".5em",
            borderRight: "solid 1px gray"
        },
        "& > div.section:last-child":{
            borderRight: "none"
        }
    },
    time: {
        height: "auto",
        flexBasis: "10%",
        ...Styles.flexColumn,
        justifyContent: "center",
        alignItems: "center",
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
    tag: {
        backgroundColor: props => props.backgroundColor,
        padding: "5px",
        textTransform: "uppercase",
        letterSpacing: "1.15px",
        fontSize: ".75em"
    },
    reportItem: {
        ...Styles.flexColumn,
        flexBasis: "15%",
        fontSize: ".875em",
        letterSpacing: ".15px",
        color: Colors.textDarkGray,
        "& > span":{
            fontWeight: "bold"
        },
        "& > span, & > p":{
            margin: 0,
            padding: 0
        }


    }

})

const ReportView = observer(() => {

    const { practitionerStore } = useStores();
    const classes = useStyles();

    return (<div className={classes.container}>
        {practitionerStore.selectedPatientReports.length > 0 && practitionerStore.selectedPatientReports.map(report => {
            return <Report report={report} />
        })}
    </div>)

})

const Report = (props) => {
    const { report } = props;
    const classes = useStyles();
    const date = DateTime.fromISO(report.date);
    const { t, i18n } = useTranslation('translation');

    console.log(report)

    return (
        <div className={classes.report}>
            <div className={classes.time}>
                <span>{date.day}</span>
                <p>{date.monthShort}</p>
            </div>
            <Tag backgroundColor={Colors.patientHistory.report}>Report</Tag>
            <ReportItem title={t('commonWords.medication')} content={report.medicationWasTaken ? "Took Medication" : "Didnt take medication"} />
            <ReportItem title={t('patient.report.confirmation.takenAt')} content={DateTime.fromISO(report.takenAt).toLocaleString(DateTime.TIME_24_SIMPLE)} />
        </div>
    )
}

const Tag = (props) => {
    const classes = useStyles(props);
    return <span className={classes.tag}>{props.children}</span>
}

const ReportItem = (props) => {
    const classes = useStyles(props);
    return (
        <div className={`section ${classes.reportItem}`}>
            <p>{props.title}</p>
            <span>{props.content}</span>
        </div>
    )

}

export default ReportView;