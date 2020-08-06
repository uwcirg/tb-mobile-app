
import React, { useEffect } from 'react'
import Basicsidebar from '../Shared/BasicSidebar'
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import { groupBy } from 'lodash';
import makeStyles from '@material-ui/core/styles/makeStyles'
import Colors from '../../Basics/Colors';
import SharedButton from '../Shared/SharedButton'
import QIcon from '@material-ui/icons/HelpOutline';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import Question from '@material-ui/icons/HelpOutline';
import Symptom from '../Shared/Symptom'
import { SevereSymptoms } from '../../Basics/SymptomsSeperation';

const useStyles = makeStyles({
    header: {
        fontSize: "1.25em"
    },
    symptoms: {
        margin: "auto",
        minHeight: "100px",
        maxHeight: "200px",
        width: "90%",
        overflow: "scroll",
        "& > p": {
            paddingLeft: "1em"
        }
    },
    symptomContainer: {
        width: "100%",
        "& > h2": {
            fontSize: "1em",
            textAlign: "center"
        }
    },
    buttonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: ".5em"
    },
    listContainer: {
        marginTop: "5px",
        display: "flex",
        "& > .list": {
            "& > p": { margin: "0 0 .5em 0" },
            display: "flex",
            flexDirection: "column",
            paddingLeft: ".5em"
        }
    },
    circle: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: Colors.yellow,
        marginRight: "1em"
    },
    day: {
        display: "flex",
        flexDirection: "column",
        fontWeight: "medium",
        "& > p": {
            margin: 0
        },
        "& > .line": {
            marginLeft: "5px",
            borderLeft: "1px solid black",
            flexGrow: "1"
        },
        "& > .day": {
            display: "flex",
            alignItems: "center"
        }
    },
    severe:{
        backgroundColor: `${Colors.warningRed}`
    }
})

const SymptomSidebar = observer((props) => {


    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const dates = Object.keys(practitionerStore.selectedPatientSymptoms.summary);

    useEffect(() => {
        practitionerStore.getSelectedPatientSymptoms();

    }, [practitionerStore.selectedRow.index])

    const findCommonElements = (arr1, arr2) => { 
        return arr1.some(item => arr2.includes(item)) 
    } 

    return (
        <Basicsidebar buttons={
            <>
                <SharedButton text={"Resolve"} onClick={() => { practitionerStore.resolveSymptoms() }} />
                <SharedButton icon={<Question />} color="#F2C94C" text={"Pending"} onClick={() => { /* TODO: Pending */ }} />
            </>
        }>
            <h2 className={classes.header}>{t("coordinator.sideBar.symptomsSince")}:</h2>
            {practitionerStore.selectedPatientSymptoms.loading ?
                <p> {t("coordinator.sideBar.loading")}...</p> :
                <div className={classes.symptoms}> {dates.map((each) => {
                    return (
                        <div className={classes.listContainer} key={`symptom-sidebar-container-${each}`}>
                            <div className={classes.day}>
                                <div className="day">
                                    <div className={`${classes.circle} ${findCommonElements(practitionerStore.selectedPatientSymptoms.summary[each], SevereSymptoms) && classes.severe}`} > </div>
                                    {DateTime.fromISO(each).toLocaleString(DateTime.DATE_SHORT)}
                                </div>
                                <div className="line" />
                            </div>
                            <div className="list">
                                {practitionerStore.selectedPatientSymptoms.summary[each] && practitionerStore.selectedPatientSymptoms.summary[each].map((symptom) => {
                                    return <p key={`symptom-sidebar-${symptom}`}><Symptom string={symptom} /></p>
                                })}
                            </div>
                        </div>
                    )
                })} </div>}

        </Basicsidebar >
    )
});

export default SymptomSidebar;