import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AccessTime } from "@material-ui/icons";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import Colors from "../../Basics/Colors";
import IssueCard from "./IssueDetails/IssueCard";

export default function AppointmentReminder({ id, nextReminder }) {
  const { t } = useTranslation("translation");
  const date = DateTime.fromISO(nextReminder);
  return (
    <>
      <IssueCard
        title={t("appointments.nextAppointment")}
        icon={<AccessTime style={{ color: Colors.transparentBlueAccent }} />}
        colors={Colors.transparentBlueAccent}
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
              {date.toLocaleString({
                day: "numeric",
                month: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23",
              })}
            </Typography>
            <Typography
              variant="caption"
              style={{
                textDecoration: "underline",
                color: Colors.buttonBlue,
              }}
            >
              {t("appointments.nextAppointment")} &rarr;
            </Typography>
          </Box>
        </Link>
      </IssueCard>
      {/* <Box grow={1} padding=".2em .75em" margin=".2em .75em">
      <Link
        to={`/patients/${id}/appointments`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          paddingBottom={".2em"}
          paddingTop={".2em"}
          paddingX={".5em"}
          style={{
            border: `2px solid ${Colors.transparentBlueAccent}`,
            borderRadius: "5px",
            boxShadow: `2px 3px 4px rgba(0, 0, 0, 0.10)`,
          }}
        >
          <Box paddingRight=".15em">
            <AccessTime fontSize="large" />
          </Box>
          
        </Box>
      </Link>
    </Box> */}
    </>
  );
}
