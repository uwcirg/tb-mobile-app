import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import Colors from "../../../../Basics/Colors";
import LoadS3Image from "../../LoadS3Image";
import AttributeTitle from "./AttributeTitle";
import Result from "./Result";
import ReportContainer from "../ReportContainer";
import ShortDate from "../../ShortDate";
import { useTranslation } from "react-i18next";

export default function SingleDay({ date, report }) {
  const { t } = useTranslation("translation");
  const approvalStatus = report?.photoDetails?.approvalStatus;
  const reported = report?.status?.photoReport;
  const photoDetails = {
    url: report?.photoUrl,
    photoId: report?.photoDetails?.id,
  };
  return (
    <ReportContainer
      key={`photo-preview-${date}`}
      to={`?date=${date}`}
      disabled={!reported}
    >
      <Grid container alignItems="flex-start">
        <Box
          bgcolor={reported ? Colors.calendarGreen : Colors.calendarRed}
          borderRadius="4px"
          padding=".5em"
        >
          <ShortDate date={date} />
        </Box>
        <Box padding="0 8px">
          {!reported && (
            <Typography variant="body2">
              {t("report.missedPhotoShort")}
            </Typography>
          )}

          {photoDetails.url && (
            <Box borderLeft="1px solid lightgray" paddingLeft="8px">
              <AttributeTitle>{t("commonWords.stripPhoto")}:</AttributeTitle>
              <LoadS3Image style={{ width: "100px" }} photo={photoDetails} />
              <AttributeTitle>{t("photoReportReview.result")}:</AttributeTitle>
              <Result result={approvalStatus} />
            </Box>
          )}
        </Box>
      </Grid>
    </ReportContainer>
  );
}
