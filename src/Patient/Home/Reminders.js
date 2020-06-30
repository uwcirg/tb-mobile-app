import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import InteractionCard from '../../Basics/InteractionCard';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { DateTime } from 'luxon';
import { TimePicker } from "@material-ui/pickers/TimePicker";
import Colors from '../../Basics/Colors'
import { MileStone } from '../Progress/Milestones'
import ClickableText from '../../Basics/ClickableText';


const useStyles = makeStyles({
    header: { fontSize: "1em", fontWeight: "bold", textAlign: "left", width: "100%", paddingLeft: "1em" },
    daily: { width: "100%", marginBottom: "1em"},
    upcoming: { width: "100%" },
    options: { display: "flex", flexDirection: "row", padding: "0 1em 0 1em", alignItems: "center", justifyContent: "space-between" },
    timeButtonGroup: {
        border: `solid 1px ${Colors.buttonBlue}`,
        color: Colors.buttonBlue,
        fontSize: "1.5em",
        width: "90%",
        "& > button": {
            color: "inherit",
            textTransform: "capitalize",
            borderTop: "none",
            borderBottom: "none"
        }
    },
    buttonContainer: {width: "100%", display: "flex", justifyContent: "center"},
    reminder: {padding: "1em"}
})

const CompName = observer(() => {

    const classes = useStyles();
    const { t, i18n } = useTranslation(['reminders','translation']);
    const { patientStore, patientUIStore } = useStores();
    const timeOpen = false;

    return (<InteractionCard upperText={t('reminders')}>
        <div className={classes.daily}>
            <Header>{t('daily')}</Header>
            <div className={classes.options}>
                <p>Enabled daily at {DateTime.fromISO(patientStore.reminderTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</p>
            </div>
            <div className={classes.buttonContainer}>
                <ButtonGroup className={classes.timeButtonGroup} fullWidth>
                    <Button className={classes.timeButton}>Change Time</Button>
                    <Button>Disable</Button>
                </ButtonGroup>
            </div>

        </div>
        <div className={classes.upcoming}>
            <Header>{t('upcoming')}</Header>
            <div className={classes.reminder}>
                {patientStore.milestones[0] && <MileStone milestone={patientStore.milestones[0]} />}
                <ClickableText onClick={patientUIStore.goToProgress} className={classes.bottomText} hideIcon text={<>{t("translation:patient.home.progress.viewAll")}</>} />
            </div>
        </div>

    </InteractionCard>)

})

const Header = (props) => {
    const classes = useStyles();

    return (<Typography className={classes.header} variant="h1">{props.children}</Typography>)
}

export default CompName;

/*
  {timeOpen ? <TimePicker
                    open={timeOpen}
                    className={classes.timeSelect}
                    ampm={false}
                    value={DateTime.fromISO(patientStore.notificationTime)}
                    onChange={(e) => {
                        setTimeOpen(false);
                        handleTimeChange(e);
                    }} /> : <Button className={classes.timeButton} onClick={() => { setTimeOpen(true) }}>{DateTime.fromISO(patientStore.reminderTime).toLocaleString(DateTime.TIME_24_SIMPLE)} </Button>}
*/