import React from "react";
import { Box, Button } from "@material-ui/core";
import { DateTime } from "luxon";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SingleDay from "./SingleDay";

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
        const report = reportsHash[date];
        return (
          <SingleDay key={`photo-list-${date}`} date={date} report={report} />
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
