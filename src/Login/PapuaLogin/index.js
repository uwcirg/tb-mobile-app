import React from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import Form from "./Form";
import UserSelect from "./UserSelect";
import Colors from "../../Basics/Colors";
import { ChevronRight } from "@material-ui/icons";
import capitalizeFirstLetter from "../../Utility/StringUtils";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: Colors.buttonBlue,
  },
});

const ActivationLink = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Link className={classes.link} to="/login/patient/activate">
      <Grid container alignItems="center">
        {capitalizeFirstLetter(t("login.activateAccount").toLowerCase())}
        <ChevronRight />
      </Grid>
    </Link>
  );
};

const ForgotPassword = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Link className={classes.link} to="/login/forgot-password">
      <Grid container alignItems="center">
        {capitalizeFirstLetter(t("login.forgotPassword").toLowerCase())}
        <ChevronRight />
      </Grid>
    </Link>
  );
};

const PapuaLogin = () => {
  const { t } = useTranslation();
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
              <Typography variant="body1">
                {t("login.forgotPasswordDetails")}
              </Typography>
            </Route>
            <Route path="/login/patient/activate">
              <Form isActivation />
            </Route>
            <Route path="/login/patient">
              <Form />
              <Box height="1rem" />
              <ActivationLink />
              <Box height="1rem" />
              <ForgotPassword />
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
