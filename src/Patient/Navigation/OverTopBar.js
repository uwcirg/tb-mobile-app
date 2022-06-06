import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import Colors from '../../Basics/Colors'

const useStyles = makeStyles({
  fixed: {
    zIndex: "10",
    position: "fixed",
    top: 0
  },
  bar: {
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
  back: {
    color: Colors.buttonBlue,
    fontSize: "1.5em"
  },
  title: {
    fontWeight: 600,
    flexGrow: 1,
    fontSize: "1.25em",
    lineHeight: "1.1em"
  },
  reverse: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  }
});



const OverTopBar = (props) => {

  const classes = useStyles();
  let buttonToDisplay = props.icon ? props.icon : <ChevronLeft className={classes.back} />

  return (
    <AppBar className={`${classes.bar} ${props.altColor ? classes.altColor : ""} ${!props.notFixed && classes.fixed} ${props.reverse && classes.reverse}`} color={"primary"} position="static" style={{ flexGrow: 1 }}>
      <Toolbar>
        {!props.hideIconButton &&<IconButton onClick={props.handleBack} edge="start" color="inherit" aria-label="menu">
          {buttonToDisplay}
        </IconButton>}
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        <Typography variant="h6" color="primary" >
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

OverTopBar.propTypes = {
  hideIconButton: PropTypes.bool,
  reverse: PropTypes.bool,
  title: PropTypes.any,
  handleBack: PropTypes.func,
  notFixed: PropTypes.bool

}


export default OverTopBar;
