import React, { useEffect } from "react";
import Basicsidebar from "../Shared/Sidebar";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Colors from "../../Basics/Colors";
import SharedButton from "../Shared/SharedButton";
import { useTranslation } from "react-i18next";
import { DateTime } from "luxon";
import Symptom from "../Shared/Symptom";
import {
  SevereSymptoms,
  findCommonElements,
} from "../../Basics/SymptomsSeperation";

const useStyles = makeStyles({
  header: {
    fontSize: "1.25em",
    width: "90%",
    margin: "auto",
    marginBottom: ".5em",
  },
  symptoms: {
    margin: "auto",
    minHeight: "100px",
    maxHeight: "200px",
    width: "90%",
    overflow: "scroll",
    overflowX: "hidden",
    "& > p": {
      paddingLeft: "1em",
    },
  },
  symptomContainer: {
    width: "100%",
    "& > h2": {
      fontSize: "1em",
      textAlign: "center",
    },
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: ".5em",
  },
  listContainer: {
    marginTop: "5px",
    display: "flex",
    "& > .list": {
      "& > p": {
        margin: "0 0 .5em 0",
        color: Colors.textDarkGray,
      },
      flexBasis: "50%",
      display: "flex",
      flexDirection: "column",
    },
    justifyContent: "space-between",
  },
  circle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: Colors.yellow,
    marginRight: "1em",
  },
  day: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "medium",
    "& > p": {
      margin: 0,
    },
    "& > .line": {
      marginLeft: "5px",
      borderLeft: `1px solid lightgray`,
      flexGrow: "1",
    },
    "& > .day": {
      display: "flex",
      alignItems: "center",
      color: Colors.textGray,
    },
  },
  severe: {
    backgroundColor: `${Colors.warningRed}`,
  },
});

const SymptomSidebar = observer(() => {
  const { practitionerStore } = useStores();
  const classes = useStyles();
  const { t } = useTranslation("translation");

  const dates = Object.keys(practitionerStore.selectedPatientSymptoms.summary);

  useEffect(() => {
    practitionerStore.getSelectedPatientSymptoms();
  }, [practitionerStore.selectedRow.index]);

  return (
    <Basicsidebar
      buttons={
        <>
          <SharedButton
            text={t("coordinator.sideBar.contactedPatient")}
            onClick={() => {
              practitionerStore.resolveSymptoms();
            }}
          />
        </>
      }
    >
      <h2 className={classes.header}>
        {t("coordinator.sideBar.symptomsSince")}:
      </h2>
      {practitionerStore.selectedPatientSymptoms.loading ? (
        <p> {t("coordinator.sideBar.loading")}...</p>
      ) : (
        <div className={classes.symptoms}>
          {" "}
          {dates.map((each) => {
            return (
              <div
                className={classes.listContainer}
                key={`symptom-sidebar-container-${each}`}
              >
                <div className={classes.day}>
                  <div className="day">
                    <div
                      className={`${classes.circle} ${
                        findCommonElements(
                          practitionerStore.selectedPatientSymptoms.summary[
                            each
                          ],
                          SevereSymptoms
                        ) && classes.severe
                      }`}
                    >
                      {" "}
                    </div>
                    {DateTime.fromISO(each).toLocaleString(DateTime.DATE_SHORT)}
                  </div>
                  <div className="line" />
                </div>
                <div className="list">
                  {practitionerStore.selectedPatientSymptoms.summary[each] &&
                    practitionerStore.selectedPatientSymptoms.summary[each].map(
                      (symptom) => {
                        return (
                          <p key={`symptom-sidebar-${symptom}`}>
                            <Symptom icon string={symptom} />
                          </p>
                        );
                      }
                    )}
                </div>
              </div>
            );
          })}{" "}
        </div>
      )}
    </Basicsidebar>
  );
});

export default SymptomSidebar;
