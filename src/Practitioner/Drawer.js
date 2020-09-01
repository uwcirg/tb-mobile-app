import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import PatientsIcon from '@material-ui/icons/SupervisorAccount';
import CameraIcon from '@material-ui/icons/CameraAlt'
import IconButton from '@material-ui/core/IconButton';
import LogOut from '@material-ui/icons/ExitToApp';
import Settings from '@material-ui/icons/Settings'
import MessagingIcon from '@material-ui/icons/QuestionAnswer';
import Colors from "../Basics/Colors";
import LabIcon from '@material-ui/icons/FormatListNumbered'

const drawerWidth = 200;

//boxShadow: "5px 0px 5px 0px lightgray",

const useStyles = makeStyles({
  drawer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "1px 0px 5px 0px lightgray",
    backgroundColor: "white"
  },
  list: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    "& > div > div > svg": {
      fontSize: "3em",
      color: "black"
    },
    "& > div > div": {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
    },
    marginBottom: "auto"
  },
  settingsIcon: {
    width: "50%",
    margin: "auto"
  },
  selected: {
    "& > div > svg": {
      fill: Colors.buttonBlue
    },

  }
});

const PractitionerDrawer = observer(() => {
  const classes = useStyles();
  const { routingStore, uiStore, practitionerStore,practitionerUIStore } = useStores();
  const { location, push, goBack } = routingStore;

  const handleLogout = () => {
    practitionerStore.logout()
    push("/")
  }

  return (
    <>
    <div className={classes.drawer}>
      <List className={classes.list}>
        <ListItem className={`${practitionerUIStore.tabNumber === 0 && classes.selected}`} button key={"Home"} onClick={() => { push('/home') }}>
          <ListItemIcon><HomeIcon className={classes.test} /></ListItemIcon>
        </ListItem>

        <ListItem button className={practitionerUIStore.tabNumber === 1 ? classes.selected : ""} key={"Patients"} onClick={() => { push('/patients') }}>
          <ListItemIcon><PatientsIcon /></ListItemIcon>
        </ListItem>

        <ListItem button className={practitionerUIStore.tabNumber === 2 ? classes.selected : ""} key={"Messaging"} onClick={() => { push('/messaging') }}>
          <ListItemIcon><MessagingIcon /></ListItemIcon>
        </ListItem>

        <ListItem button className={practitionerUIStore.tabNumber === 3 ? classes.selected : ""} key={"Settings"} onClick={() => { push('/settings') }}>
          <ListItemIcon><Settings /></ListItemIcon>
        </ListItem>
        <ListItem button className={practitionerUIStore.tabNumber === 3 ? classes.selected : ""} key={"Settings"} onClick={() => { push('/review') }}>
          <ListItemIcon><LabIcon /></ListItemIcon>
        </ListItem>
      </List>
      <div className={classes.bottomButtons}>
        <IconButton onClick={() => { push('/photos') }} className={classes.settingsIcon}><CameraIcon /></IconButton>
        <IconButton onClick={handleLogout} className={classes.settingsIcon}><LogOut /></IconButton>
      </div>
    </div>
    </>
  );
});

export default PractitionerDrawer;