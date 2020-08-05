import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography';
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'
import Pending from '@material-ui/icons/Help';
import FeelingGood from '@material-ui/icons/Mood'
import FeelingBad from '@material-ui/icons/MoodBad'
import ReportCard from './ReportCard';



const useStyles = makeStyles({
    container: {
        flexGrow: "1",
        maxHeight: "78vh",
        overflow: "scroll"
    },
    reportItem: {
        ...Styles.flexColumn,
        justifyContent: "flex-start",
        fontSize: ".875em",
        letterSpacing: ".15px",
        color: Colors.textDarkGray,
        "& > span": {
            fontWeight: "bold",
            textTransform: "capitalize",
            "& > svg": {
                fontSize: '4em'
            }
        },
        "& > span, & > p": {
            margin: 0,
            padding: 0
        },
        "& > p": {
            marginBottom: "3px"
        },
    },
    details: {
        display: "flex",
        width: "90%",
        justifyContent: "space-between",
        padding: "1em"
    },
    reportPhoto: {
        flexBasis: "25%",
        "& > img": {
            width: "100%"
        }
    },
    noPhoto: {
        ...Styles.flexCenter,
        height: "100px",
        backgroundColor: Colors.lightgray
    },
    photoStatus: {
        display: "flex",
        alignItems: "center"
    },
    mainReportContent: {
        display: "flex",
        marginLeft: "2em",
        "& > div.section": {

            marginLeft: "1em",
            paddingRight: "1em",
            borderRight: "solid 1px gray"
        },
        "& > div.section:last-of-type": {
            borderRight: "none"
        },
    },
    red: {
        color: "red"
    }
})

const ReportView = observer(() => {

    const { practitionerStore } = useStores();
    const classes = useStyles();

    //for dev slice(0,3) to fix error loading
    return (<div className={classes.container}>
        {practitionerStore.selectedPatientReports.length > 0 && practitionerStore.selectedPatientReports.map(report => {
            return <Report key={`patient-report-${report.id}`} report={report} />
        })}
    </div>)

})

const Report = (props) => {
    //const [expanded, setExpanded] = useState(false);
    const { report } = props;
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (

        <ReportCard
            tagColor={Colors.patientHistory.report}
            tagText={t('report.tag')}
            date={report.date}
            expandedContent={
                <div className={classes.details}>
                    <ReportItem title={t('commonWords.symptoms')} content={<FullSymptomList list={report.symptoms} />} />
                    <ReportItem title={t('report.submittedAt')} content={<p>{DateTime.fromISO(report.updatedAt).toLocaleString(DateTime.DATETIME_SHORT)}</p>} />
                    <ReportItem title={t('report.feeling')} content={<Feeling doingOkay={report.doingOkay} />} />
                    <ReportPhoto required={report.photoWasRequired} approval={report.photoDetails && report.photoDetails.approvalStatus} url={report.photoUrl} />
                </div>
            }>
            <div className={classes.mainReportContent}>
                <ReportItem title={t('report.medicationTaken')} content={report.medicationWasTaken ? t('commonWords.yes') : t('commonWords.no')} />
                <ReportItem title={t('report.time')} content={DateTime.fromISO(report.takenAt).toLocaleString(DateTime.TIME_24_SIMPLE)} />
                <ReportItem title={t('commonWords.symptoms')} content={<SymptomListPreview list={report.symptoms} />} />
                {report.photoWasRequired && <ReportItem title={t('report.photoSubmitted')} content={report.photoDetails ? t('commonWords.yes') : t('commonWords.no')} />}
            </div>
        </ReportCard >

    )
}

const ReportPhoto = (props) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (<div className={classes.reportPhoto}>
        {props.url ? <><img src={props.url} />
            <div className={classes.photoStatus}>{props.approval === null ? <>
                <Pending style={{ color: Colors.yellow }} />
                {t('report.pending')} </> : (props.approval === true ?

                    <>
                        <Check style={{ color: Colors.green }} />
                        {t('report.conclusive')}
                    </>
                    :
                    <>
                        <Clear style={{ color: Colors.red }} />
                        {t('report.inconclusive')} </>)}</div>
        </>
            : <div className={classes.noPhoto}>{props.required ? <span className={classes.red}>{t('report.missedPhoto')}</span> : t('report.photoNotNeeded')}</div>}
    </div>)
}

const SymptomListPreview = (props) => {
    const { t, i18n } = useTranslation('translation');
    return (<>
        {props.list.length > 0 ? t(`symptoms.${props.list[0]}.title`) : t('coordinator.recentReports.none')}
        {props.list.length > 1 && ` +${props.list.length - 1}`}
    </>)
}

const FullSymptomList = (props) => {
    const { t, i18n } = useTranslation('translation');
    return (<>
        {props.list.length > 0 ? <div> {props.list.map(each => {
            return (<p key={each}>{t(`symptoms.${each}.title`)}</p>)
        })} </div> : <p>{t('coordinator.recentReports.none')}</p>}
    </>)
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

const Feeling = (props) => {

    return (
        <>
            {props.doingOkay ? <FeelingGood style={{ color: Colors.green }} /> : <FeelingBad style={{ color: Colors.red }} />}
        </>
    )
}

export default ReportView;