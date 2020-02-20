import React, {useEffect }from 'react';
import Paper from '@material-ui/core/Paper'
import ChevronRight from '@material-ui/icons/ChevronRight'
import WarningIcon from '@material-ui/icons/Warning';
import Channel from './Channel';
import ChannelPreview from './ChannelPreview'
import {DateTime} from 'luxon'
import useStores from '../../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

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

const Messaging = observer(() => {

    const { t, i18n } = useTranslation('translation');
    const {messagingStore,patientStore} = useStores();
    const classes = useStyles();

    useEffect(() => messagingStore.getChannels(), []);

    let allChannels;
    messagingStore.channels.length > 0 && (allChannels = messagingStore.channels.map( (channel) => {
        return <ChannelPreview 
                    title={channel.title} 
                    subtitle={channel.subtitle} 
                    time={DateTime.fromISO(channel.updated_at).toLocaleString(DateTime.TIME_24_SIMPLE)}
                    onClick={() => {
                        messagingStore.selectedChannel = channel.id
                        messagingStore.selectedChannelInfo.title = channel.title
                        messagingStore.getSelectedChannel();
                    }}
                />
    }))


    const ChannelList = (<><TopWarning />{allChannels}</>)

        return(
            <div className={classes.root}>
                {messagingStore.selectedChannel === 0 ? ChannelList : <Channel userID={patientStore.userID} />}
            </div>
        )
    
});

export default Messaging;