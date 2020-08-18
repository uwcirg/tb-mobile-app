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

import Badge from '@material-ui/core/Badge'

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
  const {messagingStore, patientUIStore} = useStores();
  const classes = useStyles();

  useEffect(()=>{
    messagingStore.getUnreadMessages();
  },[])

  return (
    <BottomNavigation
      value={patientUIStore.tabNumber}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction id="intro-home-button" onClick={patientUIStore.goToHome} className="intro-home-button" icon={<HomeIcon />} />
      <BottomNavigationAction onClick={patientUIStore.goToProgress} className="intro-progress-button" icon={<EventAvailableIcon />} />
      <BottomNavigationAction onClick={patientUIStore.goToMessaging} className="intro-messaging-button" icon={
      <Badge color={"primary"} invisible={messagingStore.numberUnread < 1} badgeContent={messagingStore.numberUnread} >
        <ForumIcon />
        </Badge>} />
      <BottomNavigationAction id="intro-information-button" onClick={patientUIStore.goToInformation} icon={<InfoIcon  />} />
    </BottomNavigation>
  );
});

export default BottomBar;