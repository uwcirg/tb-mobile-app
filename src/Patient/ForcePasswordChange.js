import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import PasswordUpdate from '../Shared/PasswordUpdate'
import ClickableText from '../Basics/ClickableText';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    container: {
        width: "100%",
        padding: "2em",
        boxSizing: "border-box"
    },
    form:{
        margin: "auto"
    },
    title:{
        fontSize: "1.25em"
    }
})

const ForcePasswordChange = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<div className={classes.container}>
        <Typography className={classes.title} variant="h2">{t('forcePasswordUpdate.title')}</Typography>
        <div className={classes.form}>
            <PasswordUpdate isForced />
        </div>

        <ClickableText text="Complete Later" hideIcon />
    </div>)

}

export default ForcePasswordChange;