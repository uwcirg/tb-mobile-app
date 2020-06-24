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
    }
})

const MedicationSideBar = observer((props) => {
    const { practitionerStore } = useStores();
    const classes = useStyles();

    const { t, i18n } = useTranslation('translation');

    useEffect(() => {
        practitionerStore.getSelectedPatientSymptoms();
    }, [practitionerStore.selectedRow.patientId])

    return (
        <Basicsidebar>
            <div className={""}>
                <h2 className={classes.header}>{t("coordinator.sideBar.daysMissed")}:</h2>
                <SharedButton text={"Resolve"} onClick={() => {practitionerStore.resolveMedication()} } />
            </div>
        </Basicsidebar>
    )
});

export default MedicationSideBar;