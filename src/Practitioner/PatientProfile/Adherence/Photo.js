import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useStores from "../../../Basics/UseStores";
import StackedLinearProgress from "../../../Components/StackedLinearProgress";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import AdherenceDetails from "./Details";
import LabeledBar from "./LabeledBar";

const useStyles = makeStyles({
  percent: { fontSize: "1.75em" },
  details: { width: "100%", margin: "1em 0" },
});

const PhotoAdherence = observer(() => {
  const { details: patient } = useStores().patientProfileStore.selectedPatient;
  const { t } = useTranslation("translation");
  const partV = Math.round(
    (patient.photoSummary.conclusive / patient.photoSummary.requested) * 100
  );
  const totalV = Math.round(
    (patient.photoSummary.submitted / patient.photoSummary.requested) * 100
  );
  const missed =
    patient.photoSummary.requested - patient.photoSummary.submitted;

  const detailContent = {
    green: {
      label: t("report.conclusive"),
      data: patient.photoSummary.conclusive,
    },
    yellow: {
      label: t("report.inconclusive"),
      data: patient.photoSummary.inconclusive || 0,
    },
    red: {
      label: t("coordinator.patientProfile.adherenceSection.missedRequest"),
      data: missed || 0,
    },
  };

  return (
    <div>
      <Typography>
        {t("coordinator.patientTableLabels.photoAdherence")}
      </Typography>

      <LabeledBar
        type="photo"
        adherenceValue={patient.photoAdherence}
        bar={<StackedLinearProgress partValue={partV} totalValue={totalV} />}
      />

      <AdherenceDetails
        detailContent={detailContent}
        additionalDetails={<Details submitted={totalV} conclusive={partV} />}
      />
    </div>
  );
});

const Details = ({ submitted, conclusive }) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");
  return (
    <Grid
      wrap="nowrap"
      direction="row"
      justify="center"
      className={classes.details}
      container
    >
      <Detail text={t("report.conclusive")} percent={conclusive} />
      <Detail
        text={t("coordinator.tasksSidebar.submitted")}
        percent={submitted}
      />
    </Grid>
  );
};

const Detail = ({ text, percent }) => {
  const classes = useStyles();
  return (
    <Grid direction="column" alignItems="center" container>
      <Typography>{text}</Typography>
      <Typography className={classes.percent} variant="h2">
        {percent}%
      </Typography>
    </Grid>
  );
};

export default PhotoAdherence;
