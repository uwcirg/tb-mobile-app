import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';
import Colors from '../../../Basics/Colors';
import { DateTime } from 'luxon';
import Tag from '../../../Components/Tag';
import Grid from '@material-ui/core/Grid';
import Styles from '../../../Basics/Styles';
import FullReport from './FullReport';

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
            padding: ".5em",

        }
    },
    time: {
        ...Styles.flexColumn,
        justifyContent: "center",
        padding: "0 .5em",
        "& > span": {
            fontSize: "1.5em",
            margin: 0
        },
        "& > p": {
            fontSize: "1em",
            margin: 0
        }
    },
    tags: {
        boxSizing: "border-box",
        "& > *": {
            margin: ".25em 0",
            maxWidth: "120px",
            textAlign: "center",
            fontSize: ".8em"
        },
    },
    capitalize: {
        textTransform: "capitalize"
    },
})


const ReportPreview = ({row}) => {

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
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
                <TableCell >
                    <SymptomListPreview list={row.symptoms} />
                </TableCell>
                <TableCell>
                    <Grid className={classes.tags} container direction="column">
                        {row.numberOfDaysAfterRequest > 0 && <Tag backgroundColor={Colors.warningRed}>{`${row.numberOfDaysAfterRequest} ${t('patient.report.dayLate', { count: row.numberOfDaysAfterRequest })}`}</Tag>}
                    </Grid>
                </TableCell>
                <TableCell alig>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <FullReport row={row} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const SymptomListPreview = (props) => {
    const { t } = useTranslation('translation');
    return (<>
        {props.list.length > 0 ? t(`symptoms.${props.list[0]}.title`) : t('coordinator.recentReports.none')}
        {props.list.length > 1 && ` +${props.list.length - 1}`}
    </>)
}

export default ReportPreview;