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
        borderLeft: "solid 5px lightgray"
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
            marginBottom: "0px"
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
                <div className={classes.clear}><IconButton onClick={handleClose}><ClearIcon /></IconButton></div>
                <PatientPreview />
                {props.children}
            </div>
        </>
    )
});

const PatientPreview = observer((props) => {
    const classes = useStyles();
    const { practitionerStore } = useStores();

    console.log(practitionerStore.selectedPatientInfo)

    return (
        <div className={classes.profile}>
            <PatientPicture name={practitionerStore.selectedPatientInfo.givenName} />
            <h2>{practitionerStore.selectedPatientInfo.givenName} {practitionerStore.selectedPatientInfo.familyName}</h2>
            <p>Adherence: {practitionerStore.selectedPatientInfo.adherence}</p>
            <p>Last Contacted: {DateTime.local().toLocaleString()}</p>
            <p className="clickable">View Full Profile</p>
        </div>

    )
})

export default Card;