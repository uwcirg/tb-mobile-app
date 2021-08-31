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
import ClickableText from '../../../Basics/ClickableText';
import ExpandIcon from '@material-ui/icons/AspectRatio';
import useToggle from '../../../Hooks/useToggle';

const useStyles = makeStyles({
    body: {
        "& > tr:nth-of-type(odd) > td:nth-of-type(2)": {
            backgroundColor: Colors.lighterGray
        },
        "& > tr > td:first-of-type": {
            fontWeight: "bold",
            textAlign: "right",
            verticalAlign: "top",
            paddingTop: "1em"
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
        width: "100px"
    },
    capitalize:{
        textTransform: "capitalize"
    }
})

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
    const [expand,toggleExpanded] = useToggle(false);
    const classes = useStyles();

    const timeTaken = DateTime.fromISO(row.takenAt).toLocaleString(DateTime.TIME_SIMPLE)

    return (
    <>
    <Table size="small" aria-label="report-details">
        <TableBody className={classes.body}>
            <TableRow>
                <TableCell>{t('commonWords.medication')}</TableCell>
                <TableCell>
                    {row.medicationWasTaken ? <p>{t('patient.report.confirmation.takenAt')}: {timeTaken}</p> : <p>{t('coordinator.tasksSidebar.notTaken')}</p>}
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
                        <p className={classes.capitalize}>{row.doingOkay ? t('commonWords.yes') : t('patient.report.needSupport')}</p>
                        {row.doingOkayReason && <p>{t('coordinator.message')}: {row.doingOkayReason}</p>}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{t('coordinator.patientProfile.photo')}:</TableCell>
                    <TableCell>
                        {!row.photoWasRequired ? <p>{t('report.photoNotNeeded')}</p> : <>{row.photoUrl ? <>
                        <img className={classes.photo} src={row.photoUrl} />
                        <br />
                        <ClickableText onClick={toggleExpanded} hideIcon text={<><ExpandIcon className={classes.expandIcon} />{t('coordinator.sideBar.expandPhoto')}</>} />
                        </> : <p>{t('report.missedPhoto')}</p>}</>}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{t('report.submittedAt')}:</TableCell>
                    <TableCell>{DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}</TableCell>
                </TableRow>
        </TableBody>
    </Table>
    {expand && <ImagePopUp close={toggleExpanded} imageSrc={row.photoUrl} />}
    </>
    )
}

        export default FullReport;