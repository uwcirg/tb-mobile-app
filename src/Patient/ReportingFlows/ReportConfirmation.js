import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import useStores from "../../Basics/UseStores";
import SimpleButton from "../../Basics/SimpleButton";
import PatientReport from "../../Basics/PatientReport";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  superContainer: {
    marginBottom: "1em",
  },
});

const ReportConfirmation = observer(() => {
  const classes = useStyles();
  const { patientStore, patientUIStore, uiStore } = useStores();
  const { t } = useTranslation("translation");

  patientStore.report.headerText = t("patient.report.confirmation.title");

  const handleSubmit = () => {
    if (uiStore.offline) {
      patientStore.submitOfflineReport(uiStore.offline);
    }
    patientUIStore.endReport();
    patientStore.getReports();
    patientStore.getPatientInformation();
  };

  return (
    <div className={classes.superContainer}>
      <PatientReport
        medicationNotTakenReason={patientStore.report.whyMedicationNotTaken}
        medicationWasTaken={patientStore.report.tookMedication}
        timeTaken={patientStore.report.timeTaken}
        selectedSymptoms={patientStore.report.selectedSymptoms}
        photoString={patientStore.report.photoString}
        isPhotoDay={patientStore.isPhotoDay}
      />
      <SimpleButton alignRight onClick={handleSubmit}>
        {t("patient.report.confirmation.title")}
      </SimpleButton>
    </div>
  );
});

export default ReportConfirmation;
