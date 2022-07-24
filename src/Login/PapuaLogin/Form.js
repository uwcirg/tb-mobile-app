import { Button, Grid } from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";
import useStores from "../../Basics/UseStores";
import BackButton from "./BackButton";
import Input from "./Input";
import { useTranslation } from "react-i18next";
import Colors from "../../Basics/Colors";
import Loading from "../../Practitioner/Shared/Loading";

const Form = observer(() => {
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
            backgroundColor: Colors.papuaGreen,
            color: "white",
            minHeight: "45px",
          }}
          fullWidth
          disableElevation
          variant="contained"
        >
          {t("login.logIn")}
        </Button>
        <BackButton />
        {loginStore.loading && <Loading />}
      </Grid>
    </Grid>
  );
});

export default Form;
