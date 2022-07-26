import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import Colors from "../../../../Basics/Colors";
import LoadS3Image from "../../LoadS3Image";
import AttributeTitle from "./AttributeTitle";
import Result from "./Result";
import ReportContainer from "../ReportContainer";
import ShortDate from "../../ShortDate";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "@material-ui/icons";

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
      <Grid container>
        <Box
          alignSelf="flex-start"
          bgcolor={reported ? Colors.calendarGreen : Colors.calendarRed}
          borderRadius="4px"
          padding=".5em"
        >
          <ShortDate date={date} />
        </Box>
        <Box borderLeft="1px solid lightgray" padding="0 8px" margin="0 8px">
          {!reported && (
            <>
              <AttributeTitle>
                {t("coordinator.patientProfile.adherenceSection.didntReport")}
              </AttributeTitle>
              <Typography variant="body2">
                {t("patient.progress.noReport")}
              </Typography>
            </>
          )}
          {photoDetails.url && (
            <>
              <AttributeTitle>{t("commonWords.stripPhoto")}:</AttributeTitle>
              <Box height="4px" />
              <LoadS3Image style={{ width: "100px", borderRadius: "4px" }} photo={photoDetails} />
              <AttributeTitle>{t("photoReportReview.result")}:</AttributeTitle>
              <Box height="4px" />
              <Result result={approvalStatus} />
            </>
          )}
        </Box>
        {photoDetails.url && (
          <>
            <Box flexGrow={1} />
            <Box alignSelf="center">
              <ChevronRight />
            </Box>
          </>
        )}
      </Grid>
    </ReportContainer>
  );
}
