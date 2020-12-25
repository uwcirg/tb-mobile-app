import React, { useEffect, useState } from 'react'
import NewButton from '../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'
import InteractionCard from '../../Basics/InteractionCard';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import ActionIcon from '@material-ui/icons/PlaylistAddCheck';
import IconButton from '@material-ui/core/IconButton'
import WarningIcon from '@material-ui/icons/Warning';
import WarningOutlined from '@material-ui/icons/ReportProblemOutlined';
import Down from '@material-ui/icons/KeyboardArrowDown'
import Up from '@material-ui/icons/KeyboardArrowUp'
import Grow from '@material-ui/core/Collapse'
import { DateTime } from 'luxon';

const useStyles = makeStyles({
    confirmation: {
        ...Styles.flexRow,
        marginBottom: "1em",
        alignContent: "center"
    },
    confirmationText: {
        ...Styles.flexColumn,
        paddingLeft: "1em",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "50%",
        textAlign: "left",
    },
    check: {
        color: Colors.approvedGreen,
        fontSize: "2.5em",
    },
    confirmationHeader: {
        ...Styles.flexRow,
        fontSize: "1.25em",
        margin: 0,
        "& > svg": {
            color: Colors.approvedGreen,
            marginLeft: ".5em"
        }
    },
    bottomButton: {
        margin: "1em",
        "& > svg": {
            fontSize: "1.25em"
        }
    },
    warning: {
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingLeft: "1em",
        width: "90%",
        "& > span": {
            margin: "0 auto 0 .5em"
        },
        "& > svg": {
            color: Colors.red,
        }
    },
    buttons: {

    },
    grow: {
        width: "100%",
        "& > div > div > button": {
            margin: ".5em auto"
        }
    },
    override: {
        padding: "5px"
    }
})

const ActionBox = observer(() => {
    const classes = useStyles();
    const { patientStore, patientUIStore } = useStores();
    const { t } = useTranslation('translation');
    const [show, setShow] = useState(false)

    const handleReportClick = (date) => {
        patientStore.uiState.selectedCalendarDate = date;
        patientUIStore.startHistoricalReport();
    }

    const toggleShow = () => {
        setShow(!show);
    }

    return (
        <InteractionCard className={classes.override} upperText={<><WarningIcon />{"Action Needed"}</>} id="intro-missed">
            <div className={classes.warning}><WarningOutlined /><span> {patientStore.missingReports.length} Missing Treatment Logs</span><IconButton onClick={toggleShow}> {show ? <Up /> : <Down />}</IconButton></div>
            <Grow in={show} className={classes.grow}>
                {patientStore.missingReports.map(date => {
                    return <NewButton key={`back-report-${date}`} onClick={()=>{handleReportClick(date)}} icon={<Clipboard />} text={DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)} />
                })}
            </Grow>

        </InteractionCard>)
});

export default ActionBox;