import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import AddPatientPrompt from '../AddPatientPrompt'
import Colors from '../../Basics/Colors';
import AdherenceGraph from '../AdherenceGraph';
import Card from '../Shared/Card';
import PersonIcon from '@material-ui/icons/People'
import Search from '../../Basics/SearchBar'
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';
import PlusIcon from '@material-ui/icons/AddOutlined'
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import RefreshIcon from '@material-ui/icons/Refresh';
import Priority from '../Shared/Priority';
import ProfileButton from '../../Components/FlatButton';
import AddPatient from './AddPatient';
import SectionTitle from '../../Components/Practitioner/SectionTitle';
import { Typography } from '@material-ui/core';
import ActivationCodePopup from './ActivationCodePopUp'

const PatientsView = observer((props) => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { practitionerStore } = useStores();

    useEffect(() => {
        practitionerStore.getArchivedPatients();
    }, [])

    const toggleAddPatient = () => {
        practitionerStore.onAddPatientFlow = !practitionerStore.onAddPatientFlow
    }

    return (
        <>
           <ActivationCodePopup activationCode={practitionerStore.newActivationCode} close={() => { practitionerStore.newActivationCode = "" }}  />
            <div className={classes.superContainer}>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <SectionTitle>{t("coordinator.titles.myPatients")}</SectionTitle>
                        {!practitionerStore.onAddPatientFlow && <ProfileButton onClick={toggleAddPatient} className={classes.addPatient}><PlusIcon />{t('coordinator.addPatientFlow.title')}</ProfileButton>}
                    </div>
                    <AdherenceGraph />
                    <PendingPatients list={props.tempList} />
                    <Patients icon={<PersonIcon />} title={t("coordinator.cardTitles.activePatients")} list={props.patientList} handlePatientClick={props.handlePatientClick} />
                    <Patients defaultHidden icon={<PersonIcon />} title={t("coordinator.cardTitles.archivedPatients")} list={practitionerStore.archivedPatients} handlePatientClick={props.handlePatientClick} />
                </div>
                <div className={classes.sidebar}>
                    {practitionerStore.onAddPatientFlow && <AddPatient />}
                </div>
            </div>
        </>
    )
})

const PendingPatients = (props) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { practitionerStore } = useStores();

    let list = "";

    if (props.list && props.list.map) {

        list = props.list.map((patient, index) => {
            const launchReset = () => { practitionerStore.resetActivationCode(patient.id) }
            return (
                <div key={`patient-list-view-${index}`} className={`${classes.singlePatient} ${classes.pending}`}>
                    <div className={classes.name}>
                        <Typography>
                            {patient.fullName}
                        </Typography>
                    </div>

                    <div>
                        {patient.phoneNumber}
                    </div>

                    <div>
                        <ProfileButton
                            onClick={launchReset}
                            className={classes.refreshButton} variant="contained" >
                            <RefreshIcon />
                            {t('coordinator.addPatientFlow.resetCode')}
                        </ProfileButton>
                    </div>
                </div>
            )
        })
    }

    return (
        <Card title={t("coordinator.cardTitles.awaitingActivation")}>
            <PendingTitles />
            {list}
        </Card>

    )
}

