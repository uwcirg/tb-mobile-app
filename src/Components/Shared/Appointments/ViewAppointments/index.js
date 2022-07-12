import React from "react";
import ReminderLineItem from "../../../../Patient/Home/Reminder/ReminderLineItem";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@material-ui/core";
import ClickableText from "../../../../Basics/ClickableText";
import SharedAPI from "../../../../API/SharedAPI";
import useAsyncWithParams from "../../../../Hooks/useAsyncWithParams";
import useToggle from "../../../../Hooks/useToggle";
import PropTypes from "prop-types";
import Colors from "../../../../Basics/Colors";
import ExpansionToggle from "../../../ExpansionToggle";

export default function ViewAppointments({ patientId }) {
  const { t } = useTranslation("translation");

  const { value: appointments } = useAsyncWithParams({
    asyncFunc: SharedAPI.getAppointments,
    immediate: true,
    funcParams: [patientId],
    initialData: [],
  });

  return (
    <Box width="100%" padding="0 .5rem" style={{ boxSizing: "border-box" }}>
      <AppointmentList
        appointments={appointments}
        header={t(`patient.progress.upcoming`)}
      />
      {/* <NewButton
        to="/settings/appointments"
        icon={<EventNote />}
        text={t("patient.home.progress.viewAll")}
      />
      <NewButton
        to="/settings/appointments/add"
        icon={<AddBox />}
        text={t("appointments.addAppointment")}
      /> */}
    </Box>
  );
}

const Title = () => {
  const { t } = useTranslation("translation");
  return (
    <Box width="100%" paddingBottom="8px" borderBottom="solid 1px lightgray">
      <Typography
        style={{ fontSize: "1.2rem", color: Colors.textDarkGray }}
        variant="h1"
      >
        {t("appointments.nextAppointment")}
      </Typography>
    </Box>
  );
};

const AppointmentList = ({ appointments: apts }) => {
  const [fullListVisible, toggleFullListVisible] = useToggle(false);
  const { t } = useTranslation("translation");

  return (
    <Box width="100%">
      <Title />
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
    <Box width="100%" display="flex" justifyContent="space-between">
      <ClickableText
        text={
          !fullListVisible
            ? t("appointments.showAll")
            : t("appointments.showLess")
        }
        icon={<ExpansionToggle expanded={!fullListVisible} />}
        onClick={onClick}
      />
    </Box>
  );
};

ViewAppointments.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
