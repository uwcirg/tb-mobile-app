import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DefaultMessage from './DefaultMessage'
import ForumIcon from '@material-ui/icons/Forum'
import Colors from '../../../Basics/Colors';

const useStyles = makeStyles({
    list: {
        margin: "0",
        padding: "0",
        paddingLeft: "1em",
        textAlign: "left",
        "& > li": {
            marginTop: ".5em",
        }
    },
    howTo: {
        margin: 0,
        padding: 0
    },
    graphicSmall: {
        width: "50%"
    }
})

const ChatReminder = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    
    return(<DefaultMessage imageClass={classes.graphicSmall} imagePath={"/img/chat.svg"}>
        <PatientChatText />
    </DefaultMessage>)

}

const PatientChatText = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    return (
        <>
            <p className={classes.howTo}>{t('patient.chatReminder.howTo')}:</p>
            <ol className={classes.list}>
                <li>{t('patient.chatReminder.list', { returnObjects: true })[0]} <ForumIcon style={{ color: Colors.buttonBlue }} /></li>
                <li>{t('patient.chatReminder.list', { returnObjects: true })[1]}</li>
                <li>{t('patient.chatReminder.list', { returnObjects: true })[2]}</li>
            </ol>
        </>
    )
}

export default ChatReminder;