import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import Colors from '../../Basics/Colors';
import ProfileButton from './ProfileButton'
import Message from '@material-ui/icons/ChatBubble';
import Add from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'
import ArchiveIcon from '@material-ui/icons/Restore';
import KeyIcon from '@material-ui/icons/VpnKey';
import { useTranslation } from 'react-i18next';
import Styles from '../../Basics/Styles';

const useStyles = makeStyles({
    buttons: {
        width: "unset",
        "& > button": {
            margin: "3px",
        }
    }
})

const OptionButtons = observer(() => {
    const { practitionerUIStore, patientProfileStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const messagePatient = () => {
        practitionerUIStore.goToChannel(patientProfileStore.selectedPatient.details.channelId);
    }

    return (
        <Grid container justify="flex-end" className={classes.buttons}>
            <ProfileButton onClick={messagePatient}><Message />{t("coordinator.patientProfile.options.message")}</ProfileButton>
            <ProfileButton onClick={practitionerUIStore.openAddPatientNote} ><Add />{t("coordinator.patientProfile.options.note")}</ProfileButton>
            <ProfileButton onClick={patientProfileStore.toggleOnChangeDetails}><EditIcon />{t("coordinator.patientProfile.options.edit")}</ProfileButton>
            <ProfileButton onClick={patientProfileStore.toggleOnPasswordReset} border><KeyIcon />{t("coordinator.patientProfile.options.resetPassword")}</ProfileButton>
            {!patientProfileStore.isArchived && <ProfileButton className={classes.archive} onClick={patientProfileStore.toggleOnArchive} backgroundColor={Colors.warningRed}><ArchiveIcon />{t("coordinator.patientProfile.options.archive")}</ProfileButton>}
        </Grid>
    )
})
export default OptionButtons;