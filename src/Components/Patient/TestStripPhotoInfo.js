import React from 'react';
import Instructions from '../../Patient/Information/TestInstructions';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import WarningBox from '../../Basics/WarningBox';
import Typography from '@material-ui/core/Typography'
import TimeIcon from '@material-ui/icons/WatchLater';
import HelpIcon from '@material-ui/icons/Help';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import Right from '@material-ui/icons/KeyboardArrowRight'
import BlockIcon from '@material-ui/icons/Block';
import LaterIcon from '@material-ui/icons/Update';
import useStores from '../../Basics/UseStores';

const useStyles = makeStyles({

    panel: {
        boxShadow: "none",
        // backgroundColor: Colors.highlightYellow,
    },
    info: {
        fontSize: "1em",
        width: "100%",
        "& span": {
            lineHeight: "1em"
        }

    },
    infoBox: {
        padding: "0",
        backgroundColor: "white",
        border: "none",
        "& div.MuiButtonBase-root.MuiExpansionPanelSummary-root": {
            margin: 0,
        }
    },
    timeIcon: {
        marginRight: ".5em"
    },
    summary: {
        padding: "0em"
    }
})

const TestStripPhotoInfo = ({ showSkipOptions = true }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { patientUIStore, patientStore } = useStores();

    return (
        <WarningBox className={classes.infoBox}>
            <Typography variant="body1"><strong>{t('patient.report.important')}</strong>:</Typography>
            <ExpansionPanel className={classes.panel} expanded={false} >
                <ExpansionPanelSummary className={classes.summary}>
                    <TimeIcon className={classes.timeIcon} />
                    <Typography className={classes.infoText} variant="body1" color="initial">{t('patient.report.photo.help.wait')}</Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary className={classes.summary} expandIcon={<Right />}>
                    <HelpIcon className={classes.timeIcon} />
                    <Typography className={classes.infoText} variant="body1" color="initial">{t('patient.information.testInstructions')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Instructions />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            {showSkipOptions && <>
                <Typography style={{ padding: ".5em 0" }} variant="body1"><strong>{t('patient.report.photo.other')}</strong>:</Typography>
                <ExpansionPanel onClick={patientUIStore.goToHome} className={classes.panel} expanded={false} >
                    <ExpansionPanelSummary className={classes.summary} expandIcon={<Right />}>
                        <LaterIcon className={classes.timeIcon} />
                        <Typography className={classes.infoText} variant="body1" color="initial">{t('patient.report.photo.submitLater')}</Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
                <ExpansionPanel onClick={patientStore.setPhotoSkipped} className={classes.panel} expanded={false}>
                    <ExpansionPanelSummary className={classes.summary} expandIcon={<Right />}>
                        <BlockIcon className={classes.timeIcon} />
                        <Typography className={classes.infoText} variant="body1" color="initial">{t('patient.report.photo.unable')}</Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
            </>}
        </WarningBox>
    )
}

export default TestStripPhotoInfo;