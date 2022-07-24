import { Box, Button, Grid } from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import useStores from "../../Basics/UseStores";
import Loading from "../../Practitioner/Shared/Loading";
import ForgotPassword from "../ForgotPassword";
import Input from "./Input";

const PapuaLogin = () => {
  const { t } = useTranslation("translation");
  return (
    <Box minHeight="60vh" padding="2rem">
      <Grid
        style={{ height: "100%" }}
        container
        direction="column"
        justify="center"
      >
        <Box>
          <Box padding="2rem 0">
            <Grid container alignItems="center" direction="column">
              <img
                src="/img/id/login-logo.png"
                style={{ objectFit: "contain" }}
                height="100px"
                width="200px"
              />
            </Grid>
          </Box>
          <Switch>
            <Route path="/login/forgot-password">
              {t("login.forgotPasswordDetails")}
            </Route>
            <Route path="/login/patient">
              <InputForm />
            </Route>
            <Route path="/login/patient">
              <InputForm />
            </Route>
            <Route path="/login/provider">
              <InputForm />
            </Route>
            <Route path="/login">
              <Box>
                <Link to="/login/patient">
                  <Input placeholder="Patient" />
                </Link>
                <Link to="/login/provider">
                  <Input placeholder="Provider" />
                </Link>
              </Box>
            </Route>
            <Redirect to="/login" />
          </Switch>
        </Box>
      </Grid>
    </Box>
  );
};

const InputForm = observer(() => {
  const { loginStore } = useStores();

  const { t } = useTranslation();
  return (
    <Grid container spacing={1}>
      <Grid xs={12} item>
        <Input
          onChange={(e) => {
            loginStore.setIdentifier(e.target.value);
          }}
          value={loginStore.identifier}
          type="text"
          placeholder={`${t("login.phoneNumber")} / ${t(
            "login.email"
          )}`.toLowerCase()}
        />
      </Grid>
      <Grid xs={12} item>
        <Input
          onChange={(e) => {
            loginStore.setPassword(e.target.value);
          }}
          value={loginStore.password}
          type="password"
          placeholder={t("login.password").toLowerCase()}
        />
      </Grid>
      <Grid xs={12} item>
        <Button
          onClick={loginStore.submitCombinedLogin}
          style={{
            borderRadius: "18px",
            backgroundColor: "#6fac5d",
            color: "white",
            minHeight: "45px",
          }}
          fullWidth
          disableElevation
          variant="contained"
        >
          {t("login.logIn")}
        </Button>
        <Link to="/login">Back</Link>
        {loginStore.loading && <Loading />}
      </Grid>
    </Grid>
  );
});

export default PapuaLogin;
