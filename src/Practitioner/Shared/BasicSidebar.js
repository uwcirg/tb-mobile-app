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

const useStyles = makeStyles({
    container: {
        position: "fixed",
        right: 0,
        height: "100vh",
        width: "300px",
        padding: "2.5%",
        backgroundColor: "white",
        borderLeft: "solid 1px lightgray"
    },
    filler: {
        width: "400px",
        height: "100vh"
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
        "& > h2":{
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
            {/* Filler to allow the flex displayed hompage to work with the sidebar being fixed position 
        <div className={classes.filler} />*/}
            <div className={classes.container}>
                {!props.isCohortView &&<div className={classes.clear}><IconButton onClick={handleClose}><ClearIcon /></IconButton></div>}
                {!props.isCohortView && <PatientPreview />}
                {props.children}
            </div>
        </>
    )
});

const PatientPreview = observer((props) => {
    const classes = useStyles();
    const { practitionerStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.profile}>
            <PatientPicture name={practitionerStore.selectedPatientInfo.fullName} />
            <h2>{practitionerStore.selectedPatientInfo.fullName}</h2>
            <p>{t("coordinator.adherance")}: {practitionerStore.selectedPatientInfo.adherence}</p>
            <p>{t("coordinator.sideBar.lastContacted")}: {DateTime.local().toLocaleString()}</p>
    <p className="clickable">{t("coordinator.sideBar.viewFullProfile")}</p>
        </div>

    )
})

export default Card;