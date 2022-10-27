import React, { useEffect } from "react";
import useStores from "../Basics/UseStores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

//Utility component to handle errors from stores and pass them to UIStore for display
const ErrorListener = observer(() => {
  const { t } = useTranslation("translation");
  const { patientStore, patientUIStore } = useStores();

  //Listen for report errors, send to UI store general error handler
  useEffect(() => {
    if (patientStore.reportStore.error) {
      patientUIStore.setAlert(t("patient.report.photoUploadError"), "error");
      patientStore.reportStore.clearError();
    }
  }, [patientStore.reportStore.error]);
  return <></>;
});

export default ErrorListener;
