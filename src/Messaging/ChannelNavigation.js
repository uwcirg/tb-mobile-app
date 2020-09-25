import React, {useState} from 'react';
import ChannelPreview from './ChannelPreview'
import { DateTime } from 'luxon'
import useStores from '../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import SearchBar from '../Basics/SearchBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Styles from '../Basics/Styles';
import AddTopic from './AddTopic';


const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowX: "hidden",
        backgroundColor: "white",
        height: "100vh"
    },
    channelList: {
        flexGrow: 1,
        position: "relative",
        overflowY: "scroll",
        overflowX: "hidden",
        "& > h2": {
            fontSize: "1.25em",
            textAlign: "center"
        },
    },
    header: {
        ...Styles.flexRow,
        margin: ".5em"
    },
    warning: {
        fontSize: ".8em",
        backgroundColor: "#f2f2f2",
        display: "flex",
        margin: 0,
        padding: ".5em",
        alignItems: "center",
        justifyContent: "space-between"
    },
    errorMessage: {
        width: "100%",
        textAlign: "center"
    },
    tabs: {
        minWidth: "50px",
        width: "50%",
        padding: "0"
    }

});


const  ChannelNavigation = observer((props) => {
    const classes = useStyles();
    const { messagingStore } = useStores();
    const { t, i18n } = useTranslation('translation');
    const [search, setSearch] = useState("");
    const [patientSearch, setPatientSearch] = useState("");
    const [tab, setTab] = useState(0);

    const publicChannels = (messagingStore.channels.length > 0) ? messagingStore.channels.filter((channel) => {
        return (!channel.isPrivate && channel.title.toLowerCase().includes(search.toLowerCase()))
    }) : [];

    const coordinatorChannels = (messagingStore.channels.length > 0) ? messagingStore.channels.filter((channel) => { return (channel.isPrivate && channel.title.toLowerCase().includes(patientSearch.toLowerCase())) }) : [];

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handlePatientSearch = (e) => {
        setPatientSearch(e.target.value)
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div className={classes.container}>
            <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="message-type-tab"
            >
                <Tab className={classes.tabs} label={t('messaging.patients')} />
                <Tab className={classes.tabs} label={t('messaging.discussions')} />
            </Tabs>

            {tab === 0 ?
                <div className={classes.header}>
                    <SearchBar kind={"patient"} handleChange={handlePatientSearch} placeholder={t("messaging.searchPatient")} />
                </div> :
                <div className={classes.header}>
                    <SearchBar kind={"discussion"} handleChange={handleSearch} placeholder={t("messaging.searchTheme")} />

                </div>}
            <div className={classes.channelList}>

                {tab === 0 ? <Channels private channels={coordinatorChannels} /> : <Channels channels={publicChannels} />}
            </div>
            {tab === 1 && <AddTopic />}
        </div>)
})



const Channels = observer((props) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { messagingStore, uiStore, practitionerStore, practitionerUIStore } = useStores();

    let channels = "";
    if (props.channels.length > 0) {
        channels = props.channels.map((channel) => {
            const title = (channel.isPrivate && practitionerStore.getPatient(channel.userId)) ? practitionerStore.getPatient(channel.userId).fullName : channel.title
            return <ChannelPreview
                coordinator
                selected={uiStore.pathNumber === channel.id}
                private={props.private}
                key={`channel${channel.id}`}
                title={title}
                subtitle={channel.subtitle}
                time={DateTime.fromISO(channel.lastMessageTime).toLocaleString(DateTime.DATETIME_24_SIMPLE)}
                unread={messagingStore.unreadInfo[channel.id] ? messagingStore.unreadInfo[channel.id].unreadMessages : 0}
                onClick={() => {
                    practitionerUIStore.goToChannel(channel.id)
                    //messagingStore.selectChannel(channel.id)
                }}
            />
        })
    } else {
    channels = <p className={classes.errorMessage}>No {!props.private ? t('messaging.patients') : t('messaging.discussions')} {t('messaging.found')}</p>
    }

    return (
        <>{channels}</>
    )
});


export default ChannelNavigation;