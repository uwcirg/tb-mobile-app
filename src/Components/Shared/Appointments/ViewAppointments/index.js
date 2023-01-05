import React from "react";
import ReminderLineItem from "../LineItem";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@material-ui/core";
import ClickableText from "../../../../Basics/ClickableText";
import SharedAPI from "../../../../API/SharedAPI";
import useAsyncWithParams from "../../../../Hooks/useAsyncWithParams";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { KeyboardArrowRight } from "@material-ui/icons";
import groupAppointments from "../../../../Utility/group-appointments";
import { DateTime } from "luxon";

export default function ViewAppointments({ patientId }) {
  const { t } = useTranslation("translation");

  const history = useHistory();

  const { value: apts } = useAsyncWithParams({
    asyncFunc: SharedAPI.getFutureAppointments,
    immediate: true,
    funcParams: [patientId],
    initialData: [],
  });

  // if we are using the new API, we need to sort the appointments accordingly
  // nextAppointment may be unnecessary
  let nextAppointment = groupAppointments(apts)?.future?.sort((a, b) => {
    return (
      DateTime.fromISO(a.datetime).toMillis() -
      DateTime.fromISO(b.datetime).toMillis()
    );
  })[0];

  return (
    <Box width="100%" padding="0 .5rem" style={{ boxSizing: "border-box" }}>
      <Box width="100%">
        <Title />
        <Box padding="1rem 0">
          {nextAppointment ? (
            <ReminderLineItem reminder={nextAppointment} />
          ) : (
            <Typography>{t("appointments.noUpcoming")}</Typography>
          )}
        </Box>
        <ClickableText
          hideIcon
          text={
            <>
              {t("appointments.manage")} <KeyboardArrowRight />
            </>
          }
          onClick={() => {
            history.push("/information/appointments");
          }}
        />
      </Box>
    </Box>
  );
}

const Title = () => {
  const { t } = useTranslation("translation");
  return (
    <Box width="100%" paddingBottom="8px" borderBottom="solid 1px lightgray">
      <Typography>{t("appointments.nextAppointment")}</Typography>
    </Box>
  );
};

ViewAppointments.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
