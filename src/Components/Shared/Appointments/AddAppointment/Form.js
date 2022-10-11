import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, TextField, Grid, makeStyles } from "@material-ui/core";
import FlatButton from "../../../FlatButton";
import TimeInput from "./TimeInput";
import DateInput from "./DateInput";
import { DateTime } from "luxon";
import Section from "./InputCard";
import SelectAppointmentType from "./SelectAppointmentType";

const useStyles = makeStyles({
  createButton: {
    fontSize: "1rem",
  },
});

export default function Form({ state, setState, handleSubmit }) {
  const { t } = useTranslation("translation");

  const classes = useStyles();

  const history = useHistory();
  const disableSubmit = !state.category;

  const handleDateChange = (dt) => {
    const tempDT = dt
      .set({ hour: state.datetime.hour, minute: state.datetime.minute })
      .startOf("minute");
    setState({ ...state, datetime: tempDT.toISO() });
  };

  const handleTimeChange = (newTime) => {
    const tempDT = DateTime.fromISO(state.datetime)
      .set({ hour: newTime.hour, minute: newTime.minute })
      .startOf("minute");
    setState({ ...state, datetime: tempDT.toISO() });
  };

  return (
    <Box padding="16px 8px">
      <Section title={t("appointments.typeQuestion")}>
        <SelectAppointmentType
          value={state.category}
          handleChange={(value) => {
            setState({ ...state, category: value });
          }}
        />
      </Section>
      {state.category === "other" && (
        <Section title={t("appointments.otherType")}>
          <TextField
            value={state.otherCategory}
            onChange={(e) => {
              setState({ ...state, otherCategory: e.target.value });
            }}
            placeholder={t("commonWords.other") + "..."}
            fullWidth
            variant="outlined"
          />
        </Section>
      )}
      <Section title={t("coordinator.patientProfile.options.note")}>
        <TextField
          value={state.note}
          onChange={(e) => {
            setState({ ...state, note: e.target.value });
          }}
          placeholder={t("appointments.typeNote") + "..."}
          multiline
          fullWidth
          variant="outlined"
        />
      </Section>

      <Section title={t("appointments.whatDay")}>
        <DateInput value={state.datetime} setValue={handleDateChange} />
      </Section>

      <Section title={t("appointments.whatTime")}>
        <TimeInput value={state.datetime} setValue={handleTimeChange} />
      </Section>
      <Box height="16px" />
      <Grid container>
        <Box flexGrow={1} />
        <FlatButton
          disabled={disableSubmit}
          onClick={handleSubmit}
          className={classes.createButton}
        >
          {t("appointments.createAppointment")}
        </FlatButton>
      </Grid>
      <Box height="2rem" aria-hidden />
    </Box>
  );
}
