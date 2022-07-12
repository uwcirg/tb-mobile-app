import React from "react";
import ReminderLineItem from "../../../Patient/Home/Reminder/ReminderLineItem";
import { useTranslation } from "react-i18next";

import useAsyncWithParams from "../../../Hooks/useAsyncWithParams";
import PropTypes from "prop-types";
import SharedAPI from "../../../API/SharedAPI";

export default function AppointmentList({ patientId }) {
  const { t } = useTranslation("translation");

  const { value: appointments } = useAsyncWithParams({
    asyncFunc: SharedAPI.getAppointments,
    immediate: true,
    funcParams: [patientId],
    initialData: [],
  });

  return (
    <>
      {appointments &&
        appointments.map((each) => (
          <ReminderLineItem key={`reminder-${each.id}`} reminder={each} />
        ))}
    </>
  );
}

AppointmentList.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
