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
import { useHistory } from "react-router-dom";
import { KeyboardArrowRight } from "@material-ui/icons";

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
  const { t } = useTranslation("translation");

  const history = useHistory();

  return (
    <Box width="100%">
      <Title />
      <Box height="16px" />
      {apts &&
        apts
          .slice(0, 1)
          .map((each) => (
            <ReminderLineItem key={`reminder-${each.id}`} reminder={each} />
          ))}
      <ClickableText
        hideIcon
        text={
          <>
            View / Add Appointments <KeyboardArrowRight />
          </>
        }
        onClick={() => {
          history.push("/information/appointments");
        }}
      />
    </Box>
  );
};

ViewAppointments.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
