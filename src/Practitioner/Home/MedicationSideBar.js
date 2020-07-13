import React from 'react'
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
            alignSelf: "flex-start"
        }
    },
    buttonContainer: {
        marginTop: "2em",
        width: "100%",
        margin: "auto",
        ...Styles.flexRow,
        justifyContent: "space-evenly"
    }
})

const MissedMedicationSidebar = observer((props) => {
    const { practitionerStore } = useStores();
    const classes = useStyles();

    const { t, i18n } = useTranslation('translation');

    const item = practitionerStore.filteredPatients.photo[practitionerStore.selectedRow.index];

    return (
        <Basicsidebar buttons={
            <>
                <SharedButton text={"Inconclusive"} onClick={() => { /* Pending */ }} color={Colors.yellow} icon={<QIcon />} />
                <SharedButton text={"Positive"} onClick={() => { practitionerStore.resolveMedication() }} />
            </>}>
            <div className={classes.photoContainer} >
                <h2>{t("coordinator.sideBar.daysMissed")}:</h2>
            </div>
        </Basicsidebar>
    )
});

export default MissedMedicationSidebar;


<SharedButton text={"Resolve"} onClick={() => {practitionerStore.resolveMedication()} } />