import React from "react";
import LoginRouter from "./LoginRouter";
import Alert from "../Basics/Alert";
import useStores from "../Basics/UseStores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import DemoWarning from "./DemoWarning";
import VersionNumber from "../Patient/Information/VersionNumber";
import isIndonesiaPilot from "../Utility/check-indonesia-flag";
import PapuaLogin from "./PapuaLogin/index";

const Login = observer(() => {
  const { t } = useTranslation("translation");
  const { loginStore } = useStores();

  const errorText = () => {
    if (loginStore.error == 422) {
      if (loginStore.selectedUserType === "Patient") {
        return t("errors.login.badPhone");
      } else if (loginStore.selectedUserType === "Practitioner") {
        return t("errors.login.badEmail");
      }
      return t("errors.login.identifier");
    } else if (loginStore.error == 401) {
      return t("errors.login.password");
    } else {
      return t("errors.login.other");
    }
  };

  if (isIndonesiaPilot()) {
    return <PapuaLogin />;
  }

  return (
    <>
      <DemoWarning />
      <LoginRouter />
      <VersionNumber isLoginScreen />
      {loginStore.error != 0 && (
        <Alert open text={errorText()} onClose={loginStore.clearError} />
      )}
    </>
  );
});

export default Login;
