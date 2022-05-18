import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../../Basics/UseStores';
import Message from '@material-ui/icons/ChatBubble';
import Add from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit'
import ArchiveIcon from '@material-ui/icons/Restore';
import KeyIcon from '@material-ui/icons/VpnKey';
import { useTranslation } from 'react-i18next';
import NewButton from '../../../Basics/NewButton';
import { makeStyles } from '@material-ui/core/styles';
import SectionTitle from './SectionTitle';
import { Box, Button, Collapse, Grid, Grow } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import useToggle from '../../../Hooks/useToggle';

const useStyles = makeStyles({
    button: {
        padding: ".5em"
    },
    toggle: {
        textTransform: "capitalize"
    }
})

const ButtonList = observer(() => {

    const classes = useStyles();

    const [showActions, toggleShowActions] = useToggle(false);

    const { practitionerUIStore, patientProfileStore } = useStores();
    const { t } = useTranslation('translation');

    const messagePatient = () => {
        practitionerUIStore.goToChannel(patientProfileStore.selectedPatient.details.channelId);
    }

    const buttons = [
        { onClick: messagePatient, icon: <Message />, text: t("coordinator.patientProfile.options.message") },
        { onClick: practitionerUIStore.openAddPatientNote, icon: <Add />, text: t("coordinator.patientProfile.options.note") },
        { onClick: patientProfileStore.toggleOnChangeDetails, icon: <EditIcon />, text: t("coordinator.patientProfile.options.edit") },
        { onClick: patientProfileStore.toggleOnPasswordReset, icon: <KeyIcon />, text: t("coordinator.patientProfile.options.resetPassword") },
        { onClick: patientProfileStore.toggleOnArchive, icon: <ArchiveIcon />, text: t("coordinator.patientProfile.options.archive"), hide: patientProfileStore.isArchive }
    ]

    return (<>
        <Grid alignItems='center' container>
            <SectionTitle>{t('mobileUpdate.showActions')}</SectionTitle>
            <Box flexGrow={1} />
            <Button className={classes.toggle} onClick={toggleShowActions}>
                {showActions ? t('patient.home.helpVideos.hide') : t('mobileUpdate.showActions')}
                {showActions ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Button>
        </Grid>
        <Box height=".5em" aria-hidden />
        <NewButton onClick={buttons[0].onClick} className={classes.button} icon={buttons[0].icon} text={buttons[0].text} />
        <Collapse  in={showActions}>
            <div>
                {buttons.splice(1).map(each => {
                    return <NewButton onClick={each.onClick} className={classes.button} icon={each.icon} text={each.text} />
                })}
            </div>
        </Collapse>
    </>)
})

export default ButtonList;