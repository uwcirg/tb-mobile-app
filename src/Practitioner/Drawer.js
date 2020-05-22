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

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: "100%"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
    paddingTop: "500px",
    width: "10%"
    
  },
  drawerPaper: {
    width: "8%"
  },
  list: {
    marginLeft:"10px",
    height: "100%",
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
    }
  },
  settingsIcon: {
    width: "50%",
    margin: "auto"
  },
  selected:{
    borderRadius: "10px 0 0 10px",
    boxShadow: "inset 2px 0 2px gray",
    backgroundColor: "none"
  }
}));

const PractitionerDrawer = observer(() => {
  const classes = useStyles();
  const { routingStore, uiStore, practitionerStore } = useStores();
  const { location, push, goBack } = routingStore;

  const handleLogout = () => {
    practitionerStore.logout()
    push("/")
  }

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      onClose={uiStore.toggleMenu}
    >
      <List className={classes.list}>

        <ListItem className={classes.selected} button key={"Home"} onClick={() => { push('/') }}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          {/*<ListItemText primary={"Home"} />*/}
        </ListItem>

        <ListItem button key={"Patients"} onClick={() => { push('/patients') }}>
          <ListItemIcon><PatientsIcon /></ListItemIcon>
        </ListItem>

        <ListItem button key={"Messaging"} onClick={() => { push('/messaging') }}>
          <ListItemIcon><MessagingIcon /></ListItemIcon>
        </ListItem>

        <ListItem button key={"Strip Photos"} onClick={() => { push('/photos') }}>
          <ListItemIcon><Settings /></ListItemIcon>
        </ListItem>




      </List>
      <IconButton onClick={handleLogout} className={classes.settingsIcon}><CameraIcon /></IconButton>
      <IconButton onClick={handleLogout} className={classes.settingsIcon}><LogOut /></IconButton>
    </Drawer>
  );
});

export default PractitionerDrawer;