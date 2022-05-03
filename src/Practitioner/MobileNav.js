import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home'
import ForumIcon from '@material-ui/icons/Forum';
import InfoIcon from '@material-ui/icons/Info';
import { inject, observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import Colors from '../Basics/Colors';
import Badge from '@material-ui/core/Badge'
import { People, PhotoAlbum, PhotoLibrary } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        zIndex: "10",
        width: "100%",
        height: "60px",
        position: "fixed",
        bottom: 0,
        borderTop: "1px solid lightgray",
    },
    newMessages: {
        backgroundColor: Colors.red,
        color: "white",
        position: "absolute",
        top: "-8px",
        right: "-8px",
        width: "15px",
        height: "15px",
        borderRadius: "15px",
    },
    messageContainer: {
        position: "relative"
    }

});


const BottomBar = observer((props) => {
    const { messagingStore, practitionerUIStore } = useStores();
    const classes = useStyles();

    useEffect(() => {
        messagingStore.getUnreadMessages();
    }, [])

    return (
        <BottomNavigation
            showLabels
            className={classes.root}
            value={practitionerUIStore.mobileTabNumber}
        >
            <BottomNavigationAction id="intro-home-button" onClick={practitionerUIStore.goToHome} className="intro-home-button" icon={<People />} />
            <BottomNavigationAction onClick={practitionerUIStore.goToMessaging} className="intro-messaging-button" icon={
                <Badge color={"primary"} invisible={messagingStore.numberUnread < 1} badgeContent={messagingStore.numberUnread} >
                    <ForumIcon />
                </Badge>} />
            {/* <BottomNavigationAction onClick={practitionerUIStore.goToSettings} icon={<People />} /> */}
            <BottomNavigationAction id="intro-information-button" onClick={practitionerUIStore.goToSettings} icon={<InfoIcon />} />
        </BottomNavigation>
    );
});

export default BottomBar;
