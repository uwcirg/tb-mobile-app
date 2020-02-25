import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import Colors from '../Basics/Colors'

const useStyles = makeStyles({
  bar: {
    position: "fixed",
    top: 0,
    backgroundColor: Colors.themeBlue
  },
  altColor: {
    backgroundColor: Colors.green
  }
});

import ChevronLeft from '@material-ui/icons/ChevronLeft'

const OverTopBar = (props) => {

   let buttonToDisplay = ( <IconButton onClick={props.handleBack} edge="start"  color="inherit" aria-label="menu"> <ChevronLeft /></IconButton>)
  
   const classes = useStyles();

    return(
        <AppBar className={`${classes.bar} ${props.altColor ? classes.altColor : ""}`} color={"primary"} position="static" style={{flexGrow: 1}}>
          <Toolbar>
            {buttonToDisplay}
            <Typography variant="h6" style={{flexGrow: 1}}>
            {props.title}
            </Typography>
            <Typography variant="h6" color="primary" >
            </Typography>
          </Toolbar>
        </AppBar>
    )
};


export default OverTopBar;
