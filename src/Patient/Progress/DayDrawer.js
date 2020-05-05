import React, { useState } from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ClipBoard from '@material-ui/icons/Assignment';
import Check from '@material-ui/icons/CheckCircle';
import { DateTime } from 'luxon'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import useStores from '../../Basics/UseStores'
import { makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import Colors from '../../Basics/Colors';
import PatientReport from '../../Basics/PatientReport';
import Styles from '../../Basics/Styles';
import { useTranslation } from 'react-i18next';
import NewButton from '../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'
import  TempIcon from '../../Basics/Icons/Temp.js'
import PillIcon from '../../Basics/Icons/Pill.js'

import Camera from '@material-ui/icons/CameraAlt'

const DayDrawer = observer((props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { patientStore } = useStores();

  const date = patientStore.uiState.selectedCalendarDate;
  const complete = (patientStore.selectedDayReport)
  const missingPhoto = (patientStore.selectedDayWasPhotoDay ) && !patientStore.selectedDayReport || (patientStore.selectedDayReport && !patientStore.selectedDayReport.photoURL);

  return (
    <ExpansionPanel
      expanded={open}
      onClick={() => {complete && setOpen(!open)}}
      className={classes.drawer}>
      <ExpansionPanelSummary
        className={classes.collapsedDrawer}
        expandIcon={complete && <KeyboardArrowUpIcon />}
        aria-controls="calendar-day-preview"
        id="calendar-day-preview">
        <div className={`${classes.container}`}>
          <Header date={date} complete={complete} />
          {!open && <Body missingPhoto={missingPhoto} report={patientStore.selectedDayReport} photoDay={patientStore.checkPhotoDay(date)} complete={complete} />}
        </div>
      </ExpansionPanelSummary>
      {complete &&
        <ExpansionPanelDetails className={classes.detail}>
          {patientStore.selectedDayReport ?
            <PatientReport
              pastReport
              isPhotoDay={patientStore.selectedDayWasPhotoDay}
              medicationNotTakenReason={patientStore.selectedDayReport.whyMedicationNotTaken}
              medicationTaken={patientStore.selectedDayReport.medicationTaken}
              timeTaken={patientStore.selectedDayReport.takenAt}
              selectedSymptoms={patientStore.selectedDayReport.symptoms}
              photoString={patientStore.selectedDayReport.photoURL}
              isPhotoDay={patientStore.checkPhotoDay(date)}
              missingPhoto={missingPhoto}
            /> : <p>Supress Warning</p>}
        </ExpansionPanelDetails>
      }
    </ExpansionPanel>
  )

});

const Header = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation('translation');

  return (
    <div className={classes.header}>
      <h2 className={classes.drawerTitle}>{props.date.toLocaleString(DateTime.DATE_FULL)}</h2>
      <p className={`${classes.status} ${!props.complete && classes.incomplete}`}>{props.complete ? "Complete" : "Incomplete"}</p>
    </div>
  )
}


const Body = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation('translation');
  const { patientStore } = useStores();
  
  return (
    <>
      {props.complete ?
        <div className={classes.preview}>
          <div className={`${classes.previewItem} ${!props.report.medicationTaken && classes.previewItemMissed}`}><PillIcon /><p>{t("commonWords.medication")}</p></div>
          <div className={classes.previewItem}><TempIcon /><p>{t("commonWords.symptoms")}</p></div>
          {props.photoDay && <div className={`${classes.previewItem} ${props.missingPhoto && classes.previewItemMissed}`}><Camera /><p>{t('commonWords.stripPhoto')}</p></div>}
        </div> :
        <NewButton onClick={()=>{patientStore.uiState.onHistoricalTreatmentFlow = true}} icon={<PillIcon />} text={t("patient.home.todaysActions.logMedication")} />
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
    borderTop: "unset",
    boxShadow: "0px 0 15px rgba(0, 0, 0, 0.2)",
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
  previewItemMissed:{
    color: Colors.red,
    "& > svg": {
      fontSize: "1em",
      color: Colors.red
    },
  },
  container: {
    width: "100%"
  },
  detail: {
    minHeight: "75vh",
    overflow: "scroll",
    padding: 0,
    margin: 0,
    width: "100vw"
  },
  header: {
    ...Styles.flexRow,
    alignItems: "center",
  },
  status: {
    textTransform: "uppercase",
    color: Colors.approvedGreen,
    fontSize: ".75em",
    marginLeft: "2em"
  },
  incomplete: {
    color: `${Colors.red} !important`
  }
})

export default DayDrawer;