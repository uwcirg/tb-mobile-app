import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import AddPatient from './AddPatient';
import Typography from '@material-ui/core/Typography';
import Styles from '../../Basics/Styles';
import PeopleIcon from '@material-ui/icons/People';
import Loading from '../Shared/Loading';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import SymptomsIcon from '../../Basics/Icons/Temp';

const useStyles = makeStyles({
    sidebar: {
        width: "300px",
        overflowX: "hidden",
        height: "100vh",
        border: "solid 2px lightgray",
        marginLeft: "auto",
        padding: "1em",
        boxSizing: "border-box",
        paddingTop: "2em"
    },
    sectionHeader: {
        ...Styles.flexRow,
        alignItems: "center",
        justifyContent: "center",
        "& > h2": {
            fontSize: "1.5em",
            marginLeft: ".5em"
        },
        " & > svg": {
            fontSize: "2.25em"
        }
    },
    patientStatus:{
        borderBottom: "solid 1px lightgray"
    },
    section: {
        width: "80%",
        margin: "auto",
        marginTop: "2em",
        "& > p": {
            display: 'block',
            "& > span": {
                marginRight: "1em"
            }
        }
    },
    blue: {
        color: Colors.blue,
    },
    green: {
        color: Colors.green
    },
    symptomList:{
        marginTop: "2em",
        padding: 0,
        listStyle: "none",
        "& > li": {
            display: "flex",
            marginTop: ".5em",
            justifyContent: "space-between"
        }

    }

})

const CohortSideBar = observer((props) => {

    const classes = useStyles();
    const { practitionerStore } = useStores();

    useEffect(() => {
        practitionerStore.getCohortSummary();
    }, [])

    return (
        <div className={classes.sidebar}>
            {practitionerStore.onAddPatientFlow ? <AddPatient /> :
                <div>
                    <SectionHeader title="Cohort Overview" icon={<PeopleIcon />} />
                    {practitionerStore.cohortSummary.loading ? <Loading /> : <>
                        <PatientOverview />
                        <SymptomSummary />

                    </>}
                </div>}
        </div>
    )
})

const PatientOverview = observer(() => {
    const classes = useStyles();
    const cohortSummary = useStores().practitionerStore.cohortSummary.data

    return (
        <div className={`${classes.section} ${classes.patientStatus}`} >
            <p><span className={classes.blue}>{cohortSummary.status.active}</span>Active Patients</p>
            <p><span className={classes.green}>{cohortSummary.status.pending}</span>Pending Patients </p>
        </div>
    )
})

const SymptomSummary = observer(() => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    
    const symptomSummaries = useStores().practitionerStore.cohortSummary.data.symptoms

    return(
        <div className={classes.section}>
        <SectionHeader title="Symptoms" icon={<SymptomsIcon />} />
        <ul className={classes.symptomList}>
        {Object.keys(symptomSummaries).map(each => {
           return symptomSummaries[each] ?  <li>{t(`symptoms.${each}.title`)}: <span>{symptomSummaries[each]}</span></li> : ""
        })}
        </ul>
        </div>
    )

})


const SectionHeader = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.sectionHeader}>
            {props.icon}
            <Typography variant="h2">{props.title}</Typography>
        </div>
    )
}

export default CohortSideBar;