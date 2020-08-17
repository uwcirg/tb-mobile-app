import React, { useState, useEffect } from 'react'
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
import ReportItem from './ReportCardItem';

import { VariableSizeList as List } from 'react-window';

const GUTTER_SIZE = 10;

const useStyles = makeStyles({
    container: {
        flexGrow: "1",
        maxHeight: "78vh",
        overflow: "scroll"
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
    red: {
        color: "red"
    }
})

// These row heights are arbitrary.
// Yours should be based on the content of the row.

const Row = observer(({ data, index, style }) => {
    const reports = useStores().practitionerStore.selectedPatientReports
    return (
        <Report setExpand={() => { data.expand(index) }} style={{
            ...style,
            left: style.left + GUTTER_SIZE,
            top: style.top + GUTTER_SIZE,
            width: style.width - GUTTER_SIZE,
            height: style.height - GUTTER_SIZE
        }} report={reports[index]} />
    )
});

const ReportView = observer(() => {
    const reports = useStores().practitionerStore.selectedPatientReports;
    const [rowHeights,setRowHeights] = useState(new Array(reports.length).fill(false));

    const listRef = React.useRef();

    const calculateItemSize = (index) => {
        let base = 100;
        if (rowHeights[index]) base += 150
        return base
    }

    const expand = (index) => {
        console.log(rowHeights[index])
        rowHeights[index] = true
        console.log(rowHeights[index])
    }

    const updateFieldChanged = index => {
        let newArr = [...rowHeights];
        newArr[index] = !newArr[index];
        setRowHeights(newArr);
    }

    const toggleSize = i => {
        if (listRef.current) {
          listRef.current.resetAfterIndex(i);
        }
        updateFieldChanged(i)
      };

    return (
        <>
            {reports.length > 0 &&
                <List
                    ref={listRef}
                    height={400}
                    itemCount={reports.length}
                    width={"100%"}
                    itemSize={calculateItemSize}
                    itemData={{ expand: toggleSize }}
                >
                    {Row}
                </List>}
        </>
    )
}
);



const OldReportView = observer(() => {

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
            setExpand={props.setExpand}
            style={props.style}
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

            <ReportItem title={t('report.medicationTaken')} content={report.medicationWasTaken ? t('commonWords.yes') : t('commonWords.no')} />
            <ReportItem title={t('report.time')} content={DateTime.fromISO(report.takenAt).toLocaleString(DateTime.TIME_24_SIMPLE)} />
            <ReportItem title={t('commonWords.symptoms')} content={<SymptomListPreview list={report.symptoms} />} />
            {report.photoWasRequired && <ReportItem title={t('report.photoSubmitted')} content={report.photoDetails ? t('commonWords.yes') : t('commonWords.no')} />}
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

const Feeling = (props) => {

    return (
        <>
            {props.doingOkay ? <FeelingGood style={{ color: Colors.green }} /> : <FeelingBad style={{ color: Colors.red }} />}
        </>
    )
}

export default ReportView;