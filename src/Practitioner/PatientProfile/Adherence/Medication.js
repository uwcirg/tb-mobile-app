import React from "react";
import useStores from "../../../Basics/UseStores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import AdherenceValue from "../../../Components/AdherenceValue";
import StackedLinearProgress from "../../../Components/StackedLinearProgress";
import { Box, Grid, Typography } from "@material-ui/core";
import AdherenceDetails from "./Details";
import { CameraAltRounded } from "@material-ui/icons";
import LabeledBar from "./LabeledBar";

const Adherence = observer(() => {
  const { details: patient } = useStores().patientProfileStore.selectedPatient;

  const { t } = useTranslation("translation");

  const part = Math.floor(
    (patient.medicationSummary.adherentDays /
      patient.medicationSummary.daysSinceAppStart) *
      100
  );
  const total = Math.floor(
    ((patient.medicationSummary.adherentDays +
      patient.medicationSummary.reportedMissedDays) /
      patient.medicationSummary.daysSinceAppStart) *
      100
  );
  const diff =
    patient.medicationSummary.daysSinceAppStart -
    patient.medicationSummary.reportedMissedDays -
    patient.medicationSummary.adherentDays;

  const detailContent = {
    green: {
      label: t("coordinator.patientProfile.adherenceSection.reportedTaking"),
      data: patient.medicationSummary.adherentDays,
    },
    yellow: {
      label: t("coordinator.patientProfile.adherenceSection.didntTake"),
      data: patient.medicationSummary.reportedMissedDays,
    },
    red: {
      label: t("coordinator.patientProfile.adherenceSection.didntReport"),
      data: diff,
    },
  };

  return (
    <div>
      <Typography>{t("commonWords.medication")}</Typography>
      <LabeledBar
        type="medication"
        bar={<StackedLinearProgress partValue={part} totalValue={total} />}
        adherenceValue={patient.adherence}
      />
      <AdherenceDetails detailContent={detailContent} />
    </div>
  );
});

export default Adherence;
