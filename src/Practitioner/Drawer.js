import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';

import PatientsIcon from '@material-ui/icons/SupervisorAccount';

import CameraIcon from '@material-ui/icons/CameraAlt'

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: "fixed",
    zIndex: 0,
    paddingTop: "500px"
  },
  drawerPaper: {
    width: drawerWidth,
  },  
  toolbar: {
      paddingTop: "20vh"
  },
}));

const PractitionerDrawer = observer(() => {
  const classes = useStyles();
  const {routingStore,uiStore} = useStores();
  const { location, push, goBack } = routingStore;


  return (
      <Drawer
        open={uiStore.menuOpened}
        className={classes.drawer}
        classes={{paper: classes.drawerPaper}}
        onClose={uiStore.toggleMenu}
      >
        <div className={classes.toolbar} />
        <List>
        <ListItem button key={"Strip Photos"} onClick={() => {push('/photos')}}>
              <ListItemIcon><CameraIcon /></ListItemIcon>
              <ListItemText primary={"Strip Photos"} />
            </ListItem>

            <ListItem button key={"Home"} onClick={() => {push('/')}}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>

            <ListItem button key={"Messaging"} onClick={() => {push('/messaging')}}>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary={"Messaging"} />
            </ListItem>

            <ListItem button key={"Patients"} onClick={() => {push('/patients')}}>
              <ListItemIcon><PatientsIcon /></ListItemIcon>
              <ListItemText primary={"Patients"} />
            </ListItem>
           
           

        </List>
      </Drawer>
  );
});

export default PractitionerDrawer;