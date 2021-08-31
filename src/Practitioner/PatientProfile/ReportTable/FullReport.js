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

const useStyles = makeStyles({
    body: {
        "& > tr:nth-of-type(odd)": {
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
    photo:{
        width: "100px"
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
    const classes = useStyles();

    const timeTaken = DateTime.fromISO(row.takenAt).toLocaleString(DateTime.TIME_SIMPLE)

    return (<Table size="small" aria-label="report-details">
        <TableBody className={classes.body}>
            <TableRow>
                <TableCell>Medication</TableCell>
                <TableCell>
                    {row.medicationWasTaken ? <p>Taken at: {timeTaken}</p> : <p>Not Taken</p>}
                    <p>{!row.medicationWasTaken && "Reason: Not feeling well"}</p>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Symptoms</TableCell>
                <TableCell> <FullSymptomList list={row.symptoms} /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Doing Okay:</TableCell>
                <TableCell>
                    <p>{row.doingOkay ? "Yes" : "Need Support"}</p>
                    {row.doingOkayReason && <p>Reason: {row.doingOkayReason}</p>}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Photo:</TableCell>
                <TableCell>
                    {!row.photoWasRequired ? <p>{t('report.photoNotNeeded')}</p> : <>{row.photoUrl ? <img className={classes.photo} src={row.photoUrl} /> : <p>Not Submitted</p>}</>}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Submitted At:</TableCell>
                <TableCell>{DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}</TableCell>
            </TableRow>
        </TableBody>
    </Table>)
}

export default FullReport;