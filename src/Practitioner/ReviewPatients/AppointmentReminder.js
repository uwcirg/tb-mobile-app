import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AccessAlarm } from "@material-ui/icons";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import Colors from "../../Basics/Colors";
import IssueCard from "./IssueDetails/IssueCard";
import ShortDate from "../../Components/Shared/ShortDate";

export default function AppointmentReminder({ id, nextReminder }) {
  const { t } = useTranslation("translation");
  const { category, note, datetime } = nextReminder;
  const date = DateTime.fromISO(datetime);

  return (
    <>
      <IssueCard
        title={t("appointments.nextAppointment")}
        icon={<AccessAlarm style={{ color: Colors.transparentBlueAccent }} />}
        colors={Colors.transparentBlueAccent}
        typeColor={Colors.buttonBlue}
      >
        <Link
          to={`/patients/${id}/appointments`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box display="flex" flexDirection="column" alignItems="start">
            <Typography
              variant="body1"
              style={{
                padding: ".2em",
                marginX: ".5em",
              }}
            >
              <IssuePreview date={date} category={category} />
            </Typography>
          </Box>
        </Link>
      </IssueCard>
    </>
  );
}

const IssuePreview = ({ date, category }) => {
  const { t } = useTranslation("translation");
  return (
    <Box display="flex" alignItems="center">
      <Box borderRight={`solid 2px ${Colors.lightgray}`} paddingRight=".75em">
        <ShortDate date={date} />
      </Box>
      <Box
        marginLeft="1em"
        style={{
          border: ` 1px solid ${Colors.transparentBlueAccent}`,
          borderRadius: "5px",
          color: Colors.buttonBlue,
        }}
        padding=".5em 1em"
      >
        <span style={{ fontWeight: "450" }}>
          <>{t(`appointments.types.${category}`)} </>
          {"@ "}
          {date.toLocaleString(DateTime.TIME_SIMPLE)}
        </span>
      </Box>
    </Box>
  );
};
