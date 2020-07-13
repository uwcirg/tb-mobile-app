import React from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores'
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Colors from '../../Basics/Colors'
import PatientPicture from '../../Basics/PatientIcon'
import { DateTime } from 'luxon'
import { observer } from 'mobx-react';
import { ButtonBase } from '@material-ui/core';

const useStyles = makeStyles({
    container: {

        height: "100vh",
        width: "100%",
        backgroundColor: "white",
        borderLeft: "solid 1px lightgray"
    },
    clear: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
    },
    profile: {
        margin: "auto",
        alignItems: "center",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        "& > p": {
            margin: "0px"
        },
        "& > h2": {
            margin: "2px",
            fontSize: "1.25em"
        },
        "& > .clickable": {
            color: Colors.buttonBlue
        }
    },
})

const Card = observer((props) => {

    const classes = useStyles();

    const { practitionerStore } = useStores();

    const setSidebar = (id, type) => {
        practitionerStore.selectedRow.visible = true;
    }

    const handleClick = (id, type) => {
        console.log(" " + id + " " + type)
    }

    const handleClose = () => {
        practitionerStore.selectedRow.clearSelection();
    }

    return (
        <>
            <div className={classes.container}>
                {!props.isCohortView && <div className={classes.clear}><IconButton onClick={handleClose}><ClearIcon /></IconButton></div>}
                {!props.isCohortView && <PatientPreview />}
                {props.children}
            </div>
        </>
    )
});

const PatientPreview = observer((props) => {
    const classes = useStyles();
    const { practitionerStore, practitionerUIStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.profile}>
            <PatientPicture name={practitionerStore.getSelectedPatient.fullName} />
            <h2>{practitionerStore.getSelectedPatient.fullName}</h2>
            <p>{t("coordinator.adherance")}: {practitionerStore.getSelectedPatient.adherence}</p>
            <p>{t("coordinator.sideBar.lastContacted")}: {DateTime.fromISO(practitionerStore.getSelectedPatient.lastContacted).toLocaleString(DateTime.DATETIME_SHORT)}</p>
            <ButtonBase onClick={() => {practitionerUIStore.goToPatient(practitionerStore.getSelectedPatient.id)}}> <p className="clickable">{t("coordinator.sideBar.viewFullProfile")}</p></ButtonBase>
            <ButtonBase onClick={() => {practitionerUIStore.goToChannel(practitionerStore.getSelectedPatient.channelId)}}> <p className="clickable">{t("coordinator.sideBar.messagePatient")}</p></ButtonBase>
        </div>

    )
})

export default Card;