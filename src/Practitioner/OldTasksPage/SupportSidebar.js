import React, { useEffect } from "react";
import Basicsidebar from "../Shared/Sidebar";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";
import Styles from "../../Basics/Styles";
import Colors from "../../Basics/Colors";
import SharedButton from "../Shared/SharedButton";
import QIcon from "@material-ui/icons/HelpOutline";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  supportContent: {
    width: "90%",
    margin: "auto",
    height: "300px",
    overflow: "scroll",
  },
  buttonContainer: {
    marginTop: "2em",
    width: "100%",
    margin: "auto",
    ...Styles.flexRow,
    justifyContent: "space-evenly",
  },
  date: {
    fontWeight: "bold",
    color: Colors.textGray,
  },
});

const SupportSidebar = observer((props) => {
  const { practitionerStore } = useStores();
  const classes = useStyles();
  const { t, i18n } = useTranslation("translation");

  const patient = practitionerStore.getSelectedPatient;

  const show =
    patient && patient.supportRequests && patient.supportRequests.length > 0;
  return (
    <Basicsidebar
      buttons={
        <>
          <SharedButton
            text={"Contacted"}
            onClick={() => {
              practitionerStore.resolveSupportRequest();
            }}
          />
        </>
      }
    >
      {show && (
        <div className={classes.supportContent}>
          {patient.supportRequests.map((each) => {
            return (
              <div>
                <p className={classes.date}>
                  {DateTime.fromISO(each.date).toLocaleString(
                    DateTime.DATE_FULL
                  )}
                </p>
                <p>{each.doing_okay_reason || "No Reason Submitted"}</p>
              </div>
            );
          })}
        </div>
      )}
    </Basicsidebar>
  );
});

export default SupportSidebar;
