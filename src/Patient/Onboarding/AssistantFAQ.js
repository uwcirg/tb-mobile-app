import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@material-ui/icons/Check';
import XIcon from '@material-ui/icons/Clear';
import Styles from '../../Basics/Styles';

const useStyles = makeStyles({
    faq: {
        height: "60vh",
        ...Styles.flexColumn,
        justifyContent: "space-evenly",
        padding: "1em",
        "& > h1": { fontSize: "1.5em" },
        "& > h2": { fontSize: "1.25em", margin: 0, padding: 0 },
        "& > ul > li": {
            listStyle: "none",
            display: "flex",
            alignItems: "center",
            "& > svg": {
                fontSize: ".8em",
                marginRight: ".5em"
            }
        }
    },
    green: {
        color: "green"
    },
    red: {
        color: "red"
    },
    bottom: {
        borderTop: "1px solid lightgray",
        padding: "1em",
        marginTop: "auto"
    },
})

const AssistantFAQ = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.faq}>
            <h1>{t('patient.onboarding.coordinator.title')}</h1>
            <h2>{t('patient.onboarding.coordinator.will.title')}</h2>
            <ul>
                {t('patient.onboarding.coordinator.will.items', { returnObjects: true }).map(each => {
                    return <li> <CheckIcon className={classes.green} /> {each}</li>
                })}
            </ul>

            <h2>{t('patient.onboarding.coordinator.wont.title')}</h2>
            <ul>
                {t('patient.onboarding.coordinator.wont.items', { returnObjects: true }).map(each => {
                    return <li><XIcon className={classes.red} /> {each}</li>
                })}
            </ul>

            <div className={classes.bottom}>
                <p>{t('patient.onboarding.coordinator.outro')}</p>
            </div>
        </div>
    )
}

export default AssistantFAQ;