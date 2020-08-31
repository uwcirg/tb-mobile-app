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
import Symptom from '../Shared/Symptom'

const useStyles = makeStyles({
    sidebar: {
        width: "350px",
        overflow: "hidden",
        height: "100vh",
        border: "solid 2px lightgray",
        marginLeft: "auto",
        boxSizing: "border-box",
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
    sectionHeaderContainer:{

    },
    patientStatus: {
        borderBottom: "solid 1px lightgray"
    },
    section: {
        width: "80%",
        padding: "1em 0 1em 0",
        "& > p": {
            margin: ".25em 0 0 0",
            alignItems: "center",
            display: 'flex',
            "& > span:first-child": {
                textAlign: "center",
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
    symptomList: {
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
    symptomExplanation: {
        fontSize: ".75em",
        textAlign: "center"
    },
    priority: {
        flexGrow: 1,
        backgroundColor: props => props.backgroundColor,
        padding: ".5em",
        borderRadius: "5%",
        color: props => props.textColor || "white",
    },
    contentContainer:{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
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
                    
                    {practitionerStore.cohortSummary.loading ? <Loading /> : <div className={classes.contentContainer}>

                         <PatientOverview />
                        <SymptomSummary />

                    </div>}
                </div>}
        </div>
    )
})

const LineItem = (props) => {
    const classes = useStyles(props);
    return (<p><span>{props.value || 0}</span> <span className={classes.priority}>{props.text}</span></p>)
}

const PatientOverview = observer(() => {
    const classes = useStyles();
    const cohortSummary = useStores().practitionerStore.cohortSummary.data
    const { t, i18n } = useTranslation('translation');

    return (
        <>
        <SectionHeader title={t('commonWords.patients')} icon={<PeopleIcon />} />
            <div className={`${classes.section} ${classes.patientStatus}`} >
                <LineItem textColor={"black"} text={`${t('coordinator.cohortOverview.active')} ${t('commonWords.patients')}` } value={cohortSummary.status.active} />
                <LineItem textColor={"gray"} text={`${t('coordinator.cohortOverview.pending')} ${t('commonWords.patients')}`} value={cohortSummary.status.pending} />

            </div>
            <div className={`${classes.section} ${classes.patientStatus}`} >
                <LineItem backgroundColor={Colors.red} text={t('coordinator.cohortOverview.high')} value={cohortSummary.priority.high} />
                <LineItem backgroundColor={Colors.yellow} text={t('coordinator.cohortOverview.medium')} value={cohortSummary.priority.medium} />
                <LineItem backgroundColor={Colors.green} text={t('coordinator.cohortOverview.low')} value={cohortSummary.priority.low} />
            </div>
        </>
    )
})

const SymptomSummary = observer(() => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const symptomSummaries = useStores().practitionerStore.cohortSummary.data.symptoms || {}

    return (
        <div className={classes.section}>
            <SectionHeader title={t('commonWords.symptoms')} icon={<SymptomsIcon />} subtext={t('coordinator.cohortOverview.reportedTime')} />
                {Object.keys(symptomSummaries).map(each => {
                    return symptomSummaries[each] ? <LineItem textColor="black" text={<Symptom string={each} />} value={symptomSummaries[each]} /> : ""
                    
                })}
        </div>
    )

})


const SectionHeader = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.sectionHeaderContainer}>
        <div className={classes.sectionHeader}>
            {props.icon}<Typography variant="h2">{props.title}</Typography>
        </div>
        {props.subtext &&  <p className={classes.symptomExplanation}>{props.subtext}</p>}
        </div>
    )
}

export default CohortSideBar;