import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { SentimentDissatisfied } from "@material-ui/icons";
import ShortDate from "../../../Components/Shared/ShortDate";
import ExpandableCard from "../../../Components/ExpandableCard";

export default function SupportRequests({ supportRequests }) {
  const { t } = useTranslation("translation");

  return (
    <ExpandableCard
      title={t("mobileUpdate.supportRequests")}
      icon={SentimentDissatisfied}
      number={supportRequests.length}
    >
      {supportRequests.map((each) => {
        return (
          <Grid alignItems="center" container key={`suport-${each.date}`}>
            <ShortDate date={each.date} />
            <Box
              margin="0 16px"
              height="10px"
              borderRight="solid 1px black"
              aria-hidden
            />
            <Typography variant="body1">{each.reason}</Typography>
          </Grid>
        );
      })}
    </ExpandableCard>
  );
}
