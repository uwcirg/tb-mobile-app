import React from "react";
import ReminderLineItem from "../../../../Patient/Home/Reminder/ReminderLineItem";
import EventIcon from "@material-ui/icons/Event";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@material-ui/core";
import NewButton from "../../../../Basics/NewButton";
import ClickableText from "../../../../Basics/ClickableText";
import SharedAPI from "../../../../API/SharedAPI";
import useAsyncWithParams from "../../../../Hooks/useAsyncWithParams";
import useToggle from "../../../../Hooks/useToggle";
import PropTypes from "prop-types";
import Colors from "../../../../Basics/Colors";

export default function ViewAppointments({ patientId }) {
  const { t } = useTranslation("translation");

  const {
    execute,
    status,
    value: appointments,
    error,
    reset,
  } = useAsyncWithParams({
    asyncFunc: SharedAPI.getAppointments,
    immediate: true,
    funcParams: [patientId],
    initialData: [],
  });

  return (
    <>
      <AppointmentList
        appointments={appointments}
        header={t(`patient.progress.upcoming`)}
      />
      <NewButton
        to="/add-appointment"
        icon={<EventIcon />}
        text={t("appointments.addAppointment")}
      />
    </>
  );
}

const AppointmentList = ({ appointments: apts }) => {
  const [fullListVisible, toggleFullListVisible] = useToggle(false);
  const { t } = useTranslation("translation");

  return (
    <Box width="100%" style={{ boxSizing: "border-box" }} padding="0 1rem">
      <Box width="100%" paddingBottom="8px" borderBottom="solid 1px lightgray">
        <Typography
          style={{ fontSize: "1.2rem", color: Colors.textDarkGray }}
          variant="h2"
        >
          {t("appointments.nextAppointment")}
        </Typography>
      </Box>
      <Box height="16px" />
      {apts &&
        apts
          .slice(0, fullListVisible ? -1 : 1)
          .map((each) => (
            <ReminderLineItem key={`reminder-${each.id}`} reminder={each} />
          ))}
      {apts?.length > 1 && (
        <ToggleAppointments
          fullListVisible={fullListVisible}
          onClick={toggleFullListVisible}
        />
      )}
    </Box>
  );
};

const ToggleAppointments = ({ onClick, fullListVisible }) => {
  const { t } = useTranslation("translation");

  return (
    <Box
      padding="1rem"
      marginRight="1rem"
      width="100%"
      display="flex"
      justifyContent="space-between"
    >
      <ClickableText
        text={
          !fullListVisible
            ? t("appointments.showAll")
            : t("appointments.showLess")
        }
        icon={!fullListVisible ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        onClick={onClick}
      />
    </Box>
  );
};

ViewAppointments.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
