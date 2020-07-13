
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

const useStyles = makeStyles({
    header: {
        fontSize: "1.25em"
    },
    symptoms: {
        margin: "auto",
        minHeight: "100px",
        maxHeight: "200px",
        width: "80%",
        backgroundColor: Colors.lightgray,
        overflow: "scroll",
        borderRadius: ".5em",
        "& > p": {
            paddingLeft: "1em"
        }
    },
    day: {
        fontWeight: "medium"
    },
    symptomContainer: {
        width: "100%",
        "& > h2": {
            fontSize: "1.25em",
            textAlign: "center"
        }
    },
    buttonContainer:{
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
})

const SymptomSidebar = observer((props) => {
    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    useEffect(() => {
        practitionerStore.getSelectedPatientSymptoms();
       
    }, [practitionerStore.selectedRow.index])

    return (
        <Basicsidebar>
            <div className={classes.symptomContainer}>
                <h2 className={classes.header}>{t("coordinator.sideBar.symptomsSince")}:</h2>
                {practitionerStore.selectedPatientSymptoms.loading ?
                    <p> {t("coordinator.sideBar.loading")}...</p> : <div className={classes.symptoms}> {Object.keys(practitionerStore.selectedPatientSymptoms.summary).map((each) => {
                        return (
                            <>
                                <p className={classes.day}>{each}</p>
                                {practitionerStore.selectedPatientSymptoms.summary[each] && practitionerStore.selectedPatientSymptoms.summary[each].map((symptom) => {
                                    return <p>{symptom}</p>
                                })}
                            </>
                        )
                    })} </div>}
            </div>
            <div className={classes.buttonContainer}>
                <SharedButton text={"Resolve"} onClick={() => {practitionerStore.resolveSymptoms()} } />
            </div>
        </Basicsidebar>
    )
});

export default SymptomSidebar;