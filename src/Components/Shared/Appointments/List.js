import React from "react";
import ReminderLineItem from "../../../Patient/Home/Reminder/ReminderLineItem";
import { useTranslation } from "react-i18next";

import useAsyncWithParams from "../../../Hooks/useAsyncWithParams";
import PropTypes from "prop-types";
import SharedAPI from "../../../API/SharedAPI";
import { Collapse, Typography, Grid, Box } from "@material-ui/core";
import ExpansionToggle from "../../ExpansionToggle";
import useToggle from "../../../Hooks/useToggle";
import groupAppointments from "../../../Utility/group-appointments";

export default function AppointmentList({ patientId }) {
  const { t } = useTranslation("translation");

  const { value: appointments } = useAsyncWithParams({
    asyncFunc: SharedAPI.getAppointments,
    immediate: true,
    funcParams: [patientId],
    initialData: [],
  });

  const grouped = groupAppointments(appointments);
  return (
    <>
      {Object.keys(grouped).length > 0 &&
        Object.keys(grouped).map((each) => (
          <Group key={`group-${each}`} title={each} items={grouped[each]} />
        ))}
    </>
  );
}

const Group = ({ items, title }) => {
  const [expanded, toggle] = useToggle(true);
  const { t } = useTranslation("translation");

  const getTitle = (str) => {
    if (str === "future") return t("milestones.upcoming");
    if (str === "past") return t("milestones.previous");
  };

  return (
    <>
      <Grid alignItems="center" onClick={toggle} container wrap="nowrap">
        <Box padding="1rem 0">
          <Typography style={{ fontSize: "1.2rem" }} variant="h2">
            {getTitle(title)} {items.length}
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <ExpansionToggle expanded={expanded} />
      </Grid>
      <Collapse in={expanded}>
        <Items items={items} />
      </Collapse>
    </>
  );
};

const Items = ({ items }) => {
  return (
    <>
      {items.map((each) => (
        <ReminderLineItem key={`reminder-${each.id}`} reminder={each} />
      ))}
    </>
  );
};

AppointmentList.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
