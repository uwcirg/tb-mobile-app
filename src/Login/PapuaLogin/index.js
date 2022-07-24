import { Box, Button, Grid } from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import useStores from "../../Basics/UseStores";
import Loading from "../../Practitioner/Shared/Loading";
import ForgotPassword from "../ForgotPassword";
import BackButton from "./BackButton";
import Form from "./Form";
import Input from "./Input";
import UserSelect from "./UserSelect";

const PapuaLogin = () => {
  const { t } = useTranslation("translation");
  const location = useLocation();

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
          <BackButton hidden={location.pathname === "/login"} />
          <Switch>
            <Route path="/login/forgot-password">
              {t("login.forgotPasswordDetails")}
            </Route>
            <Route path="/login/patient">
              <Form />
            </Route>
            <Route path="/login/provider">
              <Form isProvider />
            </Route>
            <Route path="/login">
              <Box>
                <UserSelect />
                <Box height=".5rem" />
                <UserSelect isProvider />
              </Box>
            </Route>
            <Redirect to="/login" />
          </Switch>
        </Box>
      </Grid>
    </Box>
  );
};

export default PapuaLogin;
