import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';
import ProfileButton from '../../Components/FlatButton'
import Message from '@material-ui/icons/ChatBubble';
import Add from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit'
import ArchiveIcon from '@material-ui/icons/Restore';
import KeyIcon from '@material-ui/icons/VpnKey';
import { useTranslation } from 'react-i18next';




const ButtonList = observer(() => {

    const { practitionerUIStore, patientProfileStore } = useStores();
    const { t } = useTranslation('translation');

    const messagePatient = () => {
        practitionerUIStore.goToChannel(patientProfileStore.selectedPatient.details.channelId);
    }

    return (<>
        <ProfileButton onClick={messagePatient}><Message />{t("coordinator.patientProfile.options.message")}</ProfileButton>
        <ProfileButton onClick={practitionerUIStore.openAddPatientNote} ><Add />{t("coordinator.patientProfile.options.note")}</ProfileButton>
        <ProfileButton onClick={patientProfileStore.toggleOnChangeDetails}><EditIcon />{t("coordinator.patientProfile.options.edit")}</ProfileButton>
        <ProfileButton onClick={patientProfileStore.toggleOnPasswordReset} border><KeyIcon />{t("coordinator.patientProfile.options.resetPassword")}</ProfileButton>
        {!patientProfileStore.isArchived &&
         <ProfileButton onClick={patientProfileStore.toggleOnArchive} backgroundColor={Colors.warningRed}>
            <ArchiveIcon />{t("coordinator.patientProfile.options.archive")}</ProfileButton>}
    </>)
})

export default ButtonList;