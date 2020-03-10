import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Colors from '../../Basics/Colors'

const useStyles = makeStyles({
  bar: {
    zIndex: "10",
    position: "fixed",
    top: 0,
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
    borderBottom: `1px solid ${Colors.gray}`,
    height: '60px'
  },
  altColor: {
    backgroundColor: Colors.green,
    color: "white",
  },
  back:{
    color: Colors.buttonBlue,
    fontSize: "1.5em"
  },
  title:{
    fontWeight: 600,
    flexGrow: 1
  },
  reverse: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  }
});

import ChevronLeft from '@material-ui/icons/ChevronLeft'

const OverTopBar = (props) => {

  const classes = useStyles();
  let buttonToDisplay = props.icon ? props.icon : <ChevronLeft className={classes.back} />
  
  return(
        <AppBar className={`${classes.bar} ${props.altColor ? classes.altColor : ""} ${props.reverse && classes.reverse}`} color={"primary"} position="static" style={{flexGrow: 1}}>
          <Toolbar>
          <IconButton onClick={props.handleBack} edge="start"  color="inherit" aria-label="menu">
            {buttonToDisplay}
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            {props.title}
            </Typography>
            <Typography variant="h6" color="primary" >
            </Typography>
          </Toolbar>
        </AppBar>
    )
};

OverTopBar.PropTypes = {
  reverse: PropTypes.bool,
  title: PropTypes.string

}


export default OverTopBar;
