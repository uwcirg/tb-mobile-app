import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PopUp from '../Navigation/PopUp';
import { useTranslation } from 'react-i18next';
import useCalendarStyles from './Calendar/styles';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    key: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        "& > h2": {
            fontSize: "1.25em"
        },
        "& > .days": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            "& > p": {
                textAlign: "left",

            },
            "& > div": {
                display: "flex",
                alignItems: "center",
                marginBottom: ".5em",
                "& > span": {
                    textAlign: "left",
                    marginLeft: "1em"
                }

            }
        }
    }
})

const Key = (props) => {
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <PopUp handleClickAway={props.close}><div className={classes.key}>
                <h2>{t('patient.progress.calendar')}</h2>
                <div className={"days"}>
                    <p>{t('patient.progress.calendarKey.description')}</p>
                    <KeyItem dayProps={{ tookMedication: true }}>{t('patient.progress.calendarKey.good')}</KeyItem>
                    <KeyItem dayProps={{}}>{t('patient.progress.calendarKey.missed')}</KeyItem>
                    <KeyItem dayProps={{ modifier: true }}>{t('patient.progress.calendarKey.notTaken')}</KeyItem>
                    <KeyItem dayProps={{ symptom: true, modifier: true }}>{t('patient.progress.calendarKey.symptoms')}</KeyItem>

                </div>
            </div></PopUp>
    )
}

const KeyItem = (props) => {
    return (
        <div>
            <div>
                <Day {...props.dayProps} date={" "} />
            </div>
            <span>
                {props.children}
            </span>
        </div>
    )
}

const Day = (props) => {
    const classes = useCalendarStyles();

    return (
        <div style={{ width: "40px", height: "40px" }} className={`${classes.day} ${classes.single} ${!props.modifier && (props.tookMedication ? classes.positive : classes.negative)}`}>
            <p>{props.date}</p>
            {props.modifier ? <div style={props.symptom && { backgroundColor: Colors.yellow }} className={classes.modifier}> </div> : ""}
        </div>
    )
}


export default Key;