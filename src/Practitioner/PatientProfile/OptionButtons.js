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
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    buttons: {
        width: "200px",
        marginLeft: "auto",
        padding: "1em",
        "& > button": {
            margin: ".5em .5em 0 .5em",
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
        <Grid container direction="column" className={classes.buttons}>
            <Typography variant={"h2"}>{t('coordinator.patientProfile.options.title')}</Typography>
            <ProfileButton onClick={messagePatient}><Message />{t("coordinator.patientProfile.options.message")}</ProfileButton>
            <ProfileButton onClick={practitionerUIStore.openAddPatientNote} ><Add />{t("coordinator.patientProfile.options.note")}</ProfileButton>
            <ProfileButton onClick={patientProfileStore.toggleOnChangeDetails}><EditIcon />{t("coordinator.patientProfile.options.edit")}</ProfileButton>
            <ProfileButton backgroundColor={Colors.warningRed}><ArchiveIcon />Mark Patient As Completed</ProfileButton>
            <ProfileButton onClick={patientProfileStore.toggleOnPasswordReset} backgroundColor={Colors.warningRed} border><KeyIcon />{t("coordinator.patientProfile.options.resetPassword")}</ProfileButton>
        </Grid>
    )
})
export default OptionButtons;