const Patients = (props) => {
    const classes = useStyles();
    const [sort, setSort] = useState("treatmentStart")
    const [search, setSearch] = useState("")
    const [reverse, setReverse] = useState(false);
    const { t } = useTranslation('translation');


    const isSortingAdherence = () => {
        return sort === "adherence"
    }

    const sorted = props.list ? props.list.slice().sort((a, b) => {

        let value = 0

        if (sort === "treatmentStart") {
            value = DateTime.fromISO(a[sort]).diff(DateTime.fromISO(b[sort]))
        } else {
            if (a[sort] < b[sort]) { value = -1; }
            if (a[sort] > b[sort]) { value = 1; }
        }

        reverse && (value *= -1)

        return value;

    }).filter(each => {

        return each.fullName && each.fullName.toLowerCase().includes(search.toLowerCase())
    }) : [];

    const handlePrioritySort = () => {
        if (sort === "priority") {
            setReverse(!reverse)
        } else {
            setSort("priority")
        }
    }

    let list = ""
    sorted.length > 0 && (list = sorted.map((patient, index) => {

        return (
            <div key={`patient-list-view-${index}`} className={classes.singlePatient}>
                <div className={classes.name}>
                    <a onClick={() => { props.handlePatientClick(patient.id) }}>
                        {patient.fullName}
                    </a>
                </div>
                <div className={classes.priorityLabel}>
                    <Priority index={patient.priority} />
                </div>
                <div>
                    {DateTime.fromISO(patient.treatmentStart).toLocaleString(DateTime.DATE_SHORT)}
                </div>
                <div>
                    {patient.lastReport ? DateTime.fromISO(patient.lastReport.date).toLocaleString(DateTime.DATE_SHORT) : t('report.noReportsYet')}
                </div>
                <div>
                    {Math.round(patient.adherence * 100)}%
                </div>
                <div>
                    {Math.round(patient.photoAdherence * 100)}%
                </div>
            </div>
        )
    }))

    const labels = (<div key={`patient-list-view-top`} className={classes.singlePatient}>
        <div className={classes.name} onClick={() => { setSort("fullName") }}>
            {t("coordinator.patientTableLabels.name")}
        </div>
        <div className={classes.name} onClick={handlePrioritySort}>
            {t("coordinator.patientTableLabels.priority")} {isSortingAdherence() ? <DownIcon /> : <UpIcon />}
        </div>
        <div>
            {t("coordinator.patientTableLabels.treatmentStart")}
        </div>
        <div>
            {t("coordinator.patientTableLabels.lastSubmission")}
        </div>
        <div onClick={() => { setSort("adherence") }}>
            {t("coordinator.patientTableLabels.adherence")} {isSortingAdherence() ? <DownIcon /> : <UpIcon />}
        </div>
        <div>
            {t("coordinator.patientTableLabels.photoAdherence")}
        </div>

    </div>)

    return (
        <Card defaultHidden={props.defaultHidden} icon={props.icon} headerChildren={<Search className={classes.search} handleChange={(event) => { setSearch(event.target.value) }} placeholder={t('coordinator.cohortOverview.searchByName')} />} title={props.title}>
            <div className={classes.patientList}>
                {labels}
                {list && list.length > 0 ? list : <p className={classes.noPatients}>{t('coordinator.cohortOverview.noPatientsFound')}</p>}
            </div>
            {props.temporary && <AddPatientPrompt />}
        </Card>
    )
}

const PendingTitles = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (
        <div key={`patient-list-view-titles`} className={`${classes.singlePatient} ${classes.pending}`}>
            <div className={classes.name}>
                <Typography variant="body1">{t('coordinator.patientTableLabels.name')}</Typography>
            </div>
            <div>
                <Typography>{t('patient.userFields.phoneNumber')}</Typography>
            </div>
            <div>
                <Typography>{t('coordinator.addPatientFlow.activationCode')}</Typography>
            </div>
        </div>
    )
}

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
            "& > a,a:visited": {
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
    noPatients: {
        width: "100%",
        textAlign: "center"
    },
    addPatient: {
        flexBasis: "180px"
    },
    header: {
        display: "flex",
        width: "90%",
        justifyContent: "space-between",
        "& > h1": {
            padding: 0,
            margin: 0
        },
        "& > button": {
            flexWrap: "nowrap"

        }
    },
    sidebar: {
        width: "300px",
        overflow: "hidden",
        height: "100vh",
        border: "solid 2px lightgray",
        marginLeft: "auto",
        boxSizing: "border-box",
    },
    pending: {
        justifyContent: "space-between",
        "& > div": {
            flexGrow: 1
        }
    },
    priorityLabel: {
        maxWidth: "75px",
        "& > span": {
            flex: "1 1 0"
        }
    }

})

export default PatientsView;