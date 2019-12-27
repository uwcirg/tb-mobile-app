import React from 'react';
import Paper from '@material-ui/core/Paper'
import ChevronRight from '@material-ui/icons/ChevronRight'
import WarningIcon from '@material-ui/icons/Warning';

import ChannelPreview from './ChannelPreview'

import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    root: {
        
    },

    warning:{
        fontSize: ".8em",
        backgroundColor: "#f2f2f2",
        display: "flex",
        margin: 0,
        padding: ".5em",
        alignItems:"center",
        justifyContent:"space-between"
    }
  
  });

const TopWarning = () =>{
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();

    return(

            <div className={classes.warning}> <WarningIcon /> {t("messaging.nurseContact")} <ChevronRight/> </div>
    )

}

const Messaging = inject("uiStore")(observer(({ uiStore, props }) => {

    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();

        return(
            <Paper className={classes.root}>
                <TopWarning> </TopWarning>
                <ChannelPreview />
            </Paper>
        )
    
}));

export default Messaging;