import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HomeIcon from '@material-ui/icons/Home'
import ForumIcon from '@material-ui/icons/Forum';
import InfoIcon from '@material-ui/icons/Info';
import { inject, observer } from 'mobx-react';

import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "60px",
    position: "fixed",
    bottom: 0,
    borderTop: "1px solid lightgray",
  },
  newMessages:{
    backgroundColor: Colors.red,
    color: "white",
    position: "absolute",
    top: "-8px",
    right: "-8px",
    width: "15px",
    height: "15px",
    borderRadius: "15px",
  },
  messageContainer:{
    position: "relative"
  }

});

const BottomBar = observer((props) => {
  const {patientStore,uiStore,messagingStore, routingStore} = useStores();
  const { location, push, goBack } = routingStore;
  const classes = useStyles();


  const getTab = () => {
    const splitPath = location.pathname.split("/");
    if( splitPath[1] === "patient"){
      if(splitPath[2] === "home")return 0
      if(splitPath[2] === "progress")return 1
      if(splitPath[2] === "messaging")return 2
      if(splitPath[2] === "information")return 3
    }
    return 0

  }

  useEffect(()=>{
    messagingStore.getUnreadMessages();
  },[])

  return (
    <BottomNavigation
      value={getTab()}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction onClick={() => {push("/patient/home")}} className="intro-home-button" icon={<HomeIcon />} />
      <BottomNavigationAction onClick={() => {push("/patient/progress")}} className="intro-progress-button" icon={<EventAvailableIcon />} />
      <BottomNavigationAction onClick={() => {push("/patient/messaging")}} icon={<div className={classes.messageContainer}>
        <ForumIcon />
        {messagingStore.numberUnread > 0 && <div className={classes.newMessages}>{messagingStore.numberUnread}</div>}
        </div>} />
      <BottomNavigationAction onClick={() => {push("/patient/information")}} icon={<InfoIcon  />} />
    </BottomNavigation>
  );
});

export default BottomBar;