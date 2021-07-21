import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import InteractionCard from '../../Basics/HomePageCard';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import AccessAlarmIcon from '@material-ui/icons/AlarmOn';
import TimeDialog from '../../Components/TimeDialog';
import Grid from '@material-ui/core/Grid';
import ClickableText from '../../Basics/ClickableText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import SplitTextPreventWrapSpacing from '../../Utility/SplitTextPreventWrapSpacing';

const useStyles = makeStyles({
    daily: {
        width: "100%",
        boxSizing: "border-box"
    },
    options: {
        color: Colors.buttonBlue,
        fontSize: "2.5em",
        padding: 0,
        margin: 0,
    },
    icon: {
        color: Colors.buttonBlue,
        fontSize: "2.5em"
    },
    reminder: { padding: "1em 1em 0 1em" },
    bottomLabel: {
        display: "block",
        width: "100%",
        margin: 0,
        textAlign: "center"
    },
    enable: {
        "& > span": {
            lineHeight: "1em"
        },
        border: `1px solid ${Colors.buttonBlue}`,
        textTransform: "none",
        color: Colors.buttonBlue,
        padding: ".5em",
        fontSize: "1em",
        marginLeft: "1em"
    },
    reminderText: {
        padding: "0",
        lineHeight: "1.2em"
    },
    menuContainer: {
        padding: "1em"
    },
    top: {
        padding: "0 1em",
        width: "100%",
        borderBottom: `solid 1px ${Colors.gray}`
    },
    noPadding: {
        padding: 0
    },
    capitalize: {
        textTransform: "none "
    },
    disabledBottom: {
        padding: "1em .5em 1em 1em"
    }

})

const Card = observer(() => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { patientStore } = useStores();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);

    const closeDialog = () => { setOpen(false) }

    const handleAccept = () => {
        patientStore.updateNotificationTime();
        closeDialog();
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openTimeDialog = () => {
        setOpen(true);
    }

    return (<InteractionCard upperText={<><AccessAlarmIcon />{t('patient.reminders.medicationReminder')}</>} id="intro-reminders-card">
        <div className={classes.daily}>
            {patientStore.reminderTime ? <>
                <Grid container wrap="nowrap" alignItems="center" justify="space-between" className={classes.top}>
                    <AccessAlarmIcon className={classes.icon} />
                    <Typography className={classes.reminderText} variant="body1"><SplitTextPreventWrapSpacing text={t('patient.reminders.reminderEnabled')} /></Typography>
                    <Typography align="center" className={classes.reminderText} variant="body1">{t('patient.reminders.at')}</Typography>
                    <Typography onClick={openTimeDialog} className={classes.options} variant="body1">{DateTime.fromISO(patientStore.reminderTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</Typography>
                </Grid>
                <Grid className={classes.menuContainer} container justify="flex-end">
                    <ClickableText className={classes.capitalize} onClick={handleClick} icon={<MoreVertIcon style={{ fontSize: "1.2em" }} />} text={t('patient.reminders.options')}></ClickableText>
                </Grid>
                <MenuTest anchorEl={anchorEl} handleChange={openTimeDialog} handleClose={handleClose} handleDisable={patientStore.disableMedicationReminder} />
            </> :
                <>
                    <Grid className={classes.top} style={{ paddingBottom: ".5em" }} justify="space-between" alignItems="center" wrap="nowrap" container>
                        <Grid wrap="nowrap" alignItems="center" container>
                            <AlarmOffIcon style={{ color: Colors.red }} className={classes.icon} />
                            <Typography align="center" style={{ width: "100%" }} className={classes.reminderText} variant="body1"> {t('patient.reminders.reminderDisabled')}</Typography>
                        </Grid>
                    </Grid>

                    <Grid className={classes.disabledBottom} container alignItems="center" wrap="nowrap">
                        <Typography className={classes.reminderText}>{t('patient.reminders.explanation')}</Typography>
                        <Option className={classes.fixButton} onClick={() => { setOpen(true) }}>{t('patient.reminders.enable')}</Option>
                    </Grid>
                </>
            }
        </div>

        <TimeDialog
            title={t('patient.reminders.whatTime')}
            open={open}
            handleCancel={closeDialog}
            value={patientStore.newReminderTime}
            setValue={(value) => { patientStore.newReminderTime = value }}
            closeDialog={closeDialog}
            handleAccept={handleAccept} />
    </InteractionCard>)

})

const Option = (props) => {
    const classes = useStyles({ color: props.color });
    return <Button {...props} disableElevation className={`${classes.enable} ${props.className}`} />
}


const MenuTest = ({ anchorEl, handleClose, handleChange, handleDisable }) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    const change = () => {
        handleClose();
        handleChange && handleChange();
    }

    const disable = () => {
        handleClose();
        handleDisable && handleDisable();
    }

    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            classes={{ list: classes.noPadding, paper: classes.noPadding }}
        >
            <MenuItem style={{ color: Colors.buttonBlue }} className={classes.delete} onClick={change}>{t('patient.reminders.changeTime')}</MenuItem>
            <MenuItem style={{ color: Colors.red }} onClick={disable}>{t('patient.reminders.disable')}</MenuItem>
        </Menu>
    )
}

export default Card;