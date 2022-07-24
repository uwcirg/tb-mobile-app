import { Button, Grid, withStyles } from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";
import useStores from "../../Basics/UseStores";
import Input from "./Input";
import { useTranslation } from "react-i18next";
import Colors from "../../Basics/Colors";
import Loading from "../../Practitioner/Shared/Loading";

const Form = observer(({ isProvider, isActivation }) => {
  const { loginStore } = useStores();
  const { t } = useTranslation();

  return (
    <WrappedGrid>
      <Input
        onChange={(e) => {
          loginStore.setIdentifier(e.target.value);
        }}
        value={loginStore.identifier}
        autoComplete="username"
        InputProps={!isProvider ? { inputMode: "numeric" } : {}}
        placeholder={
          isProvider
            ? t("login.email").toLowerCase()
            : t("login.phoneNumber").toLowerCase()
        }
      />
      <Input
        autoComplete="password"
        onChange={(e) => {
          loginStore.setPassword(e.target.value);
        }}
        value={loginStore.password}
        type="password"
        placeholder={t("login.password").toLowerCase()}
      />
      <LoginButton
        onClick={loginStore.submitCombinedLogin}
        fullWidth
        disableElevation
        variant="contained"
      >
        {t("login.logIn")}
      </LoginButton>
      {loginStore.loading && <Loading />}
    </WrappedGrid>
  );
});

const LoginButton = withStyles({
  root: {
    borderRadius: "18px",
    backgroundColor: Colors.papuaGreen,
    color: "white",
    minHeight: "45px",
  },
})(Button);

const WrappedGrid = ({ children }) => {
  return (
    <Grid container spacing={1}>
      {children.map((child) => (
        <Grid item xs={12}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

export default Form;
