import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { inject, observer } from 'mobx-react';

const LeftDrawer = inject("uiStore","patientStore")(observer(({ uiStore,patientStore, props }) => {
  
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      uiStore.toggleMenu();
    };
  
    const handleLogout = () => {
        patientStore.logout();
        patientStore.isLoggedIn = false;
        uiStore.toggleMenu();
    }

    return (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="top"
          open={uiStore.menuOpened}
         >
           <div className={classes.contentContainer}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>

          <List>
              <ListItem button  onClick={handleLogout} key={"logout"}>
                <ListItemIcon><ExitToApp/></ListItemIcon>
                <ListItemText primary={"Log Out"}/>
              </ListItem>
          </List>
          </div>
        </Drawer>
    );
  }));

  const drawerWidth = "100%";

  const useStyles = makeStyles(theme => ({
    contentContainer:{
      minHeight: "100vh"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }
  }));

  export default LeftDrawer;