import React, { useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import TopPageLabel from "../Components/Shared/TopPageLabel";
import { useTranslation } from "react-i18next";
import { Box, TextField, Grid, Typography } from "@material-ui/core";
import InputCard from "../Components/Shared/Appointments/AddAppointment/InputCard";
import DateInput from "../Components/Shared/Appointments/AddAppointment/DateInput";
import FlatButton from "../Components/FlatButton";
import useAsync from "../Hooks/useAsyncWithParams";
import PractitionerAPI from "../API/PractitionerAPI";
import Loading from "./Shared/CardLoading";
import { useHistory } from "react-router-dom";
import GenericErrorMessage from "../Components/GenericErrorMessage";
import PractitionerContext from "./PractitionerContext";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Colors from "../Basics/Colors";
import NewButton from "../Basics/NewButton";
import ExitToApp from "@material-ui/icons/ExitToApp";
import TextCopy from "../Utility/Copiable";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const initialState = {
  givenName: "",
  familyName: "",
  phoneNumber: "",
  treatmentStart: DateTime.local().toISO(),
};

export default function AddPatient() {
  const { t } = useTranslation("translation");
  const [state, setState] = useState({ ...initialState });
  const history = useHistory();
  const { execute: refreshPatients } = useContext(PractitionerContext).patients;

  useEffect(() => {
    return function cleanup() {
      refreshPatients();
    };
  }, []);

  const { execute, status, value } = useAsync({
    asyncFunc: PractitionerAPI.addPatient,
    immediate: false,
    funcParams: [state],
  });

  return (
    <>
      <TopPageLabel sticky title={t("coordinator.addPatientFlow.title")} />
      {status === "idle" && (
        <Form state={state} setState={setState} handleSubmit={execute} />
      )}
      {status === "pending" && (
        <>
          <Box height="3em" />
          <Loading />
        </>
      )}
      {status === "success" && !!value?.paramErrors && (
        <>
          <Box margin="16px" padding="0 16px" borderLeft="2px solid red">
            <Typography>{t("commonWords.errorMessage")}</Typography>
          </Box>
          <Form
            state={state}
            error={value?.paramErrors}
            setState={setState}
            handleSubmit={execute}
          />
        </>
      )}
      {status === "success" && !!!value?.paramErrors && (
        <>
          <Success
            handleExit={() => {
              history.goBack();
            }}
            activationCode={value?.code}
          />
        </>
      )}
    </>
  );
}

const Form = ({ state, setState, handleSubmit, error }) => {
  const handleDateChange = (dt) => {
    const tempDT = dt
      .set({
        hour: state.treatmentStart.hour,
        minute: state.treatmentStart.minute,
      })
      .startOf("minute");
    setState({ ...state, treatmentStart: tempDT.toISO() });
  };

  const validPhone = state.phoneNumber.length >= 9;

  const submitDisabled =
    state.firstName === "" || state.lastName === "" || !validPhone;

  const { t } = useTranslation("translation");

  return (
    <Box padding="1em" maxWidth="700px">
      <InputCard title={`${t("patient.userFields.firstName")} *`}>
        <TextField
          value={state.givenName}
          onChange={(e) => {
            setState({ ...state, givenName: e.target.value });
          }}
          placeholder={t("patient.userFields.firstName") + "..."}
          multiline
          fullWidth
          variant="outlined"
          error={!!error?.givenName}
        />
      </InputCard>

      <InputCard title={`${t("patient.userFields.lastName")} *`}>
        <TextField
          value={state.familyName}
          onChange={(e) => {
            setState({ ...state, familyName: e.target.value });
          }}
          placeholder={t("patient.userFields.lastName") + "..."}
          multiline
          fullWidth
          variant="outlined"
          error={!!error?.familyName}
        />
      </InputCard>

      <InputCard title={`${t("coordinator.patientProfile.phoneNumber")} *`}>
        {error?.phoneNumber && (
          <Box borderLeft="2px solid red" marginBottom="16px" padding="0 16px">
            {t("coordinator.patientProfile.editDetails.inputError")}
          </Box>
        )}
        <TextField
          value={state.phoneNumber}
          onChange={(e) => {
            setState({ ...state, phoneNumber: e.target.value });
          }}
          placeholder={t("coordinator.patientProfile.phoneNumber") + "..."}
          multiline
          fullWidth
          variant="outlined"
          error={!!error?.phoneNumber}
        />
      </InputCard>

      <InputCard title={t("patient.userFields.treatmentStart")}>
        <DateInput value={state.treatmentStart} setValue={handleDateChange} />
      </InputCard>
      <Grid container>
        <Box flexGrow={1} />
        <FlatButton onClick={handleSubmit} disabled={submitDisabled}>
          {t("coordinator.addPatientFlow.title")}
        </FlatButton>
      </Grid>
      <Box height="3.5rem" aria-hidden />
    </Box>
  );
};

const Success = ({ handleExit, activationCode }) => {
  const { t } = useTranslation("translation");

  return (
    <Box>
      <Box padding="32px 16px">
        <Grid alignItems="center" container wrap="nowrap">
          <CheckCircle style={{ color: Colors.green, fontSize: "5rem" }} />
          <Box padding="0 1rem">
            <Typography style={{ fontSize: "1.5rem", lineHeight: "1.75rem" }}>
              {t("coordinator.addPatientFlow.patientSuccess")}
            </Typography>
          </Box>
        </Grid>
      </Box>
      <Box padding="32px 16px">
        <Box maxWidth="500px">
          <Typography variant="body1">
            {t("coordinator.addPatientFlow.forPatient")}:
          </Typography>
          <Box padding="0 1em">
            <TextCopy icon={<VpnKeyIcon />} text={activationCode} />
          </Box>
        </Box>
      </Box>
      <Box padding="0 1em" maxWidth="500px">
        <NewButton
          onClick={handleExit}
          text={t("archive.complete")}
          icon={<ExitToApp />}
        />
      </Box>
    </Box>
  );
};
