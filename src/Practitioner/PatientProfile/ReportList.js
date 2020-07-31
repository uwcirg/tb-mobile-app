import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography';
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton'
import ExpandButton from '@material-ui/icons/KeyboardArrowDown'
import CollapseButton from '@material-ui/icons/KeyboardArrowUp'
import Collapse from '@material-ui/core/Collapse';

import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'
import Pending from '@material-ui/icons/Help';

import FeelingGood from '@material-ui/icons/Mood'
import FeelingBad from '@material-ui/icons/MoodBad'



const useStyles = makeStyles({
    container: {
        flexGrow: "1",
        maxHeight: "78vh",
        overflow: "scroll"
    },
    report: {
        ...Styles.profileCard,
        boxSizing: "border-box",
        width: "95%",
        backgroundColor: "white",
        marginBottom: "1em",
        marginLeft: ".5em",
    },
    preview: {
        minHeight: "85px",
        transition: "all 2s ease",
        display: "flex",
        padding: ".5em 1em .5em 1em",
        alignItems: "center",
        "& > div.section": {
            marginLeft: "1em",
            paddingRight: ".5em",
            borderRight: "solid 1px gray"
        },
        "& > div.section:last-of-type": {
            borderRight: "none"
        },
        "& > button.expand": {
            marginLeft: "auto"
        }
    },
    time: {
        height: "auto",
        marginRight: "1em",
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
        justifyContent: "flex-start",
        fontSize: ".875em",
        letterSpacing: ".15px",
        color: Colors.textDarkGray,
        "& > span": {
            fontWeight: "bold",
            textTransform: "capitalize",
            "& > svg":{
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
        padding: "1em",
        "& > div.section":{
            marginRight: "2em"
        }
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
    photoStatus:{
        display: "flex",
        alignItems: "center"
    }
})

const ReportView = observer(() => {

    const { practitionerStore } = useStores();
    const classes = useStyles();

    return (<div className={classes.container}>
        {practitionerStore.selectedPatientReports.length > 0 && practitionerStore.selectedPatientReports.map(report => {
            return <Report key={`patient-report-${report.id}`} report={report} />
        })}
    </div>)

})

const Report = (props) => {
    const [expanded, setExpanded] = useState(false);
    const { report } = props;
    const classes = useStyles();
    const date = DateTime.fromISO(report.date);
    const { t, i18n } = useTranslation('translation');

    return (

        <div key={props.key} className={classes.report}>
            <div className={classes.preview}>
                <div className={classes.time}>
                    <span>{date.day}</span>
                    <p>{date.monthShort}</p>
                </div>
                <Tag backgroundColor={Colors.patientHistory.report}>Report</Tag>
                <ReportItem title={t('report.medicationTaken')} content={report.medicationWasTaken ? t('commonWords.yes') : t('commonWords.no')} />
                <ReportItem title={t('report.time')} content={DateTime.fromISO(report.takenAt).toLocaleString(DateTime.TIME_24_SIMPLE)} />
                <ReportItem title={t('commonWords.symptoms')} content={<SymptomListPreview list={report.symptoms} />} />
                {report.photoWasRequired && <ReportItem title={t('report.photoSubmitted')} content={report.photoDetails ? t('commonWords.yes') : t('commonWords.no')} />}
                <IconButton className="expand" onClick={() => { setExpanded(!expanded) }}>{expanded ? <CollapseButton /> : <ExpandButton />}</IconButton>
            </div>
            <Collapse in={expanded}>
                <div className={classes.details}>
                    <ReportItem title={t('commonWords.symptoms')} content={<FullSymptomList list={report.symptoms} />} />
                    <ReportItem title={t('report.submittedAt')} content={<p>{DateTime.fromISO(report.updatedAt).toLocaleString(DateTime.DATETIME_SHORT)}</p>} />
                    <ReportItem title={t('report.feeling')} content={<Feeling doingOkay={report.doingOkay} />} />
                    <ReportPhoto approval={report.photoDetails && report.photoDetails.approvalStatus} url={report.photoUrl} />
                </div>
            </Collapse>
        </div>

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
            : <div className={classes.noPhoto}>{t('report.photoNotNeeded')}</div>}
    </div>)
}

const SymptomListPreview = (props) => {
    const { t, i18n } = useTranslation('translation');
    return (<>
        {props.list.length > 0 ? t(`symptoms.${props.list[0]}.title`) : t('coordinator.recentReports.none')}
        {props.list.length > 1 && ` +${props.list.length - 1}`}
    </>)
}

const FullSymptomList = (props) =>{
        const { t, i18n } = useTranslation('translation');
    return (<>
        {props.list.length > 0 ? <div> {props.list.map(each => {
            return(<p>{t(`symptoms.${each}.title`)}</p>)})} </div> : <p>{t('coordinator.recentReports.none')}</p>}
    </>)
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

const Feeling = (props) => {
    
    return(
        <>
        {props.doingOkay ? <FeelingGood style={{color: Colors.green}} /> : <FeelingBad style={{color: Colors.red}} /> }
        </>
    )
}

export default ReportView;