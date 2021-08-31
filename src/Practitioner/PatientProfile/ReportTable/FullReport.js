import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from 'react-i18next';
import {DateTime} from 'luxon';

const useStyles = makeStyles({
  
})

const FullSymptomList = (props) => {
    const { t } = useTranslation('translation');
    return (<>
        {props.list.length > 0 ? <div> {props.list.map(each => {
            return (<p key={each}>{t(`symptoms.${each}.title`)}</p>)
        })} </div> : <p>{t('coordinator.recentReports.none')}</p>}
    </>)
}

const FullReport = ({ row }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<Table size="small" aria-label="report-details">
        <TableHead>
            <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell>Symptoms</TableCell>
                <TableCell>Mood</TableCell>
                <TableCell>Photo</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">
                        {DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
                    </TableCell>
                    <TableCell>
                        <FullSymptomList list={row.symptoms} />
                    </TableCell>
                    <TableCell>
                        {row.doingOkay ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="right">
                        {row.photoRequested && "Requested"}
                        {row.photoUrl && <img style={{width: "100px"}} src={row.photoUrl} />}
                        </TableCell>
                </TableRow>
        </TableBody>
    </Table>)
}

export default FullReport;