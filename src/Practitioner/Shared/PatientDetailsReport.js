import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import SharedAPI from "../../API/SharedAPI";
import useAsync from "../../Hooks/useAsync";
import { useTranslation } from "react-i18next";
import ReportViews from "../../Components/Shared/ReportViews";
import TopPageLabel from "../../Components/Shared/TopPageLabel";
import useStores from "../../Basics/UseStores";
import { useHistory } from "react-router-dom";

export default function PatientDetailsReport() {
  const { t } = useTranslation("translation");
  const { patientProfileStore } = useStores();
  const history = useHistory();
  let patient = patientProfileStore.selectedPatient.details;

  const { patientId } = useParams();

  const getDailyReports = useCallback(() => {
    return SharedAPI.getDailyReports(patientId || patient.id);
  }, [patient.id, patientId]);

  const { value, status } = useAsync(getDailyReports);

  const reportHash = useMemo(() => {
    return value
      ? value.reduce((prev, current) => {
          const { date } = current;
          return { ...prev, [date]: current };
        }, {})
      : {};
  }, [value]);

  return (
    <>
      <TopPageLabel
        handleExit={() => {
          history.push(`/patients/${patient.id}`);
        }}
        sticky
        title={t("coordinator.addPatientFlow.title")}
      />
      {patient && (
        <ReportViews
          patient={{
            id: patient.id,
            photoDays: patient.photoSchedule,
            treatmentStart: patient.treatmentStart,
          }}
          reports={reportHash}
          loading={status === "pending"}
        />
      )}
    </>
  );
}
