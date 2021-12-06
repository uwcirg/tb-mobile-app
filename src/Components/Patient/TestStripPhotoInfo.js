import React from 'react';
import Instructions from '../../Patient/Information/TestInstructions';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import useToggle from '../../Hooks/useToggle';
import Grow from '@material-ui/core/Collapse';
import { useTranslation } from 'react-i18next';
import WarningBox from '../../Basics/WarningBox';
import ClickableText from '../../Basics/ClickableText';
import Typography from '@material-ui/core/Typography'
import TimeIcon from '@material-ui/icons/WatchLater';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    info: {
        fontSize: "1em",
        width: "100%"
    },
    infoBox: {
        width: "100%",
        padding: "1em",
        border: "none"
    },
    timeIcon:{
        marginRight: ".5em"
    },
    infoText:{
        lineHeight: "1em"
    }
})

const TestStripPhotoInfo = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [showPopUp, togglePopUp] = useToggle(false);

    return (
        <WarningBox className={classes.infoBox}>
            <Grid alignItems="center" wrap="nowrap" container className={classes.info}>
                <TimeIcon className={classes.timeIcon} />
                <Typography className={classes.infoText} variant="body1" color="initial">{t('patient.report.photo.help.wait')}</Typography>
            </Grid>
            <ClickableText onClick={togglePopUp} className={classes.info} hideIcon text={<span>{t('patient.report.photo.help.instructions')}{showPopUp ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</span>} />
            <Grow in={showPopUp}>
                <Instructions />
            </Grow>
        </WarningBox>
    )
}

export default TestStripPhotoInfo;