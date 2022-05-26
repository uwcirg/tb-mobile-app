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
import { Box, Button, Collapse, Grid } from '@material-ui/core';
import { Event, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import useToggle from '../../../Hooks/useToggle';
import { useLocation } from 'react-router-dom';

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

    const baseUrl = useLocation().pathname

    const buttons = [
        { onClick: messagePatient, icon: <Message />, text: t("coordinator.patientProfile.options.message") },
        { to: `${baseUrl}/add-note`, icon: <Add />, text: t("coordinator.patientProfile.options.note") },
        { to: `${baseUrl}/edit`, icon: <EditIcon />, text: t("coordinator.patientProfile.options.edit") },
        { to: `${baseUrl}/reset-password`, icon: <KeyIcon />, text: t("coordinator.patientProfile.options.resetPassword") },
        { to: `${baseUrl}/archive`, icon: <ArchiveIcon />, text: t("coordinator.patientProfile.options.archive"), hide: patientProfileStore.isArchived },
        { to: `${baseUrl}/add-appointment`, icon: <Event />, text: t('appointments.addAppointment') }
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
        <Collapse in={showActions}>
            <div>
                {buttons.splice(1).map(each => {
                    if (each.hide) return;
                    return <NewButton to={each.to} onClick={each.onClick} className={classes.button} icon={each.icon} text={each.text} />
                })}
            </div>
        </Collapse>
    </>)
})

export default ButtonList;