import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
//import Colors from '../Basics/Colors'
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Colors from '../../Basics/Colors';
import Card from './Card'
import useStores from '../../Basics/UseStores';
import { Badge } from '@material-ui/core';
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';


const useStyles = makeStyles({
    container: {
        minHeight: "50px",
        width: "100%",
        borderRadius: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    superContainer: {
        backgroundColor: Colors.lightgray,
        borderRadius: "1em",
        width: "50%",
        marginTop: "1em",
        overflow: "hidden",
        border: "solid 1px lightgray",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"
    },
    lineItem: {
        backgroundColor: "white",
        "&:hover": {
            backgroundColor: "#cce6ff",
            "& > div": {
                fontWeight: "medium"
            }
        },
        minHeight: "50px",
        borderTop: "solid 1px lightgray",
        "&:first-of-type": {
            borderTop: "none"
        },
        "&:last-of-type": {
            borderRadius: "0 0 1em 1em"
        },
        display: "flex",
        alignItems: "center",
        "& > p:first-child": {
            flexBasis: "25%",
            marginLeft: "2em"
        }
    },
    title: {
        margin: "0 0 0 1em",
        display: "flex",
        alignItems: "center",
        "& > h2": {
            marginLeft: ".5em",
            fontSize: "1.25em"
        }
    },
    selected: {
        backgroundColor: "#cce6ff"
    },
    badge: {
        position: "absolute",
        ...Styles.flexCenter,
        height: "40px",
        width: "40px",
        color: "white",
        backgroundColor: "#FF6B6B",
        borderRadius: "50%",
        top: "-15px",
        left: "-15px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
    },
    noTasks: {
        ...Styles.flexCenter
    },
    rowLoading: {
        display: "flex",
        marginLeft: "1em"
    },
    symptomList: {
        fontStyle: "italic",
        color: Colors.textGray
    },
    reportDate: {
        marginLeft: "auto",
        marginRight: "2em",
        color: Colors.textGray
    }
})

const HomePageCard = (props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const handleClick = (type, index) => {
        props.setSidebar(type, index)
    }

    const patientList = props.patientList.map((each, index) => {
        return (<SingleLine
            type={props.type}
            selected={props.selectedType === props.type && props.selectedId === index}
            key={`${props.type}-${index}-line`}
            patientId={each.patientId}
            photoDate={props.type === "photo" && each.createdAt}
            onClick={() => handleClick(props.type, index)}
        />)
    })

    return (

        <Card icon={props.icon} title={props.title}>
            {(props.badgeContent && props.badgeContent > 0) && <div className={classes.badge} color="primary"><p>{props.badgeContent} </p></div>}
            <div className={classes.container}>
                {props.patientList.length > 0 ? patientList : <div className={classes.noTasks}><p>{t("coordinator.noTasks")}</p></div>}
            </div>
        </Card>
    )
}

const SingleLine = observer((props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const { practitionerStore } = useStores();

    const patient = practitionerStore.getPatient(props.patientId)

    return (
        <div className={`${classes.lineItem} ${props.selected ? classes.selected : ""}`} onClick={props.onClick}>
            {patient ?
                <>
                    <p>{patient.fullName} </p>
                    <TaskInfo photoDate={props.photoDate} {...patient} type={props.type} />
                </> :
                <p>{t('coordinator.sideBar.loading')}...</p>}
        </div>
    )
})

const TaskInfo = (props) => {
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();

    if (props.type === 'symptom') {

        const displayedSymptom = t(`symptoms.${props.lastSymptoms.symptomList[0]}.title`)
        const more = props.lastSymptoms.symptomList.length - 1

        return (
            <>
                <p className={classes.symptomList}>{displayedSymptom} {more > 0 && <>+{more}</>}</p>
                <p className={classes.reportDate}>{props.lastSymptoms.date ? DateTime.fromISO(props.lastSymptoms.date).toLocaleString(DateTime.DATETIME_SHORT) : "N/A"}</p>
            </>
        )
    } else if (props.type === 'photo') {
        return (
            <p className={classes.reportDate}>{props.photoDate ? DateTime.fromISO(props.photoDate).toLocaleString(DateTime.DATETIME_SHORT) : "N/A"}</p>
        )
    } else if (props.type === 'missed') {
        return <p className={classes.reportDate}>{props.lastMissedDay ? DateTime.fromISO(props.lastMissedDay).toLocaleString(DateTime.DATE_SHORT) : "N/A"}</p>
    } else if (props.type === 'support') {
        return <p className={classes.reportDate}>{(props.supportRequests && props.supportRequests.length > 0) ? DateTime.fromISO(props.supportRequests[0].date).toLocaleString(DateTime.DATE_SHORT) : "N/A"}</p>
    } else {
        return ""
    }
}

HomePageCard.propTypes = {
    title: PropTypes.string,
    patientList: PropTypes.array,
    onComplete: PropTypes.func
};

SingleLine.propTypes = {
    id: PropTypes.number.isRequired
};


export default HomePageCard;