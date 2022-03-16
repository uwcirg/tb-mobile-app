import React from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores'
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Colors from '../../../Basics/Colors'
import { DateTime } from 'luxon'
import { observer } from 'mobx-react';
import Styles from '../../../Basics/Styles';
import Header from './Header';


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
        flexDirection: "column",
        borderTop: "1px solid lightgray",
        borderBottom: "1px solid lightgray",
        padding: ".5em 0 .5em 0"


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

const PatientPreview = observer(() => {
    const classes = useStyles();
    const { practitionerStore } = useStores();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.profile}>
            <Header selectedPatient={practitionerStore.getSelectedPatient} />
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