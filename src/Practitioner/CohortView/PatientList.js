import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { Table, TableBody, TableHead, TableCell, TableRow, TableSortLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Priority from '../Shared/Priority';
import Colors from '../../Basics/Colors';
import { DateTime } from 'luxon';
import Search from '../../Basics/SearchBar'
import { common } from '@material-ui/core/colors';

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
    profileLink: {
        "&, &:visited": {
            color: Colors.buttonBlue,
            textDecoration: "none"
        }
    },
    search: {
        width: 'fit-content',
        margin: 'unset',
        paddingRight: "1em"
    },
})


const Name = ({ fullName, id }) => {

    const classes = useStyles();
    const { push } = useStores().routingStore;
    //Handle Patient Link
    const handlePatientClick = (event) => {
        event.preventDefault();
        push(`/patients/${id}`)
    }
    return <a className={classes.profileLink} href={`/patients/${id}`} onClick={handlePatientClick}>{fullName}</a>
}

const percentComponent = (value) => {
    return `${Math.round(value * 100)}%`
}

const fields = [
    {
        key: "fullName",
        displayName: "Name",
        formatter: (value, patient) => <Name {...patient} />
    },
    {
        key: "priority",
        displayName: "Priority",
        formatter: (value) => <Priority index={value} />
    },
    {
        key: "treatmentStart",
        displayName: "App Start",
        formatter: (value) => `${DateTime.fromISO(value).toLocaleString(DateTime.DATE_MED)}`
    },
    {
        key: "adherence",
        displayName: "Adherence",
        formatter: percentComponent,
        align: "right"
    },
    {
        key: "photoAdherence",
        displayName: "Photo Adherence",
        formatter: percentComponent,
        align: "right"
    }
]

const TableHeader = (props) => {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (<TableHead>
        <TableRow>
            {fields.map(field => <TableCell
                align={field.align}
                sortDirection={orderBy === field.key ? order : false}
            >
                {field.displayName}
                <TableSortLabel
                    active={orderBy === field.key}
                    direction={orderBy === field.key ? order : 'asc'}
                    onClick={createSortHandler(field.key)}
              />
            </TableCell>)}
        </TableRow>
    </TableHead>)
}

const PatientList = observer(() => {

    const { t } = useTranslation('translation');

    const classes = useStyles();
    const patients = useStores().practitionerStore.patientList;

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('treatmentStart');
    const [search,setSearch] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const patientSearch = patients.filter(each => {return each.fullName && each.fullName.toLowerCase().includes(search.toLowerCase())})

    return (<div>
        <Search className={classes.search} handleChange={(event) => { setSearch(event.target.value) }} placeholder={t('coordinator.cohortOverview.searchByName')} />
        <Table>
            <TableHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort} />
            <TableBody>
                {stableSort(patientSearch, getComparator(order, orderBy)).map(patient => <PatientRow key={patient.id} patient={patient} />)}
            </TableBody>
        </Table>
    </div>)

});

const PatientRow = ({ patient, index }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<TableRow>
        {fields.map(field => <TableCell align={field.align}>{field.formatter ? field.formatter(patient[field.key], patient) : patient[field.key]} </TableCell>)}
    </TableRow>)
}

export default PatientList;