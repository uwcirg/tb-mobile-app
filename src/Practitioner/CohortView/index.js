import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import AddPatientPrompt from '../AddPatientPrompt'
import Colors from '../../Basics/Colors';
import AdherenceGraph from '../AdherenceGraph';
import Card from '../Shared/Card';
import PersonIcon from '@material-ui/icons/People'
import CohortSideBar from './Sidebar';
import Search from '../../Basics/SearchBar'
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';
import { ButtonBase, Popover } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/AddOutlined'
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Button from '@material-ui/core/Button'
import PopOver from '../Shared/PopOver';

const useStyles = makeStyles({
    title: {
        width: "90%",
        textAlign: "left"
    },
    container: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        "& > div": {
            marginTop: "2em"
        },
        "& > div:last-of-type": {
            marginBottom: "2em"
        },
        height: "100vh",
        overflow: "scroll"
    },
    patientList: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        fontFamily: "Roboto, sans-serif",
        minWidth: "80%",
        maxWidth: "98%"
    },
    singlePatient: {
        display: "flex",
        minHeight: "50px",
        borderBottom: "1px solid lightgray",
        "&:first-child": {
            backgroundColor: "white",
            color: "gray",
            borderRadius: ".5em .5em 0 0",
            fontWeight: "medium"
        },
        "&:last-child": {
            borderBottom: "none"
        },
        "& > div": {
            justifyContent: "flex-start",
            padding: ".5em",
            width: "20%",
            display: "flex",
            alignItems: "center",
            "&:first-child": {
                paddingLeft: "1em"
            },
            "& > p,a,a:visited": {
                color: Colors.buttonBlue,
                cursor: "pointer",
                padding: 0,
                margin: 0,
                width: "100%",
                textAlign: "left"
            }
        }
    },
    superContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row"
    },
    search: {
        width: "30%",
        margin: "unset",
        marginLeft: "auto"
    },
    priorityCircle: {
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        backgroundColor: Colors.calendarGreen
    },
    highPriority: {
        backgroundColor: Colors.calendarRed
    },
    noPatients: {
        width: "100%",
        textAlign: "center"
    },
    addPatient: {
        borderRadius: "1em",
        color: "white",
        backgroundColor: Colors.buttonBlue,
        marginLeft: "auto",
        display: "flex",
        height: "3em",
        padding: "1em",
        width: "160px",
        display: "flex",
        justifyContent: "space-evenly",
        fontSize: "1em"
    },
    header: {
        width: "90%",
        display: "flex",
        alignItems: "center"
    },
    button: {
        backgroundColor: Colors.buttonBlue
    }
})

const PatientsView = observer((props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const { practitionerStore } = useStores();

    const toggleAddPatient = () => {
        practitionerStore.onAddPatientFlow = !practitionerStore.onAddPatientFlow
    }

    return (
        <>
                        {practitionerStore.newActivationCode && <PopOver title={"New Activation Code"} close={() => { practitionerStore.newActivationCode = "" }}> <p>{practitionerStore.newActivationCode}</p> </PopOver>}
        <div className={classes.superContainer}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h1 className={classes.title}>{t("coordinator.titles.myPatients")}</h1>
                    <ButtonBase onClick={toggleAddPatient} className={classes.addPatient}><PlusIcon /><p>Add Patient</p></ButtonBase>
                </div>
                <AdherenceGraph />
                <Patients icon={<PersonIcon />} title={t("coordinator.cardTitles.allPatients")} list={props.patientList} handlePatientClick={props.handlePatientClick} />
                <PendingPatients  list={props.tempList} />
            </div>
            <CohortSideBar />
        </div>
        </>

    )
})

const PendingPatients = (props) => {
    const classes = useStyles();
    const { practitionerStore } = useStores();

    let list = props.list.map((patient, index) => {
        return (
            <div key={`patient-list-view-${index}`} className={classes.singlePatient}>
                <div className={classes.name}>
                    <a onClick={() => { props.handlePatientClick(patient.id) }}>
                        {patient.fullName}
                    </a>
                </div>

                <div>
                    {patient.phoneNumber}
                </div>

                <div>
                    <Button onClick={() => { practitionerStore.resetActivationCode(patient.id) }} className={classes.button} variant="contained" > Reset Code</Button>
                </div>
            </div>
        )
    })

    return (
        <Card>
            {list}
        </Card>

    )
}

const Patients = (props) => {
    const classes = useStyles();
    const [sort, setSort] = useState("treatmentStart")
    const [search, setSearch] = useState("")
    const { t, i18n } = useTranslation('translation');


    const isSortingAdherence = () => {
        return sort === "adherence"
    }

    const sorted = props.list.slice().sort((a, b) => {

        if (sort === "treatmentStart") {
            return DateTime.fromISO(a[sort]).diff(DateTime.fromISO(b[sort]))
        } else {
            if (a[sort] < b[sort]) { return -1; }
            if (a[sort] > b[sort]) { return 1; }
            return 0;
        }

        return 0
    }).filter(each => {

        return each.fullName && each.fullName.toLowerCase().includes(search.toLowerCase())
    })

    let list = ""
    sorted.length > 0 && (list = sorted.map((patient, index) => {
        return (
            <div key={`patient-list-view-${index}`} className={classes.singlePatient}>
                <div className={classes.name}>
                    <a onClick={() => { props.handlePatientClick(patient.id) }}>
                        {patient.fullName}
                    </a>
                </div>
                <div>
                    <div className={`${classes.priorityCircle} ${patient.adherence < .85 && classes.highPriority}`} />
                </div>
                <div>
                    {DateTime.fromISO(patient.treatmentStart).toLocaleString(DateTime.DATE_SHORT)}
                </div>
                <div>
                    {patient.lastReport ? patient.lastReport.date : "No Reports"}
                </div>
                <div>
                    {Math.round(patient.adherence * 100)}%
                </div>
                <div>
                    {patient.currentStreak} {t("time.days")}
                </div>
            </div>
        )
    }))

    const labels = (<div key={`patient-list-view-top`} className={classes.singlePatient}>
        <div className={classes.name} onClick={() => { setSort("fullName") }}>
            {t("coordinator.patientTableLabels.name")}
        </div>
        <div className={classes.name} onClick={() => { setSort("adherence") }}>
            {t("coordinator.patientTableLabels.priority")} {isSortingAdherence() ? <DownIcon /> : <UpIcon />}
        </div>
        <div>
            {t("coordinator.patientTableLabels.treatmentStart")}
        </div>
        <div>
            {t("coordinator.patientTableLabels.lastSubmission")}
        </div>
        <div onClick={() => { setSort("adherence") }}>
            {t("coordinator.patientTableLabels.adherance")} {isSortingAdherence() ? <DownIcon /> : <UpIcon />}
        </div>
        <div>
            {t("coordinator.patientTableLabels.streak")}
        </div>

    </div>)

    return (
        <Card icon={props.icon} headerChildren={<Search className={classes.search} handleChange={(event) => { setSearch(event.target.value) }} placeholder="Search by Name" />} title={props.title}>
            <div className={classes.patientList}>
                {labels}
                {list && list.length > 0 ? list : <p className={classes.noPatients}>No Patients Found</p>}
            </div>
            {props.temporary && <AddPatientPrompt />}
        </Card>
    )
}


export default PatientsView;