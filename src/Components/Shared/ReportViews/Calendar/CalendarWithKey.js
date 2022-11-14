import React, { useState } from "react";
import ReportingCalendar from "./index";
import CalendarKey from "./CalendarKey";
import Colors from "../../../../Basics/Colors";
import { useHistory } from "react-router-dom";
import { DateTime } from "luxon";
import { Box } from "@material-ui/core";

const CalendarWithKey = ({ patient, reportHash }) => {
  const [state, setState] = useState({
    calendarStartDate: new Date(),
  });

  const { calendarStartDate } = state;

  const history = useHistory();

  const updateMonth = (forward = true) => {
    setState({
      ...state,
      calendarStartDate: DateTime.fromJSDate(state.calendarStartDate)
        .startOf("month")
        .plus({ month: forward ? 1 : -1 })
        .toJSDate(),
    });
  };

  return (
    <Box bgcolor="white" padding="1em">
      <ReportingCalendar
        updateMonth={updateMonth}
        displayStartDate={calendarStartDate}
        handleDateChange={(date) => {
          history.push(`?date=${date}`);
        }}
        patient={patient}
        reports={reportHash}
      />
      <Box bgcolor={Colors.lighterGray} padding=".5em" borderRadius="4px">
        <CalendarKey />
      </Box>
    </Box>
  );
};

export default CalendarWithKey;
