import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';
import { DateTime } from 'luxon';
import Tag from '../../Components/Tag';
import Grid from '@material-ui/core/Grid'
import Styles from '../../Basics/Styles';
import TablePagination from '@material-ui/core/TablePagination';

const useRowStyles = makeStyles({
    capitalize:{
        textTransform: "capitalize"
    },
    root: {
        '& > *': {
            borderBottom: 'unset',
            padding: ".5em"
        }
    },
    time: {
        ...Styles.flexColumn,
        paddingLeft: "1em",
        justifyContent: "center",
        "& > span": {
            fontSize: "1.5em",
            margin: 0
        },
        "& > p": {
            fontSize: "1em",
            margin: 0
        }
    },
    tags:{
        boxSizing: "border-box",
        "& > *":{
            margin: ".25em 0",
            maxWidth: "120px",
            textAlign: "center",
            fontSize: ".8em"
        },
    },
    spacing:{
        "& > th:nth-child(2), & > td:nth-child(2)":{
            width: "100px"
        }
    }
});

const SymptomListPreview = (props) => {
    const { t } = useTranslation('translation');
    return (<>
        {props.list.length > 0 ? t(`symptoms.${props.list[0]}.title`) : t('coordinator.recentReports.none')}
        {props.list.length > 1 && ` +${props.list.length - 1}`}
    </>)
}

function Row(props) {

    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const date = DateTime.fromISO(row.date);
    const { t } = useTranslation('translation');

    return (
        <React.Fragment>
            <TableRow className={`${classes.root} ${classes.spacing}`}>
                <TableCell component="th" scope="row">
                    <div className={classes.time}>
                        <span>{date.day}</span>
                        <p>{date.monthShort}</p>
                    </div>
                </TableCell>
                <TableCell className={classes.capitalize}>{row.medicationWasTaken ? t('commonWords.yes') : t('commonWords.no')}</TableCell>
                <TableCell ><SymptomListPreview list={row.symptoms} /></TableCell>
                <TableCell>
                    <Grid className={classes.tags} container direction="column">
                        {row.numberOfDaysAfterRequest> 0 && <Tag backgroundColor={Colors.warningRed}>{`${row.numberOfDaysAfterRequest} ${t('patient.report.dayLate', { count: row.numberOfDaysAfterRequest })}`}</Tag>}
                        <Tag backgroundColor={Colors.green}>Test Submitted</Tag>
                    </Grid>
                </TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                @TODO add the body content here
                            </Typography>
                            {/* <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))} 
                                    <div>Add body here</div>
                                </TableBody>
                            </Table> */}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const CollapsibleTable = observer(() => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const { patientProfileStore } = useStores();

    const classes = useRowStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            {patientProfileStore.selectedPatientReports.length > 0 &&
                <Paper>
                    <TableContainer>
                        <Table stickyHeader aria-label="collapsible table">
                            <TableHead>
                                <TableRow className={classes.spacing}>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Medication</TableCell>
                                    <TableCell>Symptoms</TableCell>
                                    <TableCell>Flags</TableCell>
                                    <TableCell align="right" />
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
                </Paper>}
        </>
    );
});

export default CollapsibleTable;

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };