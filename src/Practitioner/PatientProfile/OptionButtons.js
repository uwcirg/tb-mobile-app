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

const useStyles = makeStyles({
    buttons: {
        margin: "0 auto",
        paddingLeft: "1em",
        width: "200px",
        "& > button": {
            margin: ".5em .5em 0 .5em",
        },
        height: "100%"
    },
    title:{
        marginBottom: "0"
    },
    archive:{
        marginTop: "auto !important"
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
            {/* <SectionLabel className={classes.title}>{t('coordinator.patientProfile.options.title')}</SectionLabel> */}
            <ProfileButton onClick={messagePatient}><Message />{t("coordinator.patientProfile.options.message")}</ProfileButton>
            <ProfileButton onClick={practitionerUIStore.openAddPatientNote} ><Add />{t("coordinator.patientProfile.options.note")}</ProfileButton>
            <ProfileButton onClick={patientProfileStore.toggleOnChangeDetails}><EditIcon />{t("coordinator.patientProfile.options.edit")}</ProfileButton>
            <ProfileButton onClick={patientProfileStore.toggleOnPasswordReset} border><KeyIcon />{t("coordinator.patientProfile.options.resetPassword")}</ProfileButton>
            {!patientProfileStore.isArchived && <ProfileButton className={classes.archive} onClick={patientProfileStore.toggleOnArchive} backgroundColor={Colors.warningRed}><ArchiveIcon />{t("coordinator.patientProfile.options.archive")}</ProfileButton>}
        </Grid>
    )
})
export default OptionButtons;