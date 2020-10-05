import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useLogout from '../Basics/Logout'
import { observer } from 'mobx-react'
import { Button } from '@material-ui/core';
import Messaging from '../Messaging/PractitionerMessaging'
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton';
import LogOut from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "100%"

    },
    sidebar: {
        flexBasis: "30px",
        height: "100%"
    },
    messaging: {
        flexGrow: "1",
        height: "100%"
    }

})

const ExpertView = () => {

    const classes = useStyles();
    const logout = useLogout();
    const { t, i18n } = useTranslation('translation');

    return (<div className={classes.container}>
        <div className={classes.sidebar}>
            <Tooltip title={t('patient.profile.logout')}>
                <IconButton onClick={logout} className={classes.settingsIcon}><LogOut /></IconButton>
            </Tooltip>
        </div>
        <div className={classes.messaging}>
            <Messaging />
        </div>
    </div>)

}

export default ExpertView;