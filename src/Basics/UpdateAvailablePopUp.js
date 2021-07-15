import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import PopUp from '../Patient/Navigation/PopUp';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as DoctorIcon } from './Icons/doctor.svg';
import ClickableText from './ClickableText';
import NewButton from './NewButton';

const useStyles = makeStyles({
    body: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5em",
        "& > h1": {
            fontSize: "1.5em",
            margin: ".5em 0 .5em 0"
        },
        "& > p":{
            justifyContent: "space-evenly",
            width: "90%",
            margin: ".5em 0 .5em 0",
            textAlign: "center"
        }
    },
    button:{
        width: "auto",
        marginTop: "1em",
        "& > span":{
            width: "100%",
            textAlign: "center"
        }
    }
})

const UpdatePopUp = (props) => {
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();

    return (<PopUp handleClickAway={props.optOut} className={classes.body}>
        <DoctorIcon />
        <Typography variant="h1">{t('update.updateAvailable')}</Typography>
        <Typography variant="body1">{t('update.alreadyDownloaded')}</Typography>
    <Typography variant="body1">{t('update.clickButton')}</Typography>
        <NewButton onClick={props.completeUpdate} className={classes.button} text={t('update.update')} />
        <ClickableText onClick={props.optOut} hideIcon text={t('update.doLater')} />
    </PopUp>)

}

export default UpdatePopUp;