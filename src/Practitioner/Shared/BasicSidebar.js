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
import PersonButton from '@material-ui/icons/PersonRounded'
import ChatIcon from '@material-ui/icons/Forum'
import Styles from '../../Basics/Styles';
import ProfileButton from '../PatientProfile/ProfileButton'

import Message from '@material-ui/icons/ChatBubbleOutlineRounded';
import Add from '@material-ui/icons/AddCircle';


const useStyles = makeStyles({
    container: {
        height: "100vh",
        width: "100%",
        backgroundColor: "white",
        borderLeft: "solid 1px lightgray",
        ...Styles.flexColumn,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    clear: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
    },
    profile: {
        alignItems: "left",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        "& > .clickable": {
            color: Colors.buttonBlue
        }
    },
    picture: {
        alignSelf: "center",
    },
    patientInfo: {
        width: "100%",
        display: "flex",
        flexDirection: "column"

    },
    buttonContainer: {
        margin: "1em",
        width: "100%",
        ...Styles.flexRow,
        justifyContent: "center",
        "& > button:first-child": {
            marginRight: ".5em"
        }
    },
    header: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        "& > h2": {
            padding: 0,
            margin: 0,
            color: Colors.buttonBlue
        },
        "& > h2:hover": {
            cursor: "pointer"
        }
    },
    profileItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& > span, & > p": {
            margin: ".5em 0 0 0",
            padding: "0",
        },
        "& > span": {
            fontSize: "1em",
            fontWeight: "500"
        }
    },
    resolutionButtons: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: "1em",
        "& > button": {
            flexBasis: "40%",
            margin: ".5em",
            padding: '.5em',
            "& > span": {
                fontSize: "1em",
                display: "flex",
                alignItems: "center",
            },
        }
    },
    childrenContainer: {
        width: "100%",
        margin: "auto"
    }
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
                <div className={classes.childrenContainer}>
                    {props.children}
                </div>
                <div className={classes.resolutionButtons}>
                    {props.buttons}
                </div>
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
            <div className={classes.header}>
                <PatientPicture name={practitionerStore.getSelectedPatient.fullName} />
                <h2
                    onClick={() => { practitionerUIStore.goToPatient(practitionerStore.getSelectedPatient.id) }}>
                    {practitionerStore.getSelectedPatient.fullName}
                </h2>
                <div className={classes.buttonContainer}>
                    <ProfileButton onClick={() => { practitionerUIStore.goToChannel(practitionerStore.getSelectedPatient.channelId) }} ><Message />{t("coordinator.patientProfile.options.message")}</ProfileButton>
                    <ProfileButton backgroundColor={"white"}
                        border color={Colors.buttonBlue}
                        onClick={() => {
                            practitionerUIStore.goToPatient(practitionerStore.getSelectedPatient.id)
                            practitionerUIStore.openAddPatientNote();
                        }}
                    ><Add />{t("coordinator.patientProfile.options.note")}</ProfileButton>
                </div>
            </div>

            {/*
                <IconButton onClick={() => { practitionerUIStore.goToPatient(practitionerStore.getSelectedPatient.id) }}> <PersonButton />{t("coordinator.profile")}</IconButton>
                <IconButton onClick={() => { practitionerUIStore.goToChannel(practitionerStore.getSelectedPatient.channelId) }}><ChatIcon />{t("coordinator.message")}</IconButton>
                */}

            <div className={classes.patientInfo}>
                <ProfileItem text={t("coordinator.adherence")} value={practitionerStore.getSelectedPatient.adherence} />
                <ProfileItem text={t("coordinator.daysInTreatment")} value={practitionerStore.getSelectedPatient.daysInTreatment} />
                <ProfileItem text={t("coordinator.sideBar.lastContacted")} value={DateTime.fromISO(practitionerStore.getSelectedPatient.lastContacted).toLocaleString(DateTime.DATE_SHORT)} />
            </div>

        </div>

    )
})


const ProfileItem = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.profileItem}><span>{props.text}:</span>  <p>{props.value}</p></div>
    )
}

export default Card;