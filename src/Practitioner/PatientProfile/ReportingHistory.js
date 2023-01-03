import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import CalendarTest from "./Calendar";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Colors from "../../Basics/Colors";
import Styles from "../../Basics/Styles";
import { useTranslation } from "react-i18next";
import NotesView from "./NotesView";
import ReportsLoading from "./ReportsLoading";
import ReportTable from "./ReportTable";
import PhotoReportsList from "./PhotoReportsList";

const useStyles = makeStyles({
  reportingHistoryContainer: {
    width: "100%",
    "& > h2": {
      textTransform: "uppercase",
      padding: ".5em",
    },
  },
  reportingHistory: {
    width: "100%",
    height: "100%",
  },
  reportsHeader: {
    padding: "1em 0",
    display: "flex",
    alignItems: "center",
    "& > h2": {
      marginRight: "1em",
      ...Styles.patientPageTitle,
    },
  },
  buttonGroup: {
    marginLeft: "auto",
    "& > button.selected": {
      color: "white",
      backgroundColor: Colors.textDarkGray,
    },
  },
  buttonBorder: {
    borderRadius: "5px",
    border: "1px solid #eee",
    padding: "0 1em",
  },
});

const ReportingHistory = observer(() => {
  const [visible, setVisible] = useState("notes");
  const [day, setDay] = useState(new Date());
  const classes = useStyles();
  const { patientProfileStore } = useStores();

  const handleChange = (change) => {
    setDay(change);
  };
  return (
    <div className={classes.reportingHistoryContainer}>
      <ReportingHistoryLabel setVisible={setVisible} visible={visible} />
      {visible === "notes" && <NotesView />}
      {visible === "photos" && <PhotoReportsList />}
      {visible === "calendar" && (
        <div>
          {patientProfileStore.selectedPatient.reportsLoaded ? (
            <div className={classes.reportingHistory}>
              <CalendarTest
                selectedDay={day}
                handleChange={handleChange}
                reports={patientProfileStore.selectedPatient.reports}
                treatmentStart={
                  patientProfileStore.selectedPatient.details.treatmentStart
                }
              />
            </div>
          ) : (
            <ReportsLoading />
          )}
        </div>
      )}
      {visible === "reports" && (
        <div>
          {patientProfileStore.selectedPatient.reportsLoaded ? (
            <div className={classes.reportingHistory}>
              <ReportTable />
            </div>
          ) : (
            <ReportsLoading />
          )}
        </div>
      )}
    </div>
  );
});

const ReportingHistoryLabel = (props) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");
  const { patientProfileStore } = useStores();
  return (
    <div className={classes.reportsHeader}>
      <Typography variant="h2">
        {t("coordinator.patientProfile.reportingHistory")}
      </Typography>
      <Box
        style={{ display: "flex", flexWrap: "wrap" }}
        className={classes.buttonGroup}
        size="small"
      >
        <Button
          onClick={() => {
            props.setVisible("notes");
          }}
          className={`${classes.buttonBorder} ${
            props.visible === "notes" && "selected"
          }`}
        >
          {t("notes")}
        </Button>
        <Button
          onClick={() => {
            props.setVisible("reports");
            if (!patientProfileStore.selectedPatient.reportsLoaded) {
              patientProfileStore.getPatientReports(
                patientProfileStore.selectedPatient.details.id
              );
            }
          }}
          className={`${classes.buttonBorder} ${
            props.visible === "reports" && "selected"
          }`}
        >
          {t("coordinator.patientProfile.listReports")}
        </Button>
        <Button
          onClick={() => {
            props.setVisible("photos");
          }}
          className={`${classes.buttonBorder} ${
            props.visible === "photos" && "selected"
          }`}
        >
          {t("commonWords.photos")}
        </Button>
        <Button
          onClick={() => {
            props.setVisible("calendar");
            if (!patientProfileStore.selectedPatient.reportsLoaded) {
              patientProfileStore.getPatientReports(
                patientProfileStore.selectedPatient.details.id
              );
            }
          }}
          className={`${classes.buttonBorder} ${
            props.visible === "calendar" && "selected"
          }`}
        >
          {t("coordinator.patientProfile.calendarReports")}
        </Button>
      </Box>
    </div>
  );
};

export default ReportingHistory;
