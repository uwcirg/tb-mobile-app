import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../Basics/UseStores';
import Message from '@material-ui/icons/ChatBubble';
import Add from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit'
import ArchiveIcon from '@material-ui/icons/Restore';
import KeyIcon from '@material-ui/icons/VpnKey';
import { useTranslation } from 'react-i18next';
import NewButton from '../../Basics/NewButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button:{
      padding: ".5em"
  }
})

const ButtonList = observer(() => {

    const classes = useStyles();

    const { practitionerUIStore, patientProfileStore } = useStores();
    const { t } = useTranslation('translation');

    const messagePatient = () => {
        practitionerUIStore.goToChannel(patientProfileStore.selectedPatient.details.channelId);
    }

    const buttonData = [
        { onClick: messagePatient, icon: <Message />, text: t("coordinator.patientProfile.options.message") },
        { onClick: practitionerUIStore.openAddPatientNote, icon: <Add />, text: t("coordinator.patientProfile.options.note") },
        { onClick: patientProfileStore.toggleOnChangeDetails, icon: <EditIcon />, text: t("coordinator.patientProfile.options.edit") },
        { onClick: patientProfileStore.toggleOnPasswordReset, icon: <KeyIcon />, text: t("coordinator.patientProfile.options.resetPassword") },
        { onClick: patientProfileStore.toggleOnArchive, icon:<ArchiveIcon />, text: t("coordinator.patientProfile.options.archive"), hide: patientProfileStore.isArchive }
    ]

    return (<>
        {buttonData.map( each => {
            return <NewButton onClick={each.onClick} className={classes.button} icon={each.icon} text={each.text}  />
        })}
    </>)
})

export default ButtonList;