import React,{useState} from 'react';
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import useStores from '../../Basics/UseStores'

import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    drawer: {
        zIndex: "-1",
    },
    drawerPaper:{
      
    },
    drawer:{
        position: "absolute",
        bottom: "60px",
        padding: "0px",
        width: "100vw",
        borderBottom: "unset",
        boxShadow: "unset"
    },
    collapsedDrawer:{
        
        margin: 0,
    },
    test:{
        height: "200px",
        width: "90vw",
        zIndex: "100",
        backgroundColor: "lightblue",
    },
    preview:{
      display: "flex",
      justifyContent: "start"
    },
    previewItem:{
      width: "50px",
      height: "50px",
      backgroundColor: "lightgray",
      display: "flex",
      marginLeft: "5px",
      justifyContent: "center",
      alignItems: "center"

    }
})


const DayDrawer = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return(
        <ExpansionPanel className={classes.drawer}>
            <ExpansionPanelSummary className={classes.collapsedDrawer}
            expandIcon={<KeyboardArrowUpIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
           <div className={classes.preview}>
             <div className={classes.previewItem}>1</div>
             <div className={classes.previewItem}>2</div>
             <div className={classes.previewItem}>3</div> 
           </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <div className={classes.test}>

            </div>
            </ExpansionPanelDetails>
      </ExpansionPanel>
    )

};

export default DayDrawer;

/*
 <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="bottom"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </div>
        <List>
            <ListItem button key={"Day"}>
              <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
              <ListItemText primary={"Day"} />
            </ListItem>
        </List>
      </Drawer>
*/