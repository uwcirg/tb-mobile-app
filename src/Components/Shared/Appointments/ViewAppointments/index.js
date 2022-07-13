import React from "react";
import ReminderLineItem from "../../../../Patient/Home/Reminder/ReminderLineItem";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@material-ui/core";
import ClickableText from "../../../../Basics/ClickableText";
import SharedAPI from "../../../../API/SharedAPI";
import useAsyncWithParams from "../../../../Hooks/useAsyncWithParams";
import PropTypes from "prop-types";
import Colors from "../../../../Basics/Colors";
import { useHistory } from "react-router-dom";
import { KeyboardArrowRight } from "@material-ui/icons";

export default function ViewAppointments({ patientId }) {
  const { t } = useTranslation("translation");

  const history = useHistory();

  const { value: apts } = useAsyncWithParams({
    asyncFunc: SharedAPI.getAppointments,
    immediate: true,
    funcParams: [patientId],
    initialData: [],
  });

  return (
    <Box width="100%" padding="0 .5rem" style={{ boxSizing: "border-box" }}>
      <Box width="100%">
        <Title />
        <Box height="16px" />
        {apts && apts[0] && <ReminderLineItem reminder={apts[0]} />}
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
