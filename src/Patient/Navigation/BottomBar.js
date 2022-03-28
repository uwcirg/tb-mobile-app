import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home'
import ForumIcon from '@material-ui/icons/Forum';
import InfoIcon from '@material-ui/icons/Info';
import { observer } from 'mobx-react';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';

import Badge from '@material-ui/core/Badge'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    zIndex: 2,
    width: "100%",
    height: "60px",
    position: "fixed",
    bottom: 0,
    borderTop: "1px solid lightgray",
    boxSizing: "border-box",
    display: "flex",
    "& a":{
      boxSizing: "border-box",
      flex: "1 1 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
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

const BottomBar = observer(() => {
  const { messagingStore, patientUIStore } = useStores();
  const classes = useStyles();

  useEffect(() => {
    messagingStore.getUnreadMessages();
  }, [])

  return (
    <BottomNavigation
      value={patientUIStore.tabNumber}
      showLabels
      className={classes.root}
    >
      <BottomLink to="/home" id="intro-home-button" className="intro-home-button" icon={<HomeIcon />} />
      <BottomLink to="/progress/calendar" className="intro-progress-button" icon={<EventAvailableIcon />} />
      <BottomLink to="/messaging"  className="intro-messaging-button" icon={
        <Badge color={"primary"} invisible={messagingStore.numberUnread < 1} badgeContent={messagingStore.numberUnread} >
          <ForumIcon />
        </Badge>} />
      <BottomLink to="/information" id="intro-information-button" onClick={patientUIStore.goToInformation} icon={<InfoIcon />} />
    </BottomNavigation>
  );
});

const BottomLink = (props) => {return <BottomNavigationAction component={Link} {...props} />};

export default BottomBar;