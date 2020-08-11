import React, { useEffect } from 'react'
import Basicsidebar from '../Shared/BasicSidebar'
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import SharedButton from '../Shared/SharedButton'
import QIcon from '@material-ui/icons/HelpOutline';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({

    photoContainer: {
        width: "100%",
        ...Styles.flexColumn,
        alignItems: "center",
        "& > img": {
            height: "300px",
            width: "90%",
            objectFit: "contain"
        },
        "& > h2": {
            fontSize: "1em",
            display: "block",
            width: "60%",
            textAlign: "center"
        }
    },
    buttonContainer: {
        marginTop: "2em",
        width: "100%",
        margin: "auto",
        ...Styles.flexRow,
        justifyContent: "space-evenly"
    },
    daysList:{
        width: "80%",
        textAlign: "center",
        borderRadius: "10px",
        height: "200px",
        overflow: "scroll",
        backgroundColor: Colors.lightgray
    }
})

const MissedMedicationSidebar = observer((props) => {
    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    useEffect(() => {
        practitionerStore.getPatientMissedDays()
    }, [practitionerStore.selectedRow.index])

    return (
        <Basicsidebar buttons={
            <>
                <SharedButton text={t('coordinator.sideBar.contactedPatient')} onClick={() => { practitionerStore.resolveMedication() }} />
            </>}>
            <div className={classes.photoContainer} >
                <h2>{t("coordinator.sideBar.daysMissed")}: {practitionerStore.missedDays.days && practitionerStore.missedDays.days.length} </h2>
                {practitionerStore.missedDays.loading ? "Loading" : <div className={classes.daysList}> {practitionerStore.missedDays.days && practitionerStore.missedDays.days.map((day) => { return <p>{DateTime.fromISO(day.date).toLocaleString(DateTime.DATE_SHORT)}</p> })} </div>}

            </div>
        </Basicsidebar>
    )
});

export default MissedMedicationSidebar;


<SharedButton text={"Resolve"} onClick={() => { practitionerStore.resolveMedication() }} />