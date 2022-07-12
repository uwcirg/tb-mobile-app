import React from "react";
import ReminderLineItem from "../../../Patient/Home/Reminder/ReminderLineItem";
import { useTranslation } from "react-i18next";

import useAsyncWithParams from "../../../Hooks/useAsyncWithParams";
import PropTypes from "prop-types";
import SharedAPI from "../../../API/SharedAPI";
import { DateTime } from "luxon";

export default function AppointmentList({ patientId }) {
  const { t } = useTranslation("translation");

  const { value: appointments } = useAsyncWithParams({
    asyncFunc: SharedAPI.getAppointments,
    immediate: true,
    funcParams: [patientId],
    initialData: [],
  });

  let grouped = {};

  for (let apt of appointments.sort((a, b) => {
    return DateTime.fromISO(b.datetime).toMillis() - DateTime.fromISO(a.datetime).toMillis()
  })) {
    if (DateTime.fromISO(apt.datetime).diffNow("days").minutes > 0) {
      if (!grouped.future) {
        grouped.future = [];
      } else {
        grouped.future.push(apt);
      }
    } else {
      if (!grouped.past) {
        grouped.past = [];
      } else {
        grouped.past.push(apt);
      }
    }
  }

  return (
    <>
      {Object.keys(grouped).length > 0 &&
        Object.keys(grouped).map((each) => {
          return (
            <>
              <p>{each}</p>
              <Items items={grouped[each]} />
            </>
          );
        })}
    </>
  );
}

const Items = ({ items }) => {
  console.log(items);
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
