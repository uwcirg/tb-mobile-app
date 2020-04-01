import React from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ClipBoard from '@material-ui/icons/Assignment';
import Check from '@material-ui/icons/CheckCircle';
import Healing from '@material-ui/icons/Healing';
import { DateTime } from 'luxon'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import useStores from '../../Basics/UseStores'
import { makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import Colors from '../../Basics/Colors';
import PatientReport from '../../Basics/PatientReport';
import ReportConfirmation from '../MedicationFlow/ReportConfirmation';
import Styles from '../../Basics/Styles';

const Header = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <h2 className={classes.drawerTitle}>{props.date.toLocaleString(DateTime.DATE_FULL)}</h2>
      <p className={`${classes.status} ${!props.complete && classes.incomplete}`}>{props.complete ? "Complete" : "Incomplete"}</p>
    </div>
  )
}

const DayDrawer = observer((props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { patientStore } = useStores();

  const date = patientStore.uiState.selectedCalendarDate

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ExpansionPanel className={classes.drawer}>
      <ExpansionPanelSummary className={classes.collapsedDrawer}
        expandIcon={<KeyboardArrowUpIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <div className={classes.container}>
          <Header date={date} complete={patientStore.selectedDayReport && patientStore.selectedDayReport.medicationTaken } />
          <div className={classes.preview}>
            <Check />
            <ClipBoard />
            <Healing />
          </div>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.detail}>
        {patientStore.selectedDayReport ?
          <PatientReport
            timeTaken={patientStore.selectedDayReport.takenAt}
            selectedSymptoms={patientStore.selectedDayReport.symptoms}
            photoString={patientStore.selectedDayReport.photoURL}
            isPhotoDay={true}
          /> : <p>Supress Warning</p>}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )

});

const useStyles = makeStyles({

  drawer: {
    position: "fixed",
    bottom: "0",
    padding: "0px",
    width: "100vw",
    borderBottom: "unset",
    boxShadow: "unset",
    zIndex: "10",
    minHeight: "18vh"
  },
  drawerImage: {
    width: "100%",
  },

  drawerTitle: {
    margin: 0,
    fontSize: "1.25em"
  },
  collapsedDrawer: {

    margin: 0,
  },
  test: {
    minHeight: "200px",
    width: "90vw",
    zIndex: "100",
  },
  preview: {
    display: "flex",
    width: "20%",
    justifyContent: "space-between",
    "& > svg": {
      fontSize: "1.8em",
      color: Colors.textGray
    },
    "& > svg:first-of-type": {
      color: Colors.approvedGreen
    }
  },
  previewItem: {
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
  },
  detail: {
    maxHeight: "85vh",
    overflow: "scroll",
    padding: 0,
    margin: 0,
    width: "100vw"
  },
  header: {
    ...Styles.flexRow,
    alignItems: "center"
  },
  status: {
    textTransform: "uppercase",
    color: Colors.approvedGreen,
    fontSize: ".75em",
    marginLeft: "2em"
  },
  incomplete: {
    color: Colors.red
  }
})

export default DayDrawer;