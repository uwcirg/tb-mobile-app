import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import Symptom from '../../Shared/Symptom';
import Colors from '../../../Basics/Colors';
import ImagePopUp from '../../Shared/ImagePopUp';
import ExpandIcon from '@material-ui/icons/AspectRatio';
import useToggle from '../../../Hooks/useToggle';
import PhotoStatus from '../../../Components/PhotoStatus';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Tag from './ReportTag';


const useStyles = makeStyles({
    body: {
        marginBottom: "2em",
        "& td": {
            fontSize: "1.1em",
            padding: ".5em"
        },
        "& td p": {
            margin: ".5em 0"
        },
        "& > tr:nth-of-type(odd)": {
            backgroundColor: Colors.lighterGray
        },
        "& > tr > td:first-of-type": {
            fontWeight: "bold",
            textAlign: "right",
            width: "25%"
        },
        "& > tr > td:nth-of-type(2)": {
            paddingLeft: "1em",
            boxSizing: "border-box"
        },
        "& > tr > td": {
            borderBottom: "none"
        }

    },
    photo: {
        height: "200px"
    },
    capitalize: {
        textTransform: "capitalize"
    },
    fullReportHeader: {
        fontSize: "1.5em",
        width: "100%"
    },
    highlight: {
        backgroundColor: Colors.timelineYellow,
        padding: "5px",
        borderRadius: "5px",
        marginBottom: ".5em"
    },
    warningHighlight: {
        backgroundColor: Colors.calendarRed,
        padding: "5px",
        borderRadius: "5px",
        marginBottom: ".5em"
    },
    photoArea: {
        display: "flex",
        alignItems: "flex-start"
    },
    photoExpand: {
        padding: 0,
        borderRadius: "none",
        marginLeft: "1em"
    },
    photoLateTag:{
        marginLeft: "1em"
    }
})

const DATETIME_FORMAT = { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" };

const FullSymptomList = (props) => {

    const { t } = useTranslation('translation');

    return (<>
        {props.list.length > 0 ? <div> {props.list.map(symptom => {
            return (<p key={`report-symptom-list-${symptom}`}><Symptom icon string={symptom} /></p>)
        })} </div> : <p>{t('coordinator.recentReports.none')}</p>}
    </>)
}

const FullReport = ({ row }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const date = DateTime.fromISO(row.date);
    const timeTaken = DateTime.fromISO(row.takenAt).toLocaleString(DateTime.TIME_SIMPLE)

    return (<Table size="small" aria-label="report-details">
        <TableBody className={classes.body}>
            <TableRow>
                <TableCell>
                    {t('report.for')}
                </TableCell>
                <TableCell>
                    <p>{date.toLocaleString(DateTime.DATE_FULL)}</p>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>{t('report.submittedAt')}:</TableCell>
                <TableCell>
                    <p>{DateTime.fromISO(row.createdAt).toLocaleString(DATETIME_FORMAT)}</p>
                    {row.numberOfDaysAfterRequest > 0 && <p><span className={classes.highlight}>{`${row.numberOfDaysAfterRequest} ${t('patient.report.dayLate', { count: row.numberOfDaysAfterRequest })}`}</span></p>}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>{t('commonWords.medication')}</TableCell>
                <TableCell>
                    {row.medicationWasTaken ? <p>{t('patient.report.confirmation.takenAt')}: {timeTaken}</p> : <p><span className={classes.warningHighlight}>{t('coordinator.tasksSidebar.notTaken')}</span></p>}
                    {!row.medicationWasTaken &&
                        <>{row.whyMedicationNotTaken ? <p>{t('coordinator.message')}: {row.whyMedicationNotTaken}</p> : <p>
                            {t('coordinator.sideBar.noReason')}</p>}</>}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>{t('commonWords.symptoms')}</TableCell>
                <TableCell> <FullSymptomList list={row.symptoms} /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell>{t('patient.report.doingWell')}:</TableCell>
                <TableCell>
                    <p className={classes.capitalize}>{row.doingOkay ? t('commonWords.yes') : <span className={classes.warningHighlight}>{t('patient.report.needSupport')}</span>}</p>
                    {row.doingOkayReason && <p>{t('coordinator.message')}: {row.doingOkayReason}</p>}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>{t('coordinator.patientProfile.photo')}:</TableCell>
                <TableCell>
                    <PhotoRow row={row} />
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>)
}

const PhotoRow = ({ row }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const [expand, toggleExpanded] = useToggle(false);

    return (<>
        {!row.photoWasRequired ? <p>{t('report.photoNotNeeded')}</p> : <>{row.photoUrl ? <>
            <div className={classes.photoArea}>
                <div>
                    <img className={classes.photo} src={row.photoUrl} />
                    <Grid alignItems="flex-start" container>
                        <PhotoStatus conclusive={row.photoDetails && row.photoDetails.approvalStatus} />
                        <IconButton className={classes.photoExpand} onClick={toggleExpanded}>
                            <ExpandIcon className={classes.expandIcon} />
                        </IconButton>
                    </Grid>
                </div>
            </div>
            {row.photoDetails.createdAt && <Grid alignItems="center" container>
                <p>{t('report.submittedAt')}: {DateTime.fromISO(row.photoDetails.createdAt).toLocaleString(DATETIME_FORMAT)}</p>
                {row.photoDetails.backSubmission && <Tag className={classes.photoLateTag} backgroundColor={Colors.highlightYellow}>{t('patient.report.late')}</Tag>}
            </Grid>}
        </>
            : <>
            <p><span className={classes.warningHighlight}>{t('report.missedPhoto')}</span></p>
            <p> {row.whyPhotoWasSkipped ? <>{t('coordinator.message')}: {row.whyPhotoWasSkipped}</> : t('coordinator.sideBar.noReason') }</p>
            </>}</>}
        {expand && <ImagePopUp close={toggleExpanded} imageSrc={row.photoUrl} />}
    </>)
}

export default FullReport;