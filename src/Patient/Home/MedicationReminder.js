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
import AddReminder from './Reminder/index';
import AccessAlarmIcon from '@material-ui/icons/AlarmOn';
import TimeDialog from '../../Components/TimeDialog';
import Grid from '@material-ui/core/Grid';
import ClickableText from '../../Basics/ClickableText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



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
    button: {
        "& > svg": {
            fontSize: ".75em"
        },
        display: "flex",
        alignItems: "center",
        "& > span": {
            lineHeight: "1em"
        },
        flex: "1 1 0",
        border: props => `1px solid ${props.color || Colors.buttonBlue}`,
        textTransform: "none",
        color: props => props.color || Colors.buttonBlue,
        padding: ".5em",
        fontSize: "1em",
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
    }

})

const Reminders = observer(() => {
    const { patientUIStore } = useStores();

    return (
        <>
            {patientUIStore.onAddReminder && <AddReminder />}
            <Card />
        </>

    )
})

const SplitReminderText = () => {
    const { t } = useTranslation('translation');
    const text = t('patient.reminders.reminderEnabled')

    return (
        <>
            {text.split(" ").map(each => {
                return (<>{each}<br /></>)
            })}
        </>
    )

}

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

    return (<InteractionCard upperText={<><AccessAlarmIcon />{t('patient.reminders.medicationReminder')}</>} id="intro-reminders-card">
        <div className={classes.daily}>
            {patientStore.reminderTime ? <>
                <Grid container wrap="nowrap" alignItems="center" justify="space-between" className={classes.top}>
                    <AccessAlarmIcon className={classes.icon} />
                    <Typography style={{ display: "inline-block" }} className={classes.reminderText} variant="body1"><SplitReminderText /></Typography>
                    <Typography align="center" className={classes.reminderText} variant="body1">at</Typography>
                    <Typography className={classes.options} variant="body1">{DateTime.fromISO(patientStore.reminderTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</Typography>
                </Grid>

                <Grid className={classes.menuContainer} container justify="flex-end">
                    <ClickableText onClick={handleClick} icon={<MoreVertIcon style={{ fontSize: "1.2em" }} />} text={t('patient.reminders.options')}></ClickableText>
                </Grid>
                <MenuTest anchorEl={anchorEl} handleClose={handleClose} />
            </> : <Grid alignItems="center" container>
                <Grid item xs={8}>{t('patient.reminders.explanation')}</Grid>
                <Grid item xs={4} >
                    <Option onClick={() => { setOpen(true) }} className={classes.timeButton}>{t('patient.reminders.enable')}</Option>
                </Grid>
            </Grid>
            }
        </div>

        <TimeDialog
            open={open}
            handleCancel={closeDialog}
            value={patientStore.newReminderTime}
            setValue={(value) => { patientStore.newReminderTime = value }}
            closeDialog={closeDialog}
            handleAccept={handleAccept} />
    </InteractionCard>)

})

const MenuTest = ({ anchorEl, handleClose, handleItemClick }) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            classes={{list: classes.noPadding, paper: classes.noPadding}}
        >
            <MenuItem style={{color: Colors.buttonBlue}} className={classes.delete} onClick={handleItemClick}>{t('patient.reminders.changeTime')}</MenuItem>
            <MenuItem style={{color: Colors.red}} onClick={handleItemClick}>{t('patient.reminders.disable')}</MenuItem>
        </Menu>
    )
}

const Option = (props) => {
    const classes = useStyles({ color: props.color });
    return <Button {...props} disableElevation className={classes.button} />
}


export default Reminders;