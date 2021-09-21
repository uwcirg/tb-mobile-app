import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { Table, TableBody, TableHead, TableCell, TableRow, TableSortLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';
import Grid from '@material-ui/core/Grid';
import fields from './ActiveTableFields';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const useStyles = makeStyles({
    table: {
        "& > tbody > tr": {
            borderBottom: "1px solid lightgray"
        },
        "& > * > tr > *": {
            verticalAlign: 'top',
            border: "none"
        },
        "& > * > tr > th:last-of-type > div": {
            borderRight: "none",
        },
        "& > * > tr > th": {
            // backgroundColor: Colors.lighterGray,
            padding: 0,
            paddingLeft: "1em",
            borderBottom: "none"
        },
        "& > * tr > th":{
            borderBottom: "1px solid lightgray"
        }

    },
    placeholderRow: {
        "& > td": {
            padding: "8px"
        }
    },
    headerDiv: {
        margin: "1em 0",
        borderRight: "1px solid darkgray"
    }
})

const TableHeader = (props) => {

    const { order, orderBy, onRequestSort } = props;
    const classes = useStyles();

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (<TableHead className={classes.tableTop}>
        <TableRow>
            {fields.map(field => <TableCell
                align={field.align}
                sortDirection={orderBy === field.key ? order : false}>
                <Grid className={classes.headerDiv} container justify="space-between">
                    <span>{field.displayName}</span>
                    <TableSortLabel
                        active={orderBy === field.key}
                        direction={orderBy === field.key ? order : 'asc'}
                        onClick={createSortHandler(field.key)} />
                </Grid>
            </TableCell>)}
        </TableRow>
    </TableHead>)
}

const PatientList = observer(({ search, patients }) => {

    const { t } = useTranslation('translation');

    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('treatmentStart');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const patientSearch = patients.filter(each => { return each.fullName && each.fullName.toLowerCase().includes(search.toLowerCase()) })

    return (
        <Table className={classes.table}>
            <TableHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort} />
            <TableBody>
                {stableSort(patientSearch, getComparator(order, orderBy)).map(patient => <PatientRow key={patient.id} patient={patient} />)}
            </TableBody>
        </Table>
    )

});

const PatientRow = ({ patient }) => {

    return (<TableRow>
        {fields.map(field => <TableCell align={field.align}>{field.formatter ? field.formatter(patient[field.key], patient) : patient[field.key]} </TableCell>)}
    </TableRow>)
}

export default PatientList;