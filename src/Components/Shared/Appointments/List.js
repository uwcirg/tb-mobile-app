import React from "react";
import ReminderLineItem from "./LineItem";
import { useTranslation } from "react-i18next";

import useAsyncWithParams from "../../../Hooks/useAsyncWithParams";
import PropTypes from "prop-types";
import SharedAPI from "../../../API/SharedAPI";
import { Collapse, Typography, Grid, Box, Avatar } from "@material-ui/core";
import ExpansionToggle from "../../ExpansionToggle";
import useToggle from "../../../Hooks/useToggle";
import groupAppointments from "../../../Utility/group-appointments";
import SmallAvatar from "../SmallAvatar";
import AsyncLoadingWrapper from "../../AsyncLoadingWrapper";

export default function AppointmentList({ patientId }) {
  const { t } = useTranslation("translation");

  const { value: appointments, status } = useAsyncWithParams({
    asyncFunc: SharedAPI.getAppointments,
    immediate: true,
    funcParams: [patientId],
    initialData: [],
  });

  const grouped = groupAppointments(appointments);
  return (
    <AsyncLoadingWrapper status={status}>
      {Object.keys(grouped).length > 0 &&
        Object.keys(grouped).map((each) => (
          <Group key={`group-${each}`} title={each} items={grouped[each]} />
        ))}
    </AsyncLoadingWrapper>
  );
}

const Group = ({ items, title }) => {
  const [expanded, toggle] = useToggle(title !== "past");
  const { t } = useTranslation("translation");

  const getTitle = (str) => {
    if (str === "future") return t("milestones.upcoming");
    if (str === "past") return t("milestones.previous");
  };

  return (
    <>
      <Box borderBottom="1px solid lightgray" padding=".5rem 0">
        <Grid alignItems="center" onClick={toggle} container wrap="nowrap">
          <Grid container alignItems="center">
            <SmallAvatar>{items.length}</SmallAvatar>
            <Box width=".5rem" />
            <Typography style={{ fontSize: "1.2rem" }} variant="h2">
              {getTitle(title)}
            </Typography>
          </Grid>
          <Box flexGrow={1} />
          <ExpansionToggle expanded={expanded} />
        </Grid>
      </Box>
      <Collapse in={expanded}>
        <Items group={title} items={items} />
      </Collapse>
    </>
  );
};

const Items = ({ items, group }) => {
  const optionallyReversedItems = group === "future" ? items.reverse() : items;
  return (
    <Box paddingTop="1rem">
      {optionallyReversedItems.map((each) => (
        <ReminderLineItem
          showMenu={group === "future"}
          key={`reminder-${each.id}`}
          reminder={each}
        />
      ))}
    </Box>
  );
};

AppointmentList.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
