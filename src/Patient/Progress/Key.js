import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import { DemoDay as Day } from './Calendar'
import PopUp from '../Navigation/PopUp';
import { useTranslation } from 'react-i18next';

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
    const { t, i18n } = useTranslation('translation');

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


export default Key;