import { Box, Button, Grid } from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";
import { useTranslation } from "react-i18next";
import Colors from "../../Basics/Colors";
import useStores from "../../Basics/UseStores";
import Input from "./Input";

const PapuaLogin = observer(() => {
  const { loginStore } = useStores();

  const { t } = useTranslation();
  return (
    <Box padding="2rem">
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
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
});

export default PapuaLogin;
