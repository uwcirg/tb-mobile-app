import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { inject, observer } from 'mobx-react';

const TopBar = inject("uiStore","participantStore")(observer(({ uiStore,participantStore, props }) => {
    return(
        <AppBar color={uiStore.offline ? "secondary" : "primary"} position="static" style={{flexGrow: 1}}>
          <Toolbar>
            {participantStore.isLoggedIn  ? <IconButton onClick={uiStore.toggleMenu} edge="start"  color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> : ""}
            <Typography variant="h6" style={{flexGrow: 1}}>
            Assistiante
            </Typography>
            <Typography variant="h6" color={!uiStore.offline ? "secondary" : "primary"} style={{color: "flex-end"}} >
            {uiStore.offline ? "Offline" : "Online"}
            </Typography>
          </Toolbar>
        </AppBar>
    )
}));

export default TopBar;
