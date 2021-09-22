import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import AdherenceGraph from './AdherenceGraph';
import { useTranslation } from 'react-i18next';
import PlusIcon from '@material-ui/icons/AddOutlined'
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import ProfileButton from '../../Components/FlatButton';
import SectionTitle from '../../Components/Practitioner/SectionTitle';
import ActivationCodePopup from './ActivationCodePopUp'
import PatientList from './PatientTable';
import Search from '../../Basics/SearchBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Collapse from '@material-ui/core/Collapse';

import activeFields from './TableViews/ActiveTableFields'
import pendingFields from './TableViews/PendingTableFields'
import archivedFields from './TableViews/ArchivedTableFields'
import useToggle from '../../Hooks/useToggle';

import AddPatient from './AddPatient'

const PatientsView = observer((props) => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { practitionerStore } = useStores();

    const [search, setSearch] = useState('');
    const [showForm, toggleShowForm] = useToggle(false);
    const [tab, setTab] = React.useState(0);

    useEffect(() => {
        practitionerStore.getArchivedPatients();
    }, [])

    const tabOptions = [
        { text: t('coordinator.cohortOverview.active'), list: practitionerStore.patientList, fields: activeFields },
        { text: t('coordinator.cohortOverview.pending'), list: practitionerStore.pendingPatients, fields: pendingFields },
        { text: t('commonWords.archived'), list: practitionerStore.archivedPatients, fields: archivedFields }
    ]

    const tabProps = { selectedTab: tab, setSelectedTab: setTab }

    return (
        <>
            <ActivationCodePopup activationCode={practitionerStore.newActivationCode} close={() => { practitionerStore.newActivationCode = "" }} />
            <div className={classes.superContainer}>
                <div className={classes.container}>
                    <SectionTitle>{t("coordinator.titles.myPatients")}</SectionTitle>
                    <AdherenceGraph />
                    <div>
                    <Collapse in={showForm}>
                            <AddPatient toggleForm={toggleShowForm} />
                    </Collapse>
                    </div>
                    <div className={classes.patientListContainer}>
                        <Grid className={classes.options} container justify='space-between'>
                            <SectionTitle>{t("coordinator.titles.myPatients")}</SectionTitle>
                            {!showForm && <ProfileButton onClick={toggleShowForm}><PlusIcon />{t('coordinator.addPatientFlow.title')}</ProfileButton>}
                        </Grid>
                        <Grid className={classes.options} container justify='space-between' alignItems="center">
                            <div className={classes.tabs}>
                                {tabOptions.map((tab, index) => { return <Tab key={`table-tab-${index}`} {...tabProps} index={index}>{tab.text}: ({tab.list.length})</Tab> })}
                            </div>
                            <Search value={search} className={classes.search} handleChange={(event) => { setSearch(event.target.value) }}
                                placeholder={t('coordinator.cohortOverview.searchByName')} />
                        </Grid>
                        <PatientList patients={tabOptions[tab].list} search={search} fields={tabOptions[tab].fields} />
                    </div>
                </div>
            </div>
        </>
    )
})

const Tab = ({ index, selectedTab, children, setSelectedTab }) => {
    const classes = useStyles({ index: index });
    return (<Button className={`${(index !== selectedTab) && classes.offTab}`} onClick={() => { setSelectedTab(index) }}>{children}</Button>)
}

const useStyles = makeStyles({
    patientListContainer: {
        paddingTop: "2em"
    },
    offTab: {
        backgroundColor: `${Colors.lighterGray} !important`,
        color: `${Colors.textDarkGray} !important`,
        border: `solid 1px lightgray`,
        borderLeft: "none",
        borderBottom: "none"
    },
    tabs: {
        alignSelf: "flex-end",
        fontSize: "1em",
        "& > button": {
            borderRadius: 0,
            padding: ".5em .75em .25em .75em",
            backgroundColor: "white",
            color: Colors.blue,
            border: `solid 1px ${Colors.lightgray}`,
            borderBottom: "none",
            borderRight: "none"
        },
        "& > button:last-of-type":{
            borderRight: `solid 1px ${Colors.lightgray}`
        },
        "& > button:hover": {
            backgroundColor: "white"
        }
    },
    superContainer: {
        width: "100%"
    },
    container: {
        maxWidth: "950px",
        flexGrow: 1,
        display: "flex",
        padding: "2em 4em",
        flexDirection: "column",
        justifyContent: "flex-start",
        "& > div": {
            marginTop: "2em"
        },
        "& > div:last-of-type": {
            marginBottom: "2em"
        },
        height: "100vh",
        overflow: "scroll"
    },
    search: {
        margin: "1em 0",
        width: 'fit-content',
        paddingRight: "1em",
        "&:placeholder": {
            fontSize: "14px"
        }
    }
})

export default PatientsView;