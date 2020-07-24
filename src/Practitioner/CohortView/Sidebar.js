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
            alignItems: "center",
            display: 'flex',
            "& > span:first-child": {
                marginRight: "1em",
                width: "25px"
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
            flexDirection: "row-reverse",
            marginTop: ".5em",
            justifyContent: "space-between"
        }

    },
    symptomExplanation:{
        fontSize: ".75em",
        textAlign: "center"
    },
    priority:{
        backgroundColor: props => props.backgroundColor,
        padding: ".5em",
        borderRadius: "5%",
        color: "white"
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

const PriorityView = (props) =>{
    const classes = useStyles(props);
    return ( <p><span>{props.value || 0}</span> <span className={classes.priority}>{props.text}</span></p>)
}

const PatientOverview = observer(() => {
    const classes = useStyles();
    const cohortSummary = useStores().practitionerStore.cohortSummary.data

    return (
        <>
        <div className={`${classes.section} ${classes.patientStatus}`} >
            <p><span>{cohortSummary.status.active}</span>Active Patients</p>
            <p><span>{cohortSummary.status.pending}</span>Pending Patients </p>
        </div>
        <div className={`${classes.section} ${classes.patientStatus}`} >
            <PriorityView backgroundColor={Colors.red} text={"High Priority"} value={cohortSummary.priority.high} />
            <PriorityView backgroundColor={Colors.yellow} text={"Medium Priority"} value={cohortSummary.priority.medium} />
            <PriorityView backgroundColor={Colors.green} text={"Low Priority"} value={cohortSummary.priority.low} />
        </div>
        </>
    )
})

const SymptomSummary = observer(() => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    
    const symptomSummaries = useStores().practitionerStore.cohortSummary.data.symptoms

    return(
        <div className={classes.section}>
        <SectionHeader title="Symptoms" icon={<SymptomsIcon />} />
        <p className={classes.symptomExplanation}>Reported In The Past 7 Days</p>
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