import React,{useState} from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ClipBoard from '@material-ui/icons/Assignment';
import Check from '@material-ui/icons/CheckCircle';
import Healing from '@material-ui/icons/Healing';
import {DateTime} from 'luxon'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import useStores from '../../Basics/UseStores'
import { makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import Colors from '../../Basics/Colors';


const useStyles = makeStyles({

    drawerPaper:{
      
    },
    drawer:{
        position: "absolute",
        bottom: "60px",
        padding: "0px",
        width: "100vw",
        borderBottom: "unset",
        boxShadow: "unset",
        zIndex: "10"
    },
    drawerImage:{
        width: "100%",
    },

    drawerTitle:{
      margin: 0,
      padding: "0 0 .5em 0",
      fontSize: "1.25em"
    },
    collapsedDrawer:{
        
        margin: 0,
    },
    test:{
        minHeight: "200px",
        width: "90vw",
        zIndex: "100",
    },
    preview:{
      display: "flex",
      width: "20%",
      justifyContent: "space-between",
      "& > svg": {
        fontSize: "1.8em",
        color: Colors.textGray
      },
      "& > svg:first-of-type":{
        color: Colors.approvedGreen
      }
    },
    previewItem:{
      width: "50px",
      height: "50px",
      backgroundColor: "lightgray",
      display: "flex",
      marginLeft: "5px",
      justifyContent: "center",
      alignItems: "center"

    },
    container: {
      width: "100%"
    }
})


const DayDrawer = observer((props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const {patientStore} = useStores();

    const date = patientStore.uiState.selectedCalendarDate

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
          <div className={classes.container}>
          <h2 className={classes.drawerTitle}>{date.toLocaleString(DateTime.DATE_MED)}</h2>
            <div className={classes.preview}>
              <Check />
              <ClipBoard />
              <Healing />
            </div>
           </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.test}>
                  <h1>{(patientStore.selectedDayReport && patientStore.selectedDayReport.medicationTaken) ? "Yes" : "No"}</h1>
                  {(patientStore.selectedDayReport && patientStore.selectedDayReport.photoURL) ? <img className={classes.drawerImage} src={patientStore.selectedDayReport.photoURL} /> : "No"}
              </div>
            </ExpansionPanelDetails>
      </ExpansionPanel>
    )

});

export default DayDrawer;