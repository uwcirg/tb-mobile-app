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

const useStyles = makeStyles({
    photoInfo: {
        "& > h2": {
            fontSize: "1em",
            margin: ".5em 0 .5em 0"
        },
        "& > ul": {
            display: "block",
            margin: "0",
            padding: 0,
            marginLeft: "1em",
            "& > li": {
                margin: 0,
                padding: 0,
                marginTop: "5px",
                "& > span": {
                    fontWeight: "bold"
                },
                "& > li": {
                    marginLeft: "1em",
                }
            }
        },
    },
    info: {
        fontSize: "1em",
        width: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        margin: ".5em 0 .5em 0",
        "& > span": {
            alignItems: "center",
            display: "flex",
            textAlign: "left",
            width: "100%",
            textTransform: "none"
        }
    },
    infoBox: {
        width: "90%",
        margin: "auto",
        marginBottom: ".5em",
        marginTop: ".5em"
    },
})

const TestStripPhotoInfo = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [showPopUp, togglePopUp] = useToggle(false);

    return (
        <WarningBox className={classes.infoBox}>
            <ClickableText onClick={togglePopUp} className={classes.info} hideIcon text={<span>{t('patient.report.photo.help.instructions')}{showPopUp ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</span>} />
            <Grow in={showPopUp}>
                    <Instructions />
            </Grow>
            <div className={classes.photoInfo}>
                <h2>{t('patient.report.photo.help.remember')}:</h2>
                <ul>
                    <li>{t('patient.report.photo.help.wait')}</li>
                    <li>{t('patient.report.photo.help.straight')}</li>
                    <li>{t('patient.report.photo.help.retakeIf')}</li>
                </ul>
            </div>

        </WarningBox>
    )
}

export default TestStripPhotoInfo;