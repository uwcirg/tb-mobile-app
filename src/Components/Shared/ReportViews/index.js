import React from "react";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import { Box, Fade, Grid, IconButton, Typography } from "@material-ui/core";
import ViewDailyReport from "../ViewDailyReport";
import { DateTime } from "luxon";
import { CameraAlt, Clear, Event, ListAlt } from "@material-ui/icons";
import LinkTabs from "../LinkTabs";
import ReportList from "./List";
import useQuery from "../../../Hooks/useQuery";
import Loading from "../../../Practitioner/Shared/CardLoading";
import PhotoList from "./PhotoList";
import { useTranslation } from "react-i18next";
import CalendarWithKey from "./Calendar/CalendarWithKey";

export default function ReportViews({
  reports,
  loading,
  patient,
  tabTopPostition = 0,
}) {
  const query = useQuery();
  const date = query.get("date");
  const { t } = useTranslation();

  const links = [
    {
      link: "calendar",
      text: t("coordinator.patientProfile.calendarReports"),
      icon: Event,
    },
    { link: "list", text: t("commonWords.list"), icon: ListAlt },
    { link: "photos", text: t("commonWords.photos"), icon: CameraAlt },
  ];

  return (
    <>
      <Box position="sticky" top={tabTopPostition} zIndex={10}>
        {date ? <ExitReportView date={date} /> : <LinkTabs tabs={links} />}
      </Box>
      {loading ? (
        <Loading height={"50vh"} />
      ) : (
        <>
          {date ? (
            <Fade in timeout={1000} appear>
              <Box>
                <ViewDailyReport date={date} report={reports[date]} />
              </Box>
            </Fade>
          ) : (
            <Switch>
              <Route path="*/calendar">
                <CalendarWithKey patient={patient} reportHash={reports} />
              </Route>
              <Route path="*/list">
                <ReportList reportHash={reports} patient={patient} />
              </Route>
              <Route path="*/photos">
                <PhotoList
                  reportsHash={reports}
                  photoDays={patient.photoDays}
                />
              </Route>
              <Redirect path="*/" to={"/progress/calendar"} />
            </Switch>
          )}
        </>
      )}
    </>
  );
}

const ExitReportView = ({ date }) => {
  const { t } = useTranslation("translation");
  const history = useHistory();

  return (
    <Box bgcolor="white" padding=".5em 1em">
      <Grid alignItems="center" container>
        <Typography variant="h6">
          {DateTime.fromISO(date).toLocaleString({
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <Box flexGrow={1} />
        <IconButton onClick={history.goBack}>
          <Clear />
        </IconButton>
      </Grid>
    </Box>
  );
};
