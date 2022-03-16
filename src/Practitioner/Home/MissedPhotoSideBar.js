import React, { useEffect } from 'react'
import Basicsidebar from '../Shared/Sidebar'
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import SharedButton from '../Shared/SharedButton'
import QIcon from '@material-ui/icons/HelpOutline';
import { useTranslation } from 'react-i18next';
import SidebarList from './SidebarList'

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
    daysList: {
        width: "80%",
        textAlign: "center",
        borderRadius: "10px",
        height: "200px",
        overflow: "scroll",
        backgroundColor: Colors.lightgray
    }
})

const MissedPhotoSideBar = observer((props) => {
    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const patientResponse = practitionerStore.filteredPatients.missedPhoto[`${Object.keys(practitionerStore.filteredPatients.missedPhoto)[practitionerStore.selectedRow.index]}`];
    const days = patientResponse.data

    const cleanedData = days && days.map(each => {return {date: each.date, details: [each.reason || t('coordinator.sideBar.noReason')]}})

    return (
        <Basicsidebar
            buttons={
                <>
                    <SharedButton text={t('coordinator.sideBar.contactedPatient')} onClick={() => { practitionerStore.resolveMissedPhoto(patientResponse.patientId) }} />
                </>}>
            <div className={classes.photoContainer} >
                <h2>{t("coordinator.sideBar.daysMissed")}: {days && days.length} </h2>
                {practitionerStore.missedDays.loading ? t('commonWords.loading') : <SidebarList data={cleanedData}  />}

            </div>
        </Basicsidebar>
    )
});

export default MissedPhotoSideBar;
