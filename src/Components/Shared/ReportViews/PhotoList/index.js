import { Box, Button, Grid, Typography } from "@material-ui/core";
import { DateTime } from "luxon";
import React, { useState } from "react";
import ShortDate from "../../ShortDate";
import ReportContainer from "../ReportContainer";
import { useTranslation } from "react-i18next";
import Colors from "../../../../Basics/Colors";
import LoadS3Image from "../../LoadS3Image";
import { Check, CheckCircle, HighlightOff, Label } from "@material-ui/icons";
import Tag from "../../../Tag";
import AttributeTitle from "./AttributeTitle";
import Result from "./Result";

export default function PhotoList({ photoDays, reportsHash }) {
  const { t } = useTranslation("translation");

  const [days, setDays] = useState(7);
  const photoDaysToDisplay = photoDays
    .filter((each) => {
      return DateTime.fromISO(each).diffNow("days").days < 0;
    })
    .reverse();
  const toShow = photoDaysToDisplay.slice(0, days);

  return (
    <Box padding="16px">
      {toShow.map((date) => {
        const approvalStatus = reportsHash[date]?.photoDetails?.approvalStatus;
        const reported = reportsHash[date]?.status?.photoReport;
        const photoDetails = {
          url: reportsHash[date]?.photoUrl,
          photoId: reportsHash[date]?.photoDetails?.id,
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
                    <AttributeTitle>
                      {t("commonWords.stripPhoto")}:
                    </AttributeTitle>
                    <LoadS3Image
                      style={{ width: "100px" }}
                      photo={photoDetails}
                    />
                    <AttributeTitle>
                      {t("photoReportReview.result")}:
                    </AttributeTitle>
                    <Result result={approvalStatus} />
                  </Box>
                )}
              </Box>
            </Grid>
          </ReportContainer>
        );
      })}
      <Button
        onClick={() => {
          setDays(days + 7);
        }}
      >
        {t("commonWords.loadMore")}
      </Button>
    </Box>
  );
}
