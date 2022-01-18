import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import useStores from '../../Basics/UseStores';

const useStyles = makeStyles({
    header: {
        "& > th":{
            textTransform: "capitalize"
        }
    }
})

const PhotoReportsList = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { selectedPatientReports } = useStores().patientProfileStore;

    return (<Paper className={classes.table}>
        <TableContainer>
            <Table className={classes.spacing} stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>{t('coordinator.patientProfile.date')}</TableCell>
                        <TableCell>{t('photoReportReview.result')}</TableCell>
                        <TableCell>{t('patient.report.important')}</TableCell>
                        <TableCell>{t('flags')}</TableCell>
                        <TableCell>{t('Photo')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedPatientReports.slice(0, 26).map((row) => (
                        <Row key={`patient-report-${row.id}`} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>)

}

const Row = () => {

    return (<TableRow>
        <TableCell>Date</TableCell>
        <TableCell>result</TableCell>
        <TableCell>status</TableCell>
        <TableCell>Flags</TableCell>
        <TableCell>Photo</TableCell>
    </TableRow>)
}

export default PhotoReportsList;