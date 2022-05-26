import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Colors from '../../Basics/Colors';
import ProfileButton from '../../Components/FlatButton'
import Message from '@material-ui/icons/ChatBubble';
import Add from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'
import ArchiveIcon from '@material-ui/icons/Restore';
import KeyIcon from '@material-ui/icons/VpnKey';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton'
import { MoreVert } from '@material-ui/icons';
import { Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({
    buttons: {
        width: "unset",
        "& > *": {
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
            <MoreOptions />
        </Grid>
    )
})


const MoreOptions = () => {

    const {patientProfileStore} = useStores();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTestNotification = () => {
        patientProfileStore.sendTestReminder();
        handleClose();
    }

    return (
        <div>
            <IconButton aria-label="" onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleTestNotification}>Send a test report reminder</MenuItem>
            </Menu>
        </div>
    ); v
}

export default OptionButtons;