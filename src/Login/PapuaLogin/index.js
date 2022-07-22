import { Box, Button, Grid } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import Colors from "../../Basics/Colors";
import Input from "./Input";

export default function PapuaLogin() {
  const { t } = useTranslation();
  return (
    <Box minHeight="100vh" padding="2rem 1rem 1rem 1rem">
      <Grid
        style={{ height: "100%" }}
        container
        direction="column"
        justify="center"
      >
        <Box>
          <Box padding="2rem 0">
            <Grid container alignItems="center" direction="column">
              <img src="/img/id/login-logo.png" width="200px" />
            </Grid>
          </Box>
          <Grid container spacing={1}>
            <Grid xs={12} item>
              <Input
                type="text"
                placeholder={`${t("login.phoneNumber")} / ${t("login.email")}`}
              />
            </Grid>
            <Grid xs={12} item>
              <Input type="password" placeholder={t("login.password")} />
            </Grid>
            <Grid xs={12} item>
              <Button
                style={{ borderRadius: "14px", backgroundColor: Colors.green }}
                fullWidth
                disableElevation
                variant="contained"
              >
                {t("login.logIn")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
