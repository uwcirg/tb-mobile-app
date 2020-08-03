import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import ProfileButton from './ProfileButton'
import Message from '@material-ui/icons/ChatBubble';
import Add from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({

    container: {
        ...Styles.flexColumn,
        flexBasis: "33%",
        flexGrow: 1,
        backgroundColor: "white",
        padding: "1em"
    },
    profileHeader: {
        display: "flex",
        alignItems: "center",
        "& > h1": {
            ...Styles.header,
            margin: 0,
            marginRight: "auto"
        }
    },
    item: {
        ...Styles.flexColumn,
        marginRight: ".5em",
        marginTop: "1em",
        "& > span": {

            margin: 0,
            ...Styles.profileItem
        },
        "& > span:nth-child(1)": {
            textTransform: "capitalize"
        },
        "& > span:nth-child(2)": {
            fontWeight: "bold",
            paddingTop: ".5em"
        }
    },
    detailGroup: {
        display: "flex",
        flexWrap: "true",
        width: "100%",
        "& > div": {
            marginRight: "2em"
        },
        marginBottom: "1em"
    },
    buttons: {
        marginTop: "auto",
        display: "flex",
        "& > button": {
            marginRight: "1em"
        }
    }

})

const PatientInfo = observer((props) => {

    const classes = useStyles();
    const { practitionerStore } = useStores();
    const { t, i18n } = useTranslation('translation');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const getDate = (iso) => {
        return (DateTime.fromISO(iso).toLocaleString(DateTime.DATE_MED))
    }

    return (<div className={classes.container}>
        {practitionerStore.selectedPatient.details && <div className={classes.profileHeader}>
            <h1>{practitionerStore.selectedPatient.details.fullName}</h1>
            <IconButton aria-controls="patient-options" aria-haspopup="true" onClick={handleMenu}>
                <Settings />
            </IconButton>
            <Menu
                    id="patient-options"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem >{t("coordinator.patientProfile.options.archive")}</MenuItem>
                </Menu> </div>}
        <div className={classes.detailGroup}>
            <Item top={t("coordinator.patientProfile.age")} bottom={practitionerStore.selectedPatient.details.age || "N/A"} />
            <Item top={t("coordinator.patientProfile.gender")} bottom={practitionerStore.selectedPatient.details.gender|| "N/A"} />
            <Item top={t("coordinator.patientProfile.phoneNumber")} bottom={practitionerStore.selectedPatient.details.phoneNumber} />
        </div>
        <Item top={t("coordinator.patientProfile.treatmentStart")} bottom={getDate(practitionerStore.selectedPatient.details.treatmentStart)} />
        <Item top={t("coordinator.patientProfile.lastContacted")} bottom={getDate(practitionerStore.selectedPatient.details.lastContacted)} />

        <Buttons />

    </div>)

})

const Buttons = observer(() => {
    const { practitionerUIStore, practitionerStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const messagePatient = () => {
        practitionerUIStore.goToChannel(practitionerStore.selectedPatient.details.channelId);
    }
    return (
        <div className={classes.buttons}>
            <ProfileButton onClick={messagePatient}><Message />{t("coordinator.patientProfile.options.message")}</ProfileButton>
            <ProfileButton backgroundColor={"white"} border color={Colors.buttonBlue}><Add />{t("coordinator.patientProfile.options.note")}</ProfileButton>
        </div>
    )
})

const Item = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.item}>
            <span>{props.top}</span>
            <span>{props.bottom}</span>
        </div>)
}

export default PatientInfo;