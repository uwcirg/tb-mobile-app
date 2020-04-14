import React, { useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import NewButton from '../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'

import Camera from '@material-ui/icons/CameraAlt'

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
  const [open, setOpen] = useState(false);
  const { patientStore } = useStores();

  const date = patientStore.uiState.selectedCalendarDate

  const complete = (patientStore.selectedDayReport && patientStore.selectedDayReport.medicationTaken)

  return (
    <ExpansionPanel
      expanded={open}
      onClick={() => {
        complete && setOpen(!open)
      }}
      className={classes.drawer}>
      <ExpansionPanelSummary className={classes.collapsedDrawer}
        expandIcon={complete && <KeyboardArrowUpIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <div className={classes.container}>
          <Header date={date} complete={complete} />
          {!open && <Body complete={complete} />}
        </div>
      </ExpansionPanelSummary>
      {complete &&
        <ExpansionPanelDetails className={classes.detail}>
          {patientStore.selectedDayReport ?
            <PatientReport
              timeTaken={patientStore.selectedDayReport.takenAt}
              selectedSymptoms={patientStore.selectedDayReport.symptoms}
              photoString={patientStore.selectedDayReport.photoURL}
              isPhotoDay={true}
            /> : <p>Supress Warning</p>}
        </ExpansionPanelDetails>
      }
    </ExpansionPanel>
  )

});


const Body = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation('translation');

  return (
    <>
      {props.complete ?
        <div className={classes.preview}>
          <div className={classes.previewItem}><Check /><p>Check</p></div>
          <div className={classes.previewItem}><ClipBoard /><p>Symptoms</p></div>
          <div className={classes.previewItem}><Camera /><p>Photo</p></div>
        </div> :
        <NewButton onClick={() => { }} icon={<Clipboard />} text={t("patient.home.todaysActions.logMedication")} />
      }
    </>
  )
}

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
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start"
  },
  previewItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > svg": {
      fontSize: "1em",
      color: Colors.approvedGreen
    },
    "& > p": {
      margin: 0,
      padding: 0,
      marginLeft: ".5em"
    }

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