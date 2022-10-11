import React, { useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useStores from "../Basics/UseStores";
import { observer } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import SimpleButton from "../Basics/SimpleButton";

const useStyles = makeStyles({
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "600px",
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    boxSizing: "border-box",
    marginTop: "2em",
    margin: 0,
    width: "auto",
    alignSelf: "flex-end",
    "& > button": {
      marginRight: 0,
    },
  },
  password: {
    width: "100%",
    height: "1.5em",
    margin: "2em 0",
  },
});

const PasswordReset = observer((props) => {
  const classes = useStyles();
  const { patientStore, passwordStore, patientUIStore } = useStores();
  const { t } = useTranslation("translation");

  useEffect(() => {
    return function cleanup() {
      passwordStore.resetPasswordUpdateState();
    };
  }, []);

  const handleSubmit = () => {
    passwordStore.updatePassword().then((success) => {
      if (props.isForced && success) {
        patientStore.exitForcedPasswordChange();
        patientUIStore.setAlert(t("forcePasswordUpdate.success"));
      }
    });
  };

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <TextField
          onChange={(e) => {
            passwordStore.currentPassword = e.target.value;
          }}
          value={passwordStore.currentPassword}
          fullWidth
          className={classes.password}
          id="currentPassword"
          label={
            props.isForced
              ? t("forcePasswordUpdate.temporaryPassword")
              : t("settings.currentPassword")
          }
          type="password"
          autoComplete="current-password"
          error={passwordStore.errors.slice().includes("currentPassword")}
        />
        <TextField
          onChange={(e) => {
            passwordStore.newPassword = e.target.value;
          }}
          value={passwordStore.newPassword}
          fullWidth
          className={classes.password}
          id="newPassword"
          label={t("settings.newPassword")}
          type="password"
          autoComplete="new-password"
          error={passwordStore.errors.slice().includes("newPassword")}
        />
        <TextField
          onChange={(e) => {
            passwordStore.newPasswordConfirmation = e.target.value;
          }}
          value={passwordStore.newPasswordConfirmation}
          fullWidth
          className={classes.password}
          id="newPasswordConfirmation"
          label={t("settings.confirmPassword")}
          type="password"
          autoComplete="new-password"
          error={passwordStore.errors
            .slice()
            .includes("newPasswordConfirmation")}
        />
        <SimpleButton
          className={classes.button}
          alignRight
          onClick={handleSubmit}
        >
          {t("settings.submit")}
        </SimpleButton>
      </form>
      {passwordStore.message && (
        <Snackbar
          open={passwordStore.message !== ""}
          autoHideDuration={6000}
          onClose={() => {
            passwordStore.message = "";
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={passwordStore.success ? "success" : "error"}
          >
            {passwordStore.message}
          </MuiAlert>
        </Snackbar>
      )}
    </div>
  );
});

export default PasswordReset;
