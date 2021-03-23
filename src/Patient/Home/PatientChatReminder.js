import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InteractionCard from '../../Basics/HomePageCard'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import ExpansionPanel from '../../Basics/ExpansionPanel';

const useStyles = makeStyles({

    container:{
        width: "85%"
    },
    body: {
        width: "120%",
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "1em"
    },

    graphic: {
        display: "block",
        height: "80px",
        marginRight: "1em"
    },
    button: {
        width: "100%",
        "& > button": {
            width: "100%"
        }
    }
});

const PatientChatReminder = () => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (<InteractionCard className={classes.card}>
        <div className={classes.container}>
            <div className={classes.body}>
                <img className={classes.graphic} src="/img/chat.svg" />
                <span>
                    {t('patient.home.chatReminder.body')}
                </span>
            </div>
     
        <ExpansionPanel
            previewClassName={classes.button}
            preview={t('patient.home.chatReminder.button')}>
            <span> Info here</span>
        </ExpansionPanel>
        </div>
    </InteractionCard>)

}

export default PatientChatReminder;