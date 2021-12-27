import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react';
import useStores from '../../../Basics/UseStores';
import Styles from '../../../Basics/Styles';
import TablePagination from '@material-ui/core/TablePagination';
import Row from './ReportPreview';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';

const useRowStyles = makeStyles({
    spacing: {
        "& > thead > tr > th:nth-child(2), & > tbody > tr > td:nth-child(2)": {
            width: "100px"
        },
        "& > thead > tr > th": {
            padding: "1em .5em"
        },
        "& > thead > tr > th:nth-of-type(1)": {
            paddingLeft: "1em"
        }
    },
    table: {
        ...Styles.profileCard,
        overflow: "hidden"
    }
});

const CollapsibleTable = observer(() => {
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;
    const { patientProfileStore } = useStores();
    const { t } = useTranslation('translation');

    const classes = useRowStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            {patientProfileStore.selectedPatientReports.length > 0 ?
                <Paper className={classes.table}>
                    <TableContainer>
                        <Table className={classes.spacing} stickyHeader aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('coordinator.patientProfile.date')}</TableCell>
                                    <TableCell>{t('commonWords.medication')}</TableCell>
                                    <TableCell>{t('commonWords.symptoms')}</TableCell>
                                    <TableCell>{t('patient.report.important')}</TableCell>
                                    <TableCell align="center">{t('coordinator.patientTableLabels.details')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patientProfileStore.selectedPatientReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <Row key={`patient-report-${row.id}`} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={false}
                        component="div"
                        count={patientProfileStore.selectedPatientReports.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                    />
                </Paper> : <Grid alignItems="center" justify="center" container style={{width: "100%", height: "300px"}}>
                  <Typography variant="body1">{t('coordinator.tasksSidebar.noneYet')}</Typography>
                </Grid>}
        </>
    );
});

export default CollapsibleTable;